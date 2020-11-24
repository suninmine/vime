import {
  h, Component, Prop, State, Watch,
} from '@stencil/core';
import { withPlayerContext } from '../../../core/player/withPlayerContext';
import { PlayerProps } from '../../../core/player/PlayerProps';
import { Disposal } from '../../../../utils/Disposal';
import { Dispatcher, createDispatcher } from '../../../core/player/PlayerDispatcher';
import { findPlayer } from '../../../core/player/findPlayer';
import { withComponentRegistry } from '../../../core/player/withComponentRegistry';

/**
 * @slot - Used to extend the settings with additional menu options (see `vm-submenu` or
 * `vm-menu-item`).
 */
@Component({
  tag: 'vm-default-settings',
  shadow: true,
  styleUrl: 'default-settings.css',
})
export class DefaultSettings {
  private textTracksDisposal = new Disposal();

  private dispatch!: Dispatcher;

  @State() canSetPlaybackRate = false;

  @State() canSetPlaybackQuality = false;

  /**
   * Pins the settings to the defined position inside the video player. This has no effect when
   * the view is of type `audio`, it will always be `bottomRight`.
   */
  @Prop({
    reflect: true,
  }) pin: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomRight';

  /**
   * @internal
   */
  @Prop() i18n: PlayerProps['i18n'] = {};

  /**
   * @internal
   */
  @Prop() playbackReady: PlayerProps['playbackReady'] = false;

  @Watch('playbackReady')
  async onPlaybackReady() {
    const player = await findPlayer(this);
    this.canSetPlaybackQuality = await player.canSetPlaybackQuality();
    this.canSetPlaybackRate = await player.canSetPlaybackRate();
  }

  /**
   * @internal
   */
  @Prop() playbackRate: PlayerProps['playbackRate'] = 1;

  /**
   * @internal
   */
  @Prop() playbackRates: PlayerProps['playbackRates'] = [1];

  /**
   * @internal
   */
  @Prop() playbackQuality?: PlayerProps['playbackQuality'];

  /**
   * @internal
   */
  @Prop() playbackQualities: PlayerProps['playbackQualities'] = [];

  constructor() {
    withComponentRegistry(this);
    withPlayerContext(this, [
      'i18n',
      'playbackReady',
      'playbackRate',
      'playbackRates',
      'playbackQuality',
      'playbackQualities',
    ]);
  }

  connectedCallback() {
    this.dispatch = createDispatcher(this);
  }

  disconnectedCallback() {
    this.textTracksDisposal.empty();
  }

  private onPlaybackRateSelect(event: Event) {
    const radio = event.target as HTMLVmMenuRadioElement;
    this.dispatch('playbackRate', parseFloat(radio.value));
  }

  private buildPlaybackRateSubmenu() {
    if (this.playbackRates.length === 1 || !this.canSetPlaybackRate) {
      return (
        <vm-menu-item label={this.i18n.playbackRate} hint={this.i18n.normal} />
      );
    }

    const formatRate = (rate: number) => ((rate === 1) ? this.i18n.normal : `${rate}`);

    const radios = this.playbackRates.map((rate) => (
      <vm-menu-radio
        label={formatRate(rate)}
        value={`${rate}`}
      />
    ));

    return (
      <vm-submenu label={this.i18n.playbackRate} hint={formatRate(this.playbackRate)}>
        <vm-menu-radio-group
          value={`${this.playbackRate}`}
          onVmCheck={this.onPlaybackRateSelect.bind(this)}
        >
          {radios}
        </vm-menu-radio-group>
      </vm-submenu>
    );
  }

  private onPlaybackQualitySelect(event: Event) {
    const radio = event.target as HTMLVmMenuRadioElement;
    this.dispatch('playbackQuality', radio.value);
  }

  private buildPlaybackQualitySubmenu() {
    if (this.playbackQualities.length === 0 || !this.canSetPlaybackQuality) {
      return (
        <vm-menu-item
          label={this.i18n.playbackQuality}
          hint={this.playbackQuality ?? this.i18n.auto}
        />
      );
    }

    // @TODO this doesn't account for audio qualities yet.
    const getBadge = (quality: string) => {
      const verticalPixels = parseInt(quality.slice(0, -1), 10);
      if (verticalPixels > 2160) return 'UHD';
      if (verticalPixels >= 1080) return 'HD';
      return undefined;
    };

    const radios = this.playbackQualities.map((quality) => (
      <vm-menu-radio
        label={quality}
        value={quality}
        badge={getBadge(quality)}
      />
    ));

    return (
      <vm-submenu label={this.i18n.playbackQuality} hint={this.playbackQuality}>
        <vm-menu-radio-group
          value={this.playbackQuality}
          onVmCheck={this.onPlaybackQualitySelect.bind(this)}
        >
          {radios}
        </vm-menu-radio-group>
      </vm-submenu>
    );
  }

  render() {
    return (
      <vm-settings pin={this.pin}>
        {this.buildPlaybackRateSubmenu()}
        {this.buildPlaybackQualitySubmenu()}
        <slot />
      </vm-settings>
    );
  }
}
