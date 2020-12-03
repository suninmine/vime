import {
  h, Component, Prop, State, Watch,
} from '@stencil/core';
import { withPlayerContext } from '../../../core/player/withPlayerContext';
import { PlayerProps } from '../../../core/player/PlayerProps';
import { Disposal } from '../../../../utils/Disposal';
import { Dispatcher, createDispatcher } from '../../../core/player/PlayerDispatcher';
import { findPlayer } from '../../../core/player/findPlayer';
import { getPlayerFromRegistry, withComponentRegistry } from '../../../core/player/withComponentRegistry';

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

  @State() canSetTextTrack = false;

  @State() currentTrackId = -1;

  @State() isTextTrackVisible = false;

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
  @Prop() isVideoView: PlayerProps['isAudioView'] = false;

  /**
   * @internal
   */
  @Prop() playbackQuality?: PlayerProps['playbackQuality'];

  /**
   * @internal
   */
  @Prop() playbackQualities: PlayerProps['playbackQualities'] = [];

  /**
   * @internal
   */
  @Prop() textTracks: PlayerProps['textTracks'] = [];

  @Watch('textTracks')
  @Watch('playbackReady')
  async onTextTracksChange() {
    const player = getPlayerFromRegistry(this);
    this.canSetTextTrack = (await player?.canSetTextTrack()) ?? false;
    this.currentTrackId = (await player?.getCurrentTextTrack()) ?? -1;
    this.isTextTrackVisible = (await player?.getTextTrackVisibility()) ?? false;
  }

  constructor() {
    withComponentRegistry(this);
    withPlayerContext(this, [
      'i18n',
      'playbackReady',
      'playbackRate',
      'playbackRates',
      'playbackQuality',
      'playbackQualities',
      'isVideoView',
      'textTracks',
    ]);
  }

  connectedCallback() {
    this.dispatch = createDispatcher(this);
  }

  componentDidLoad() {
    this.onTextTracksChange();
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

    return (
      <vm-submenu label={this.i18n.playbackRate} hint={formatRate(this.playbackRate)}>
        <vm-menu-radio-group
          value={`${this.playbackRate}`}
          onVmCheck={this.onPlaybackRateSelect.bind(this)}
        >
          {this.playbackRates.map((rate) => (
            <vm-menu-radio label={formatRate(rate)} value={`${rate}`} />
          ))}
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

    return (
      <vm-submenu label={this.i18n.playbackQuality} hint={this.playbackQuality}>
        <vm-menu-radio-group
          value={this.playbackQuality}
          onVmCheck={this.onPlaybackQualitySelect.bind(this)}
        >
          { this.playbackQualities.map((quality) => (
            <vm-menu-radio
              label={quality}
              value={quality}
              badge={getBadge(quality)}
            />
          ))}
        </vm-menu-radio-group>
      </vm-submenu>
    );
  }

  private onCaptionSelect(event: Event) {
    const radio = event.target as HTMLVmMenuRadioElement;
    const trackId = parseInt(radio.value, 10);
    const player = getPlayerFromRegistry(this);

    if (trackId === -1) {
      player?.setTextTrackVisibility(false);
      return;
    }

    player?.setTextTrackVisibility(true);
    player?.setCurrentTextTrack(trackId);
  }

  private buildCaptionsSubmenu() {
    if (this.textTracks.length === 0 || !this.canSetTextTrack) {
      return (
        <vm-menu-item
          label={this.i18n.subtitlesOrCc}
          hint={this.textTracks[this.currentTrackId]?.label ?? this.i18n.none}
        />
      );
    }

    return (
      <vm-submenu
        label={this.i18n.subtitlesOrCc}
        hint={this.isTextTrackVisible ? this.textTracks[this.currentTrackId]?.label : this.i18n.off}
      >
        <vm-menu-radio-group
          value={`${!this.isTextTrackVisible ? -1 : this.currentTrackId}`}
          onVmCheck={this.onCaptionSelect.bind(this)}
        >
          {[(
            <vm-menu-radio label={this.i18n.off} value="-1" />
          )].concat(this.textTracks.map((track, i) => (
            <vm-menu-radio label={track.label} value={`${i}`} />
          )))}
        </vm-menu-radio-group>
      </vm-submenu>
    );
  }

  render() {
    return (
      <vm-settings pin={this.pin}>
        {this.buildPlaybackRateSubmenu()}
        {this.buildPlaybackQualitySubmenu()}
        {this.isVideoView && this.buildCaptionsSubmenu()}
        <slot />
      </vm-settings>
    );
  }
}
