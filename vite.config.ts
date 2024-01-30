import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import reloadOnChange from "vite-plugin-full-reload";
import ViteReact from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
import ViteLegacy from '@vitejs/plugin-legacy'
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from 'vite-plugin-windicss';
import { fileURLToPath, URL } from 'url';
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
    alias: {
      '@': fileURLToPath(new URL('./app/javascript', import.meta.url)),
    },
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

      // Optional: will not fail if the APP_VERSION environment variable is missing.
      APP_VERSION: null,
    }),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    RubyPlugin(),
    // babel(),
    reloadOnChange(["config/routes.rb", "app/views/**/*", "app/serializers/**/*.rb", "app/javascript/**/**/.ts"], { delay: 200 }),
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
    hmr: true,
    // hmr: {
    //   host: "localhost",
    //   overlay: true,
    //   usePolling: true,
    //   clientPort: 443,
    // },
  },
});
