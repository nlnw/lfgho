import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react(), tailwind()],
  adapter: cloudflare(),
  output: "hybrid",
  build: {
    assets: "static",
  },
});
