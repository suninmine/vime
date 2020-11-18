import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { VolumeControl } from '../volume-control';

let page: SpecPage;
let control: HTMLVmVolumeControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [VolumeControl],
    '<vm-volume-control />',
  ));

  control = page.root!.querySelector('vm-volume-control')!;
});

it('should be structurally sound', () => {
  expect(control).toMatchSnapshot();
});
