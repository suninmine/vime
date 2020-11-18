import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { Time } from '../time';

let page: SpecPage;
let time: HTMLVmTimeElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [Time],
    '<vm-time />',
  ));

  time = page.root!.querySelector('vm-time')!;
});

it('should be structurally sound', async () => {
  time.label = 'Current time';
  time.seconds = 120;
  await page.waitForChanges();
  expect(time).toMatchSnapshot();
});
