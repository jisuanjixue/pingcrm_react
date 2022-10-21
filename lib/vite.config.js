import { defineConfig, splitVendorChunkPlugin } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import react from "@vitejs/plugin-react";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
    optimizeDeps: {
        include: ["@inertiajs/inertia"],
    },
    plugins: [
        splitVendorChunkPlugin(),
        tsconfigPaths(),
        RubyPlugin(),
        FullReload(["config/routes.rb", "app/views/**/*", "app/serializers/**/*.rb"]),
        react(),
        gzipPlugin(),
        gzipPlugin({
            customCompression: content => brotliCompressSync(Buffer.from(content)),
            fileName: ".br",
        }),
    ],
});
//# sourceMappingURL=vite.config.js.map