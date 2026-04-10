---
title: "Monnaie de Paris — Astro Collection"
description: "A VueJS single-page application embedded in a Magento theme for the Astro coin collection. Page-level optimisation was possible, the Magento shell was not."
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
    notes: "The VueJS app itself is optimised. The surrounding Magento theme loads ~300 kB of legacy scripts that cannot be removed. Homepage feature high resolutions pictures."
tags: ["VueJS", "Magento"]
icon: "zodiac-scorpio"
---

## What was done

The Astro Collection page is a VueJS SPA embedded inside a Magento 2 theme. Development focused on keeping the Vue bundle lean while working around Magento's constraints.

- Custom Vue2 platform that allows using the magento e-commerce functionality inside the Vue app.
- Auto Image optimisation at compile time, picture format are always manually selected to ensure the best compression possible.

## Constraints

Magento's theme injects ~300 kB of scripts (jQuery, RequireJS, Knockout) on every page. These cannot be removed without breaking the rest of the store. The 1.01 g CO₂/view figure reflects this shared overhead.
