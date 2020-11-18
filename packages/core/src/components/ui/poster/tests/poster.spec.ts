import { SpecPage } from '@stencil/core/testing';
import { Poster } from '../poster';
import { newUISpecPage } from '../../ui/tests';
import { ViewType } from '../../../core/player/ViewType';

let page: SpecPage;
let provider: HTMLVmFaketubeElement;
let poster: HTMLVmPosterElement;

beforeEach(async () => {
  ({ page, provider } = await newUISpecPage(
    [Poster],
    '<vm-poster />',
  ));

  poster = page.root!.querySelector('vm-poster')!;
});

const findImage = () => page.root!.querySelector('vm-poster > img');

it('should be structurally sound', () => {
  expect(poster).toMatchSnapshot();
});

it('should not render if not a video view', async () => {
  await provider.dispatchChange('viewType', ViewType.Audio);
  await page.waitForChanges();
  expect(poster).toHaveClass('hidden');
});

it('should render if currentPoster exists', async () => {
  await provider.dispatchChange('viewType', ViewType.Video);
  await provider.dispatchChange('currentPoster', '');
  await page.waitForChanges();
  expect(poster).not.toHaveClass('hidden');
});

it('should not render if currentPoster does not exist', async () => {
  expect(poster).toHaveClass('hidden');
});

// `loaded` event on `<img>` is not triggered.
it.skip('should be visible if playback has not started', () => {
  expect(poster).toHaveClass('active');
});

it('should not be visible if playback has started', async () => {
  await provider.dispatchChange('playbackStarted', true);
  await page.waitForChanges();
  expect(poster).not.toHaveClass('active');
});

it('should set the alt text based on the media title', async () => {
  expect(findImage()).toEqualAttribute('alt', 'Media Poster');
  await provider.dispatchChange('mediaTitle', 'Apples');
  await page.waitForChanges();
  expect(findImage()).toEqualAttribute('alt', 'Apples Poster');
});

it('should emit vmWillShow event when visible', async () => {
  const cb = jest.fn();
  poster.addEventListener('vmWillShow', cb);
  await provider.dispatchChange('viewType', ViewType.Video);
  await provider.dispatchChange('currentPoster', '');
  await page.waitForChanges();
  expect(cb).toHaveBeenCalled();
});

it('should emit vmWillHide event when not visible', async () => {
  const cb = jest.fn();
  poster.addEventListener('vmWillHide', cb);
  await provider.dispatchChange('viewType', ViewType.Video);
  await provider.dispatchChange('currentPoster', '');
  await page.waitForChanges();
  await provider.dispatchChange('playbackStarted', true);
  await page.waitForChanges();
  expect(cb).toHaveBeenCalled();
});
