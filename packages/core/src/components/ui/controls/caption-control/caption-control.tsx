import { Component, Prop } from '@stencil/core';
import { PlayerProps } from '../../../core/player/PlayerProps';
import { TooltipDirection, TooltipPosition } from '../../tooltip/types';
import { KeyboardControl } from '../control/KeyboardControl';
import { withPlayerContext } from '../../../core/player/withPlayerContext';
import { withComponentRegistry } from '../../../core/player/withComponentRegistry';

@Component({
  tag: 'vm-caption-control',
  styleUrl: 'caption-control.css',
  shadow: true,
})
export class CaptionControl implements KeyboardControl {
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
   * @inheritdoc
   */
  @Prop() keys?: string = 'c';

  /**
   * @internal
   */
  @Prop() i18n: PlayerProps['i18n'] = {};

  constructor() {
    withComponentRegistry(this);
    withPlayerContext(this, ['i18n']);
  }

  render() {
    // const tooltip = this.isCaptionsActive ? this.i18n.disableCaptions : this.i18n.enableCaptions;
    // const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;

    // return (
    //   <Host
    //     class={{
    //       hidden: isUndefined(this.currentCaption),
    //     }}
    //   >
    //     <vm-control
    //       label={this.i18n.captions}
    //       keys={this.keys}
    //       hidden={isUndefined(this.currentCaption)}
    //       pressed={this.isCaptionsActive}
    //       onClick={this.onClick.bind(this)}
    //     >
    //       <vm-icon href={this.isCaptionsActive ? this.showIcon : this.hideIcon} />

    //       <vm-tooltip
    //         hidden={this.hideTooltip}
    //         position={this.tooltipPosition}
    //         direction={this.tooltipDirection}
    //       >
    //         {tooltipWithHint}
    //       </vm-tooltip>
    //     </vm-control>
    //   </Host>
    // );
  }
}
