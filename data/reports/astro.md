---
title: "Monnaie de Paris — Astro Collection"
description: "A VueJS single-page application embedded in a Magento theme for the Astro coin collection. Page-level optimisation was possible; the Magento shell was not."
date: "2025-04-01"
project_id: "astro"
accent: "#A78BFA"
duration_days: 40
hardware_used: ["mbp", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "s3", "claude-code", "gmail"]
use_metrics:
    page_weight_kb: 1738
    co2_per_view_g: 0.56
    requests: 119
    performance_score: 85
    dom_elements: 1615
    notes: "The VueJS app itself is optimised (tree-shaken, lazy-loaded assets). The surrounding Magento theme loads ~300 kB of legacy scripts that cannot be removed."
tags: ["VueJS", "Magento", "Monnaie de Paris"]
icon: "zodiac-scorpio"
---

## What was done

The Astro Collection page is a VueJS SPA embedded inside a Magento 2 theme. Development focused on keeping the Vue bundle lean while working around Magento's constraints.

- Custom Vue2 platform that allows using the magento e-commerce functionality inside the Vue app.
- Auto Image optimisation at compile time

## Constraints

Magento's theme injects ~300 kB of scripts (jQuery, RequireJS, Knockout) on every page. These cannot be removed without breaking the rest of the store. The 1.01 g CO₂/view figure reflects this shared overhead.
