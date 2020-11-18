import { getElement } from '@stencil/core';
import { listen } from '../../../utils/dom';
import { deferredPromise } from '../../../utils/promise';
import { createStencilHook } from '../../../utils/stencil';
import { isInstanceOf } from '../../../utils/unit';
import { MediaPlayer } from './MediaPlayer';

export const FIND_PLAYER_EVENT = 'vmFindPlayer';

export type FoundPlayerCallback = (player: HTMLVmPlayerElement) => void;

export function withFindPlayer(player: MediaPlayer) {
  const el = getElement(player) as HTMLVmPlayerElement;

  let off: () => void;
  createStencilHook(player, () => {
    off = listen(el, FIND_PLAYER_EVENT, (event: CustomEvent<FoundPlayerCallback>) => {
      event.detail(el);
    });
  }, () => {
    off?.();
  });
}

/**
 * Finds the closest ancestor player element by firing the `vmFindPlayer` event, and waiting
 * for the player to catch it. This function retries finding the player (`maxRetries`) until it
 * gives up and fails.
 *
 * @param ref - A HTMLElement that is within the player's subtree.
 * @param duration - The length of the timeout before trying again.
 * @param maxRetries - The number of times to retry firing the event.
 */
export const findPlayer = (ref: any, duration = 300, maxRetries = 10) => {
  const el = (isInstanceOf(ref, HTMLElement) ? ref : getElement(ref)) as HTMLElement;
  const search = deferredPromise<HTMLVmPlayerElement>();

  let timeout: any;
  let attempt = 0;
  let found = false;

  function dispatch() {
    el.dispatchEvent(new CustomEvent<FoundPlayerCallback>(FIND_PLAYER_EVENT, {
      bubbles: true,
      composed: true,
      detail: (player) => {
        window.clearTimeout(timeout);
        search.resolve(player);
        found = true;
      },
    }));
  }

  function retry() {
    if (found) return;

    timeout = setTimeout(() => {
      if (attempt === maxRetries) {
        search.reject(`Could not find player for ${el.nodeName}`);
        return;
      }

      dispatch();
      attempt += 1;
      retry();
    }, duration);
  }

  retry();

  return search.promise;
};
