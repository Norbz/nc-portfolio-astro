---
title: "Monnaie de Paris — Lord of the rings"
description: "A VueJS single-page application embedded in a Magento theme for the Lord of the Rings coin collection. Page-level optimisation was possible, the Magento shell was not. Migrated to VueJS 3."
project_id: "lotr"
accent: "#fbbf24"
duration_days: 40
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "s3", "claude-code-heavy", "gmail"]
use_metrics:
    page_weight_kb: 5423
    co2_per_view_g: 0.8
    requests: 437
    performance_score: 85
    dom_elements: 1576
    notes: "The VueJS app itself is optimised and even faster since migrated to VueJS 3. The surrounding Magento theme loads ~300 kB of legacy scripts that cannot be removed. Homepage feature high resolutions pictures. The landing iteself only takes 38 requests and around 700kB of assets."
tags: ["VueJS", "Magento"]
icon: "eye"
---

## What was done

The Lord of the Rings Collection page is a VueJS SPA embedded inside a Magento 2 theme. Development focused on keeping the Vue bundle lean while working around Magento's constraints.

- Custom Vue3 platform that allows using the magento e-commerce functionality inside the Vue app.
- Auto Image optimisation at compile time
- Improved Image optimisation by allowing some folder or patterns to be converted tp WebP, resulting in a 60% reduction for all coins pictures.
- Picture format are always manually selected to ensure the best compression possible.
- Lightweight, single file RUM script deployed to production to help the client monitor the performance of the website in real conditions and identify sources of performance issues.

## Vue 3 migration

The Vue 3 refactoring was done with the help or Claude Code, used in a more intensive manner than I usually do for any project, resulting in a higher embodied carbon cost for the development phase.
