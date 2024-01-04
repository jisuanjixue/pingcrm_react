import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import react from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
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
    react({
      include: "**/*.tsx",
    }),
    // Create gzip copies of relevant assets
    gzipPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ['html', 'js', 'ts', 'jsx', 'tsx'],
        dirs: ['app/views', 'app/javascript'], // or app/javascript, or app/packs
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
      usePolling: true,
      clientPort: 443,
    },
  },
});
