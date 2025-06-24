import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';


// Projects displayed on the portfolio's page
const projects = defineCollection({
  loader: file("data/projects.json"),
  schema: ({ image }) => z.object({
        name: z.string(),
        client:z.string(),
        agency: z.string().optional(),
        description: z.string(),
        image: image(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        co2: z.number(),
        url: z.string().optional(),
        github: z.string().optional(),
      })
});

// simple list of skills to create the never ending scroll of skills
const skills = defineCollection({
  loader: file("data/skills.json"),
  schema: z.object({
        label:z.string(),
      })
});


// A list of the hardware used to produce my projects, detailing their lifecycle CO2 and lifespan
const hardware = defineCollection({
  loader: file("data/hardware.json"),
  schema: z.object({
        name:z.string(),
        description:z.string(),
        icon:z.string(),
        purchaseDate:z.coerce.date(),
        wattage:z.number().optional(),
        lifecycle_co2:z.number(),
        lifecycle_lifespan:z.number(),
        emboddied_co2_percent:z.number(),
        estimated_lifespan:z.number().optional(),
        source:z.string().optional(),
        comments:z.string().optional()
      })
});

// reports holds the CO2 reports of my productions, including "emboddied" CO2 based on my hardware
const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "data/reports" }),
  schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
      })
});

// Export the collections to be used in the Astro project
export const collections = { projects, skills, hardware, reports };