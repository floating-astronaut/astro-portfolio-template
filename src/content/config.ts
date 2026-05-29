import { defineCollection, z } from 'astro:content';

// Blog collection — drop .mdx files into src/content/blog/ and they're
// picked up automatically. Wire a `/blog` index + `/blog/[slug]` route to
// render them (see README "Content collections").
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Your Name'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      readingMinutes: z.number().int().positive().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
