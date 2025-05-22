// 1. Importer des utilitaires depuis `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Importer un ou plusieurs chargeurs
import { glob, file } from 'astro/loaders';

// 3. Définir votre/vos collection(s)
const projects = defineCollection({
  loader: file("data/projects.json"),
  schema: ({ image }) => z.object({
        name: z.string(),
        client:z.string(),
        agency: z.string(),
        description: z.string(),
        image: image(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        co2: z.number(),
        url: z.string().optional(),
        github: z.string().optional(),
      })
});

const skills = defineCollection({
  loader: file("data/skills.json"),
  schema: z.object({
        label:z.string(),
      })
});

// 4. Exporter un seul objet « collections » pour enregistrer votre/vos collection(s)
export const collections = { projects, skills };