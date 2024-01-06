import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import ViteReact from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
import ViteLegacy from '@vitejs/plugin-legacy'
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  // esbuild: {
  //   jsxInject: `import React from 'react'`,
  // },
  define: {
    'process.env': {}
  },
  resolve: {
    dedupe: ["axios"],
  },
  optimizeDeps: {
    include: ["@inertiajs/inertia"],
  },
  plugins: [
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    RubyPlugin(),
    // babel(),
    FullReload(["config/routes.rb", "app/views/**/*", "app/serializers/**/*.rb"]),
    ViteReact({
      include: [/\.tsx$/, /\.md$/],
    }),
    ViteLegacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // Create gzip copies of relevant assets
    gzipPlugin(),
    WindiCSS({
      root: __dirname,
      scan: {
        fileExtensions: ['erb', 'html', 'jsx', 'tsx'], // and maybe haml
        dirs: ['app/views', 'app/javascript'], // or app/javascript
      },
    }),
    // viteCommonjs(),
    // Create brotli copies of relevant assets
    gzipPlugin({
      customCompression: content => brotliCompressSync(Buffer.from(content)),
      fileName: ".br",
    }),
  ],
  server: {
    hmr: {
      host: "localhost",
      overlay: true,
      clientPort: 443,
    },
  },
});
