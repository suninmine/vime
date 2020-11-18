import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { MenuRadioGroup } from '../menu-radio-group';
import { MenuRadio } from '../../menu-radio/menu-radio';

let page: SpecPage;

beforeEach(async () => {
  page = await newSpecPage({
    components: [MenuRadioGroup, MenuRadio],
    html: `
      <vm-menu-radio-group value="1">
        <vm-menu-radio label="one" value ="1"></vm-menu-radio>
        <vm-menu-radio label="two" value ="2"></vm-menu-radio>
        <vm-menu-radio label="three" value ="3"></vm-menu-radio>
      </vm-menu-radio-group>
    `,
  });
});

it('should be structurally sound', () => {
  expect(page.root).toMatchSnapshot();
});

it('should turn off checked radios on change', async () => {
  const radioTwo = page.root!.querySelector('vm-menu-radio[value="2"] > vm-menu-item');
  (radioTwo as HTMLElement).click();
  await page.waitForChanges();
  expect(page.root).toMatchSnapshot();
});
