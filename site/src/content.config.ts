import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Коллекция документации: каждая статья — MDX-файл в src/content/docs.
// Структура папок задаёт URL, frontmatter — метаданные и порядок в навигации.
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Порядок статьи внутри раздела навигации.
    order: z.number().default(0),
    // Черновики не попадают в production-сборку.
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
