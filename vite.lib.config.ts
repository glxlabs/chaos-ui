import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/components/**/*", "src/utils/**/*", "src/hooks/**/*", "src/lib/**/*"],
      exclude: [
        "src/components/sections/**/*",
        "src/components/showcase/**/*",
        "src/main.tsx",
        "src/App.tsx",
      ],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "./src/lib/index.ts",
        styles: "./src/lib/styles.css",
      },
      name: "ChaoSUI",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "React",
          "lucide-react": "LucideReact",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
