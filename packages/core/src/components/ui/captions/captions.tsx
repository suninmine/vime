import {
  h, Component, Prop, Watch, State,
} from '@stencil/core';
import { PlayerProps } from '../../core/player/PlayerProps';
import { withPlayerContext } from '../../core/player/withPlayerContext';
import { withComponentRegistry } from '../../core/player/withComponentRegistry';
import { isNullOrUndefined } from '../../../utils/unit';
import { Disposal } from '../../../utils/Disposal';
import { listen } from '../../../utils/dom';
import { createDispatcher, Dispatcher } from '../../core/player/PlayerDispatcher';
import { withControlsCollisionDetection } from '../controls/controls/withControlsCollisionDetection';

@Component({
  tag: 'vm-captions',
  styleUrl: 'captions.css',
  shadow: true,
})
export class Captions {
  private dispatch!: Dispatcher;

  private disposal = new Disposal();

  @State() isEnabled = false;

  @State() cue?: string;

  /**
   * Whether the captions should be visible or not.
   */
  @Prop() hidden = false;

  /**
   * @internal
   */
  @Prop() isControlsActive: PlayerProps['isControlsActive'] = false;

  /**
   * @internal
   */
  @Prop() isVideoView: PlayerProps['isVideoView'] = false;

  /**
   * @internal
   */
  @Prop() playbackStarted: PlayerProps['playbackStarted'] = false;

  @Watch('isVideoView')
  @Watch('playbackStarted')
  onEnabledChange() {
    this.isEnabled = this.playbackStarted && this.isVideoView;
  }

  /**
   * @internal
   */
  @Prop() textTracks: PlayerProps['textTracks'] = [];

  /**
   * @internal
   */
  @Prop() currentTextTrack: PlayerProps['currentTextTrack'] = -1;

  /**
   * @internal
   */
  @Prop() isTextTrackVisible: PlayerProps['isTextTrackVisible'] = true;

  @Watch('textTracks')
  @Watch('currentTextTrack')
  onTextTracksChange() {
    const textTrack = this.textTracks[this.currentTextTrack];
    if (!isNullOrUndefined(textTrack)) {
      this.disposal.add(listen(textTrack, 'cuechange', () => {
        const activeCues = Array.from(textTrack.activeCues ?? []);
        this.renderCurrentCue(activeCues[0] as VTTCue);
      }));
    }
  }

  constructor() {
    withComponentRegistry(this);
    withControlsCollisionDetection(this);
    withPlayerContext(this, [
      'isVideoView',
      'playbackStarted',
      'isControlsActive',
      'textTracks',
      'currentTextTrack',
      'isTextTrackVisible',
    ]);
  }

  connectedCallback() {
    this.dispatch = createDispatcher(this);
    this.dispatch('shouldRenderNativeTextTracks', false);
    this.onTextTracksChange();
  }

  disconnectedCallback() {
    this.disposal.empty();
    this.dispatch('shouldRenderNativeTextTracks', true);
  }

  private renderCurrentCue(cue?: VTTCue) {
    if (isNullOrUndefined(cue)) {
      this.cue = '';
      return;
    }

    const div = document.createElement('div');
    div.append(cue.getCueAsHTML());
    this.cue = div.innerHTML.trim();
  }

  render() {
    return (
      <div
        style={{
          transform: `translateY(calc(${this.isControlsActive ? 'var(--vm-controls-height)' : '24px'} * -1))`,
        }}
        class={{
          captions: true,
          enabled: this.isEnabled,
          hidden: this.hidden,
          inactive: !this.isTextTrackVisible,
        }}
      >
        <span class="cue">{this.cue}</span>
      </div>
    );
  }
}
