---
title: "Partage.org"
description: "NGO website built on Wordpress with ACF Blocks, Tailwind and vanilla Javascript. The project was a complete redesign and development of the website to match the new branding and to fix previous catastrophic response times."
project_id: "partage"
accent: "#f7b088"
duration_days: 4
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "claude-code", "gmail"]
use_metrics:
    websitecarbon_url: "https://www.websitecarbon.com/website/partage-org/"
    page_weight_kb: 5654
    co2_per_view_g: 0.18
    requests: 49
    performance_score: 79
    dom_elements: 650
    notes: "Most pictures are full width. Few Marketting trackers and  third parties scripts loaded on every pages."
tags: ["Wordpress", "Tailwind", "VanillaJS"]
icon: "baby"
---

## What was done

The Wordpress custom theme uses ACF and ACF blocks to create a modular and flexible content structure. Tailwind allows for a low CSS footprint, but the Wordpress architecture results in a high number of DOM elements.

- Uses a custom plugin to generate resized, and optimized images.
- Plugin usage dropped from near a hundred to 14, resulting in a significant TTFB improvement.

## Results

With less tools but far better performance, website conversion rates are actually up since the launch.

Environmental impacts dropped by 21% while using way more high definition pictures.
Server response times, and perceived speed metrics dropped by an astonishing 99%, down to an average 100ms TTFB and an average 900ms LCP.
