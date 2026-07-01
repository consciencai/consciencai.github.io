
import { defineCollection, z } from "astro:content";


import { glob } from "astro/loaders";


const blog = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        
        base: "./src/blog/",
    }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        fulltitle: z.string().optional(),
        subtitle: z.string().optional(),
        subtext: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        image: z.string().optional(),
        citation: z.object({
            authors: z.array(z.string()).optional(),
            title: z.string().optional(),
            version: z.string().optional(),
            versionDate: z.string().optional(),
            originalDate: z.string().optional(),
            doi: z.string().optional(),
            zenodoConceptDoi: z.string().optional(),
            previousVersions: z.array(z.object({
                version: z.string(),
                date: z.string(),
                url: z.string().optional(),
                pdf: z.string().optional(),
                doi: z.string().optional(),
                note: z.string().optional(),
            })).optional(),
        }).optional(),
    }),
});

export const collections = { blog };
