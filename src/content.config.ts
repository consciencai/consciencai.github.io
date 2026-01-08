// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        // original config was: base: "./src/content/BlogPosts",
        base: "./src/blog/",
    }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        image: z.string().optional()
    }),
});
// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };
