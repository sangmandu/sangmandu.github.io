import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    excerpt_en: z.string().optional(),
  }),
});

export const collections = { posts };
