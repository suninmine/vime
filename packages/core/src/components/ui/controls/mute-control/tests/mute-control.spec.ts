import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { MuteControl } from '../mute-control';

let page: SpecPage;
let control: HTMLVmMuteControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [MuteControl],
    '<vm-mute-control />',
  ));

  control = page.root!.querySelector('vm-mute-control')!;
});

it('should be structurally sound', () => {
  expect(control).toMatchSnapshot();
});
