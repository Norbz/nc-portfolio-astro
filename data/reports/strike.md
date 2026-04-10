---
title: "Strike"
description: "The agency website runs on a Nuxt frontend and a Strapi backend, upgraded to Strapi 4 around 2024 to handle i18n."
project_id: "strike"
accent: "#FFFFFF"
duration_days: 30
hardware_used: ["mbp-m2", "screen34", "samsung-s9", "accessories"]
services_used: ["github", "gmail"]
use_metrics:
    websitecarbon_url: "https://www.websitecarbon.com/website/strike-paris/"
    page_weight_kb: 8665
    co2_per_view_g: 0.13
    requests: 122
    performance_score: 88
    dom_elements: 142
    notes: "The page weight is due to the autoplay trailer in the homepage"
tags: ["VueJS", "Strapi", "Nuxt"]
icon: "check"
---

## What was done

The website uses a classic Nuxt frontend with a Strapi backend

- Runs on a tiny VPS with 1vCPU and 2 GB of RAM
- Very lightweight and snappy even though the frontend uses a lot of autoplay videos

## Updates

Leveraged the decoupled architecture to upgrade Strapi to version 4 around 2024, allowing for better i18n support and improved content management features without affecting the frontend.
