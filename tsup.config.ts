import { defineConfig } from 'tsup';
import copy from 'esbuild-plugin-copy';

export default defineConfig({
  // Nested entries → dist/popup/index.js, dist/options/index.js, etc.
  entry: {
    background:      'src/background.ts',
    content:         'src/content.ts',
    'popup/index':   'src/popup/index.tsx',
    'options/index': 'src/options/index.tsx',
  },

  outDir: 'dist',
  clean: true,

  platform: 'browser',
  bundle: true,
  noExternal: ['react', 'react-dom', 'react-dom/client'],

  format: ['esm'],     
  splitting: false, 
  sourcemap: true,
  outExtension() {    
    return { js: '.js' };
  },

  esbuildPlugins: [
    copy({
      assets: [
        { from: 'public/manifest.json',  to: '.' },
        { from: 'public/popup.html',     to: '.' },
        { from: 'public/options.html',   to: '.' },
        { from: 'public/icons/*',        to: 'icons/[name][ext]' },
      ],
      verbose: true,
    }),
  ],
});
