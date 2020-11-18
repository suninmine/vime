import { SpecPage } from '@stencil/core/testing';
import { newUISpecPage } from '../../../ui/tests';
import { SettingsControl } from '../settings-control';

let page: SpecPage;
let control: HTMLVmSettingsControlElement;

beforeEach(async () => {
  ({ page } = await newUISpecPage(
    [SettingsControl],
    '<vm-settings-control />',
  ));

  control = page.root!.querySelector('vm-settings-control')!;
});

it('should be structurally sound', () => {
  expect(control).toMatchSnapshot();
});
