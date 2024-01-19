import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import ViteReact from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
import ViteLegacy from '@vitejs/plugin-legacy'
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from 'vite-plugin-windicss';
import EnvironmentPlugin from "vite-plugin-environment";

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
    EnvironmentPlugin({
      // Uses 'development' if the NODE_ENV environment variable is not defined.
      NODE_ENV: 'development',

      // Have in mind that variables coming from process.env are always strings.
      DEBUG: 'false',

      // Required: will fail if the API_KEY environment variable is not provided.
      API_KEY: undefined,

      // Optional: will not fail if the APP_VERSION environment variable is missing.
      APP_VERSION: null,
    }),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    RubyPlugin(),
    // babel(),
    FullReload(["config/routes.rb", "app/views/**/*", "app/serializers/**/*.rb"], { delay: 200 }),
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
