// tsup.config.ts
import { defineConfig } from 'tsup';
import copy from 'esbuild-plugin-copy';

export default defineConfig({
  entry: [
    'src/background.ts',
    'src/content.ts',
    'src/popup/index.tsx',
    'src/options/index.tsx',
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
        // your manifest & HTML files
        { from: 'public/manifest.json', to: '.' },
        { from: 'public/popup.html',    to: '.' },
        { from: 'public/options.html',  to: '.' },
        
        // icons
        { from: 'public/icons/*',       to: 'icons/[name][ext]' },
      ],
      verbose: true,
    })
  ],
});
