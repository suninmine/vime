import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: '../../',
  open: 'packages/core/playground',
  nodeResolve: true,
  watch: true,
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
  ],
};
