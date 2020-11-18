import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { CurrentTime } from '../current-time';

let page: SpecPage;
let time: HTMLVmCurrentTimeElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [CurrentTime],
    '<vm-current-time />',
  ));

  time = page.root!.querySelector('vm-current-time')!;
});

it('should be structurally sound', async () => {
  time.currentTime = 120;
  await page.waitForChanges();
  expect(time).toMatchSnapshot();
});
