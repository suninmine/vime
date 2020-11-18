import { h, Component, Prop } from '@stencil/core';
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

  private player?: HTMLVmPlayerElement;

  private rateSubmenu: any;

  private qualitySubmenu: any;

  private captionsSubmenu: any;

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

  async connectedCallback() {
    this.player = await findPlayer(this);
    this.dispatch = createDispatcher(this);
  }

  componentWillRender() {
    if (!this.playbackReady) return undefined;

    return Promise.all([
      this.buildPlaybackRateSubmenu(),
      this.buildPlaybackQualitySubmenu(),
    ]);
  }

  disconnectedCallback() {
    this.player = undefined;
    this.textTracksDisposal.empty();
  }

  private onPlaybackRateSelect(event: Event) {
    const radio = event.target as HTMLVmMenuRadioElement;
    this.dispatch('playbackRate', parseFloat(radio.value));
  }

  private async buildPlaybackRateSubmenu() {
    const canSetPlaybackRate = await this.player?.canSetPlaybackRate();

    if (this.playbackRates.length === 1 || !canSetPlaybackRate) {
      this.rateSubmenu = (
        <vm-menu-item label={this.i18n.playbackRate} hint={this.i18n.normal} />
      );
      return;
    }

    const formatRate = (rate: number) => ((rate === 1) ? this.i18n.normal : `${rate}`);

    const radios = this.playbackRates.map((rate) => (
      <vm-menu-radio
        label={formatRate(rate)}
        value={`${rate}`}
      />
    ));

    this.rateSubmenu = (
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

  private async buildPlaybackQualitySubmenu() {
    const canSetPlaybackQuality = await this.player?.canSetPlaybackQuality();

    if (this.playbackQualities.length === 0 || !canSetPlaybackQuality) {
      this.qualitySubmenu = (
        <vm-menu-item
          label={this.i18n.playbackQuality}
          hint={this.playbackQuality ?? this.i18n.auto}
        />
      );
      return;
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

    this.qualitySubmenu = (
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
        {this.rateSubmenu}
        {this.qualitySubmenu}
        {this.captionsSubmenu}
        <slot />
      </vm-settings>
    );
  }
}
