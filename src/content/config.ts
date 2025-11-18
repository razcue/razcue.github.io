import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number(),
    locale: z.enum(['en', 'es']),
    // Optional project links
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
