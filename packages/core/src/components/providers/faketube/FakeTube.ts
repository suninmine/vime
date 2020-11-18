import {
  Prop, Method, Component, Event, EventEmitter, getElement,
} from '@stencil/core';
import { AdapterHost, MediaProvider, MockMediaProviderAdapter } from '../MediaProvider';
import { PlayerProp } from '../../core/player/PlayerProps';
import { createProviderDispatcher, ProviderDispatcher } from '../ProviderDispatcher';
import { Logger } from '../../core/player/PlayerLogger';
import { findPlayer } from '../../core/player/findPlayer';
import { withComponentRegistry } from '../../core/player/withComponentRegistry';
import { withProviderContext } from '../withProviderContext';

@Component({
  tag: 'vm-faketube',
  styleUrl: 'faketube.css',
  shadow: true,
})
export class FakeTube implements MediaProvider {
  private dispatch!: ProviderDispatcher;

  /**
   * @internal
   */
  @Prop() language = 'en';

  /**
   * @internal
   */
  @Prop() autoplay = false;

  /**
   * @internal
   */
  @Prop() controls = false;

  /**
   * @internal
   */
  @Prop() logger?: Logger;

  /**
   * @internal
   */
  @Prop() loop = false;

  /**
   * @internal
   */
  @Prop() muted = false;

  /**
   * @internal
   */
  @Prop() playsinline = false;

  /**
   * @internal
   */
  @Event() vmLoadStart!: EventEmitter<void>;

  constructor() {
    withComponentRegistry(this);
    withProviderContext(this);
  }

  connectedCallback() {
    this.dispatch = createProviderDispatcher(this);
  }

  async componentWillLoad() {
    const player = await findPlayer(this);
    player.setProvider(getElement(this) as AdapterHost);
  }

  /**
   * Returns a mock adapter.
   */
  @Method()
  async getAdapter(): Promise<MockMediaProviderAdapter> {
    return {
      getInternalPlayer: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      canPlay: jest.fn(),
      setCurrentTime: jest.fn(),
      setMuted: jest.fn(),
      setVolume: jest.fn(),
      canSetPlaybackRate: jest.fn(),
      setPlaybackRate: jest.fn(),
      canSetPlaybackQuality: jest.fn(),
      setPlaybackQuality: jest.fn(),
      canSetFullscreen: jest.fn(),
      enterFullscreen: jest.fn(),
      exitFullscreen: jest.fn(),
      canSetPiP: jest.fn(),
      enterPiP: jest.fn(),
      exitPiP: jest.fn(),
    };
  }

  /**
   * Dispatches the `vmLoadStart` event.
   */
  @Method()
  async dispatchLoadStart() {
    this.vmLoadStart.emit();
  }

  /**
   * Dispatches a state change event.
   */
  @Method()
  async dispatchChange(prop: PlayerProp, value: any) {
    this.dispatch(prop as any, value);
  }
}
