import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { frameTones, menuCategories } from './data/site';

function entryId({ entry }: { entry: string }) {
  return entry.replace(/\.[^.]+$/, '').replace(/\\/g, '/');
}

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD, like 2026-11-14.')
  .refine((value) => {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, 'Use a real calendar date.');

const menu = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/menu',
    generateId: entryId,
  }),
  schema: z.object({
    name: z.string(),
    price: z.string(),
    category: z.enum(menuCategories),
    detail: z.string(),
    order: z.number().default(0),
    placeholder: z.boolean().default(true),
  }),
});

const events = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/events',
    generateId: entryId,
  }),
  schema: z.object({
    title: z.string(),
    date: isoDate,
    time: z.string(),
    place: z.string(),
    summary: z.string(),
    placeholder: z.boolean().default(true),
  }),
});

const gallery = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/gallery',
    generateId: entryId,
  }),
  schema: z
    .object({
      title: z.string(),
      caption: z.string(),
      tone: z.enum(frameTones).default('mango'),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      order: z.number().default(0),
      placeholder: z.boolean().default(true),
    })
    .refine((entry) => !entry.image || Boolean(entry.imageAlt?.trim()), {
      message: 'Add imageAlt when you set image.',
      path: ['imageAlt'],
    })
    .refine((entry) => !entry.image || entry.image.startsWith('/'), {
      message: 'Image paths should start with /, like /images/gallery/photo.jpg.',
      path: ['image'],
    }),
});

const zine = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/zine',
    generateId: entryId,
  }),
  schema: z.object({
    title: z.string(),
    issue: z.string(),
    date: isoDate,
    summary: z.string(),
    status: z.string().default('Draft'),
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { menu, events, gallery, zine };
