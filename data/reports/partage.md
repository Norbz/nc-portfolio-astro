---
title: "Partage.org"
description: "NGO website rebuilt on WordPress with ACF Blocks, Tailwind and vanilla JavaScript. The redesign matches the new branding and fixes server response times that had grown past a minute."
project_id: "partage"
accent: "#f7b088"
duration_days: 75
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "claude-code", "gmail"]
use_metrics:
    websitecarbon_url: "https://www.websitecarbon.com/website/partage-org/"
    page_weight_kb: 5654
    co2_per_view_g: 0.18
    requests: 49
    performance_score: 79
    dom_elements: 650
    notes: "Most pictures are full-width. A few marketing trackers and third-party scripts load on every page."
tags: ["WordPress", "Tailwind", "VanillaJS"]
icon: "baby"
---

## Approach

The custom WordPress theme uses ACF and ACF Blocks for a modular content structure. Tailwind keeps the CSS small, while the WordPress architecture still produces a high number of DOM elements.

- Custom plugin that generates resized, optimised images.
- Plugins cut from nearly a hundred to 14, with a large effect on TTFB.

## Results

Conversion rates have gone up since launch, with fewer tools and much better performance.

The environmental impact dropped by 21%, with many more high-definition pictures than before.

Server response time went from over 75 seconds to an average TTFB of 100 ms. The average LCP is now 900 ms.
