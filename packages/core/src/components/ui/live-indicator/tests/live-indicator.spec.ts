import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../ui/tests';
import { LiveIndicator } from '../live-indicator';

let page: SpecPage;
let indicator: HTMLVmLiveIndicatorElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [LiveIndicator],
    '<vm-live-indicator />',
  ));

  indicator = page.root!.querySelector('vm-live-indicator')!;
});

it('should be structurally sound', () => {
  expect(indicator).toMatchSnapshot();
});

it('should contain text', () => {
  expect(indicator.innerHTML).toContain('LIVE');
});

it('should be hidden by default', () => {
  expect(indicator).toHaveClass('hidden');
});

it('should not be hidden if media is live', async () => {
  expect(indicator).toHaveClass('hidden');
  indicator.isLive = true;
  await page.waitForChanges();
  expect(indicator).not.toHaveClass('hidden');
});
