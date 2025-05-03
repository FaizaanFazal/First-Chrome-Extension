// tsup.config.ts
import { defineConfig } from 'tsup';
import copy from 'esbuild-plugin-copy';

export default defineConfig({
  entry: [
    'src/background.ts',
    'src/content.ts',
    'src/popup/index.tsx',
    // …other entries
  ],
  outDir: 'dist',
  clean: true,
  format: ['cjs'],
  sourcemap: true,
  splitting: false,
  watch: process.env.NODE_ENV === 'development',
  esbuildPlugins: [
    copy({
      assets: [
        { from: 'public/**/*', to: '.' }, 
      ],
      verbose: true,  
    })
  ],
});
