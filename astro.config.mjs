
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { template } from "./src/settings";

import sitemap from "@astrojs/sitemap";


export default defineConfig({
    integrations: [react(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    site: 'https://conscienc.ai',
    
    base: template.base,
});
