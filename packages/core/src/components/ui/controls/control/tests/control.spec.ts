import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { Control } from '../control';

let page: SpecPage;
let control: HTMLVmControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [Control],
    '<vm-control>Control</vm-control>',
  ));

  control = page.root!.querySelector('vm-control')!;
});

it('should be structurally sound', async () => {
  expect(control).toMatchSnapshot();
});
