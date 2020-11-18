import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { PiPControl } from '../pip-control';

let page: SpecPage;
let control: HTMLVmPipControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [PiPControl],
    '<vm-pip-control />',
  ));

  control = page.root!.querySelector('vm-pip-control')!;
});

it('should be structurally sound when not active', () => {
  expect(control).toMatchSnapshot();
});

it('should be structurally sound when active', async () => {
  control.isPiPActive = true;
  await page.waitForChanges();
  expect(control).toMatchSnapshot();
});
