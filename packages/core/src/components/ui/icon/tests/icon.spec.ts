import { newSpecPage } from '@stencil/core/testing';
import { Icon } from '../icon';

it('should be structurally sound', async () => {
  const page = await newSpecPage({
    components: [Icon],
    html: '<vm-icon name="icon"></vm-icon>',
  });

  expect(page.root).toMatchSnapshot();
});
