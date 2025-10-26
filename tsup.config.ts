import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    hooks: "src/hooks/index.ts",
    utils: "src/utils/index.ts",
    constants: "src/constants/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react", 
    "react-dom", 
    "@tanstack/react-table",
    "clsx",
    "tailwind-merge"
  ],
});
