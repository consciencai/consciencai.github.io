/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
                mono: ['Courier Prime', 'monospace'],
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [
            "bumblebee",
            {
                darkbumblebee: {
                    primary: "#b79002ff",
                    "primary-content": "#733e0a",
                    secondary: "#ff8904",
                    "secondary-content": "#7c2808",
                    accent: "#f1d8adff",
                    "accent-content": "#111111",
                    neutral: "#372f1fff",
                    "neutral-content": "#f5d768ff",
                    "base-100": "#0B0F14",
                    "base-200": "#0F1620",
                    "base-300": "#16202C",
                    "base-content": "#f1ebc0ff",
                    info: "#60A5FA",
                    success: "#34D399",
                    warning: "#FBBF24",
                    error: "#F87171",
                },
            },
        ],
    },
};
