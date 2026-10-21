---
title: "The Lord of the Rings"
description: "A VueJS single-page app for the Lord of the Rings coin collection, embedded in the Monnaie de Paris Magento store and migrated to Vue 3."
project_id: "lotr"
accent: "#fbbf24"
duration_days: 40
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "claude-code-heavy", "gmail"]
use_metrics:
    page_weight_kb: 5423
    co2_per_view_g: 0.8
    requests: 437
    performance_score: 85
    dom_elements: 1576
    notes: "The Vue app is optimised and runs faster since the move to Vue 3. The Magento theme around it loads ~300 kB of legacy scripts that the rest of the store depends on. The homepage features high-resolution pictures. The landing page itself takes 38 requests and around 700 kB of assets."
tags: ["VueJS", "Magento"]
icon: "eye"
---

## Approach

The Lord of the Rings page is a VueJS SPA embedded in a Magento 2 theme, rebuilt on Vue 3 for this collection.

- Custom Vue 3 platform that exposes Magento's e-commerce features inside the Vue app.
- Images optimised at compile time, with each format chosen by hand.
- WebP conversion for selected folders and patterns, which cut the weight of all coin pictures by 60%.
- Lightweight single-file RUM script in production, so the client can monitor real-world performance and find the sources of slowdowns.

## Vue 3 migration

The Vue 3 refactoring relied on Claude Code much more than my other projects, which raises the build footprint of the development phase.
