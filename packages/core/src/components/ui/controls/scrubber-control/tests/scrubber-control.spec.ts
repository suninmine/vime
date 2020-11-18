import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { ScrubberControl } from '../scrubber-control';

let page: SpecPage;
let control: HTMLVmScrubberControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [ScrubberControl],
    '<vm-scrubber-control />',
  ));

  control = page.root!.querySelector('vm-scrubber-control')!;
});

it('should be structurally sound', () => {
  expect(control).toMatchSnapshot();
});
