---
title: "Strike"
description: "The agency website runs on a Nuxt frontend and a Strapi backend, upgraded to Strapi 4 around 2024 for i18n."
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
    notes: "Most of the page weight comes from the autoplay trailer on the homepage."
tags: ["VueJS", "Strapi", "Nuxt"]
icon: "check"
---

## Approach

The website uses a classic Nuxt frontend with a Strapi backend.

- Hosted on a small VPS with 1 vCPU and 2 GB of RAM.
- Very lightweight and snappy, even on mobile, although the frontend uses a lot of autoplay videos.

## Maintenance

The decoupled architecture allowed an upgrade to Strapi 4 around 2024, for better i18n support and content management, without touching the frontend.
