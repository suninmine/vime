// eslint-disable-next-line import/no-extraneous-dependencies
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
};
