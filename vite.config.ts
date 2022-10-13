import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import react from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig({
  optimizeDeps: {
    include: ["@inertiajs/inertia"],
  },
  plugins: [
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    RubyPlugin(),
    babel(),
    FullReload(["config/routes.rb", "app/views/**/*", "app/serializers/**/*.rb"]),
    react({
      jsxRuntime: "classic",
      babel: {
        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/plugin-syntax-jsx"],
        // Your plugins run before any built-in transform (eg: Fast Refresh)
        plugins: [],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),
    // Create gzip copies of relevant assets
    gzipPlugin(),
    viteCommonjs(),
    // Create brotli copies of relevant assets
    gzipPlugin({
      customCompression: content => brotliCompressSync(Buffer.from(content)),
      fileName: ".br",
    }),
  ],
});
