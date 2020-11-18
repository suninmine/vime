import { SpecPage } from '@stencil/core/testing';
import { Spinner } from '../spinner';
import { newUISpecPage } from '../../ui/tests';
import { ViewType } from '../../../core/player/ViewType';

let page: SpecPage;
let provider: HTMLVmFaketubeElement;
let spinner: HTMLVmSpinnerElement;

beforeEach(async () => {
  ({ page, provider } = await newUISpecPage(
    [Spinner],
    '<vm-spinner />',
  ));

  spinner = page.root!.querySelector('vm-spinner')!;
});

it('should be structurally sound', () => {
  expect(spinner).toMatchSnapshot();
});

it('should not render if not a video view', async () => {
  await provider.dispatchChange('viewType', ViewType.Audio);
  await page.waitForChanges();
  expect(spinner).toHaveClass('hidden');
});

it('should render if a video view', async () => {
  await provider.dispatchChange('viewType', ViewType.Video);
  await page.waitForChanges();
  expect(spinner).not.toHaveClass('hidden');
});

it('should be visible if buffering', async () => {
  await provider.dispatchChange('buffering', true);
  await page.waitForChanges();
  expect(spinner).toHaveClass('active');
});

it('should not be visible if not buffering', async () => {
  await provider.dispatchChange('buffering', false);
  await page.waitForChanges();
  expect(spinner).not.toHaveClass('active');
});

it('should emit vmWillShow event when visible', async () => {
  const cb = jest.fn();
  spinner.addEventListener('vmWillShow', cb);
  await provider.dispatchChange('viewType', ViewType.Video);
  await provider.dispatchChange('buffering', true);
  await page.waitForChanges();
  expect(cb).toHaveBeenCalled();
});

it('should emit vmWillHide event when not visible', async () => {
  const cb = jest.fn();
  spinner.addEventListener('vmWillHide', cb);
  await provider.dispatchChange('viewType', ViewType.Video);
  await provider.dispatchChange('buffering', true);
  await page.waitForChanges();
  await provider.dispatchChange('buffering', false);
  await page.waitForChanges();
  expect(cb).toHaveBeenCalled();
});
