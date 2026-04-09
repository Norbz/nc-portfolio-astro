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
        name: z.string(),
        description: z.string(),
        icon: z.string(),
        purchaseDate: z.coerce.date(),
        ratio: z.number().default(1),
        wattage: z.number().optional(),
        daily_hours: z.number().optional(),
        lifecycle_co2: z.number(),
        manufacturer_lifespan_days: z.number(),
        use_phase_percent: z.number(),
        estimated_lifespan_days: z.number(),
        water_per_day_l: z.number().optional(),
        source: z.string().optional(),
        comments: z.string().optional()
      })
});

// Services (GitHub, CDN, AI tools) used during project development
const services = defineCollection({
  loader: file("data/services.json"),
  schema: z.object({
        name: z.string(),
        icon: z.string(),
        description: z.string(),
        co2_per_month_g: z.number(),
        kwh_per_month: z.number().optional(),
        source: z.string().optional(),
        comments: z.string().optional()
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
        icon: z.string().optional(),
        project_id: z.string().optional(),
        accent: z.string().default('#f2d94c'),
        duration_days: z.number(),
        hardware_used: z.array(z.string()),
        services_used: z.array(z.string()).default([]),
        use_metrics: z.object({
          page_weight_kb: z.number().optional(),
          co2_per_view_g: z.number().optional(),
          requests: z.number().optional(),
          performance_score: z.number().optional(),
          dom_elements: z.number().optional(),
          notes: z.string().optional(),
          websitecarbon_url: z.string().optional(),
        }).optional(),
      })
});

// Export the collections to be used in the Astro project
export const collections = { projects, skills, hardware, services, reports };
