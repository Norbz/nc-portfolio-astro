---
title: "Astro Collection"
description: "A VueJS single-page app for the Astro coin collection, embedded in the Monnaie de Paris Magento store. Page-level optimisation was possible, the Magento shell was not."
project_id: "astro"
accent: "#A78BFA"
duration_days: 40
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "gmail"]
use_metrics:
    page_weight_kb: 1738
    co2_per_view_g: 0.56
    requests: 119
    performance_score: 85
    dom_elements: 1615
    notes: "The Vue app is optimised. The Magento theme around it loads ~300 kB of legacy scripts (jQuery, RequireJS, Knockout) that the rest of the store depends on, and they count in every figure above. The homepage features high-resolution pictures."
tags: ["VueJS", "Magento"]
icon: "zodiac-scorpio"
---

## Approach

The Astro Collection page is a VueJS SPA embedded in a Magento 2 theme. Optimisation work targeted the Vue bundle, the part of the page this project controls.

- Custom Vue 2 platform that exposes Magento's e-commerce features inside the Vue app.
- Images optimised at compile time, with each format chosen by hand for the best compression.
