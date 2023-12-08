import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		editDate: z.date().optional(),
		description: z.string(),
		author: z.string(),
		image: z
			.object({
				url: z.string(),
				alt: z.string(),
				originalPhotographerName: z.string().optional(),
				originalLink: z.string().optional(),
			})
			.optional(),
		tags: z.array(z.string()),
	}),
});

export const collections = {
	posts: postsCollection,
};
