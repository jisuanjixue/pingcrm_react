import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import FullReload from 'vite-plugin-full-reload';
import react from '@vitejs/plugin-react';
import { brotliCompressSync } from 'zlib';
import gzipPlugin from 'rollup-plugin-gzip';

export default defineConfig({
  optimizeDeps: {
    include: ['@inertiajs/inertia'],
  },
  plugins: [
    RubyPlugin(),
    FullReload(['config/routes.rb', 'app/views/**/*']),
    react(),
    // Create gzip copies of relevant assets
    gzipPlugin(),
    // Create brotli copies of relevant assets
    gzipPlugin({
      customCompression: (content) => brotliCompressSync(Buffer.from(content)),
      fileName: '.br',
    }),
  ],
});
