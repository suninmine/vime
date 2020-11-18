import {
  h, Component, Prop, Watch, State,
} from '@stencil/core';
import { PlayerProps } from '../../core/player/PlayerProps';
import { withPlayerContext } from '../../core/player/withPlayerContext';
import { withComponentRegistry } from '../../core/player/withComponentRegistry';

@Component({
  tag: 'vm-captions',
  styleUrl: 'captions.css',
  shadow: true,
})
export class Captions {
  @State() isEnabled = false;

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

  constructor() {
    withComponentRegistry(this);
    withPlayerContext(this, [
      'isVideoView',
      'playbackStarted',
      'isControlsActive',
    ]);
  }

  @Watch('isVideoView')
  @Watch('playbackStarted')
  onEnabledChange() {
    this.isEnabled = this.playbackStarted && this.isVideoView;
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
        }}
      >
        <span class="cue" />
      </div>
    );
  }
}
