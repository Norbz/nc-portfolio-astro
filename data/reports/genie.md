---
title: "Le Génie Français"
description: "A VueJS single-page app for the Génie Français coin collection, embedded in the Monnaie de Paris Magento store, with a 3D WebGL model of the coin."
project_id: "genie"
accent: "#61A5FA"
duration_days: 45
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "s3", "claude-code", "gmail"]
use_metrics:
    page_weight_kb: 7644
    co2_per_view_g: 0.75
    requests: 122
    performance_score: 61
    dom_elements: 1582
    notes: "The Vue app is optimised. The Magento theme around it loads ~300 kB of legacy scripts over 120 network requests (jQuery, RequireJS, tags and GTM). The 3D textures stay high-definition to keep the details of the coin engraving, which adds to the page weight. Figures come from the production site and cover the whole page around my work."
tags: ["VueJS", "Magento", "WebGL"]
icon: "leaf"
---

## Approach

The Génie Français page is a VueJS SPA embedded in a Magento 2 theme. It centres on a 3D model of the coin, rendered in WebGL.

- 3D WebGL model built with BabylonJS from the heightmap of the industrial engraving process alone.
- Custom Vue 2 platform that exposes Magento's e-commerce features inside the Vue app.
- Images optimised at compile time, with each format chosen by hand.
