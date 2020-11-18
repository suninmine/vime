import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { PlaybackControl } from '../playback-control';

let page: SpecPage;
let control: HTMLVmPlaybackControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [PlaybackControl],
    '<vm-playback-control />',
  ));

  control = page.root!.querySelector('vm-playback-control')!;
});

it('should be structurally sound when paused', () => {
  expect(control).toMatchSnapshot();
});

it('should be structurally sound when not paused', async () => {
  control.paused = false;
  await page.waitForChanges();
  expect(control).toMatchSnapshot();
});
