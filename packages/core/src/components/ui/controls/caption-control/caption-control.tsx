import {
  h, Component, Prop, State, Watch, Host,
} from '@stencil/core';
import { PlayerProps } from '../../../core/player/PlayerProps';
import { TooltipDirection, TooltipPosition } from '../../tooltip/types';
import { KeyboardControl } from '../control/KeyboardControl';
import { withPlayerContext } from '../../../core/player/withPlayerContext';
import { getPlayerFromRegistry, withComponentRegistry } from '../../../core/player/withComponentRegistry';
import { isUndefined } from '../../../../utils/unit';

@Component({
  tag: 'vm-caption-control',
  styleUrl: 'caption-control.css',
  shadow: true,
})
export class CaptionControl implements KeyboardControl {
  @State() canToggleCaptions = false;

  @State() isCaptionsActive = false;

  /**
   * The URL to an SVG element or fragment to load.
   */
  @Prop() showIcon = 'captions-on';

  /**
   * The URL to an SVG element or fragment to load.
   */
  @Prop() hideIcon = 'captions-off';

  /**
   * Whether the tooltip is positioned above/below the control.
   */
  @Prop() tooltipPosition: TooltipPosition = 'top';

  /**
   * The direction in which the tooltip should grow.
   */
  @Prop() tooltipDirection: TooltipDirection;

  /**
   * Whether the tooltip should not be displayed.
   */
  @Prop() hideTooltip = false;

  /**
   * The name of an icon library to use. Defaults to the library defined by the `icons` player
   * property.
   */
  @Prop() icons?: string;

  /**
   * @inheritdoc
   */
  @Prop() keys?: string = 'c';

  /**
   * @internal
   */
  @Prop() i18n: PlayerProps['i18n'] = {};

  /**
   * @internal
   */
  @Prop() playbackReady: PlayerProps['playbackReady'] = false;

  /**
   * @internal
   */
  @Prop() textTracks: PlayerProps['textTracks'] = [];

  @Watch('textTracks')
  @Watch('playbackReady')
  async onTextTracksChange() {
    const player = getPlayerFromRegistry(this);
    this.canToggleCaptions = (this.textTracks.length > 0)
      && (await player?.canSetTextTrackVisibility() ?? false);
    this.isCaptionsActive = (await player?.getTextTrackVisibility?.()) ?? false;
  }

  constructor() {
    withComponentRegistry(this);
    withPlayerContext(this, ['i18n', 'textTracks', 'playbackReady']);
  }

  componentDidLoad() {
    this.onTextTracksChange();
  }

  private async onClick() {
    const player = getPlayerFromRegistry(this);
    player?.setTextTrackVisibility?.(!this.isCaptionsActive);
  }

  render() {
    const tooltip = this.isCaptionsActive ? this.i18n.disableCaptions : this.i18n.enableCaptions;
    const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;

    return (
      <Host hidden={!this.canToggleCaptions}>
        <vm-control
          label={this.i18n.captions}
          keys={this.keys}
          hidden={!this.canToggleCaptions}
          pressed={this.isCaptionsActive}
          onClick={this.onClick.bind(this)}
        >
          <vm-icon
            name={this.isCaptionsActive ? this.showIcon : this.hideIcon}
            library={this.icons}
          />

          <vm-tooltip
            hidden={this.hideTooltip}
            position={this.tooltipPosition}
            direction={this.tooltipDirection}
          >
            {tooltipWithHint}
          </vm-tooltip>
        </vm-control>
      </Host>
    );
  }
}
