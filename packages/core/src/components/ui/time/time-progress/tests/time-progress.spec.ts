import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { TimeProgress } from '../time-progress';

let page: SpecPage;
let time: HTMLVmTimeProgressElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [TimeProgress],
    '<vm-time-progress />',
  ));

  time = page.root!.querySelector('vm-time-progress')!;
});

it('should be structurally sound', async () => {
  expect(time).toMatchSnapshot();
});
