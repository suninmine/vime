import { newSpecPage } from '@stencil/core/testing';
import { Player } from '../../../core/player/player';
import { FakeTube } from '../../../providers/faketube/FakeTube';
import { UI } from '../ui';

export const newUISpecPage = async (components: any[], ui: string) => {
  const page = await newSpecPage({
    components: [Player, FakeTube, UI, ...components],
    html: `
      <vm-player>
        <vm-faketube></vm-faketube>
        
        <vm-ui>
          ${ui}
        </vm-ui>
      </vm-player>
    `,
  });

  const provider = page.root!.querySelector('vm-faketube')!;

  return { page, provider };
};
