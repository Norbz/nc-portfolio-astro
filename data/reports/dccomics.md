---
title: "Monnaie de Paris — DC Comics Collection"
description: "A VueJS single-page application embedded in a Magento theme for the DC Comics coin collection. Page-level optimisation was possible, the Magento shell was not."
project_id: "dccomics"
duration_days: 35
hardware_used: ["mbp-m2", "screen34", "ipad", "samsung-s9", "accessories"]
services_used: ["github", "claude-code", "gmail"]
use_metrics:
    websitecarbon_url: "https://www.websitecarbon.com/website/monnaiedeparis-fr-fr-dc-comics/"
    page_weight_kb: 434
    co2_per_view_g: 1.13
    requests: 414
    performance_score: 87
    dom_elements: 3201
    notes: "The VueJS app itself is optimised. The surrounding Magento theme loads ~300 kB of legacy scripts that cannot be removed. All products are visible on the homepage resulting in a very long page with a lot of DOM elements and network requests."
tags: ["VueJS", "Magento"]
icon: "zap"
---

## What was done

The DC Comics Collection page is a VueJS SPA embedded inside a Magento 2 theme. Development focused on keeping the Vue bundle lean while working around Magento's constraints.

- Custom Vue2 platform that allows using the magento e-commerce functionality inside the Vue app.
- Auto Image optimisation at compile time, picture format are always manually selected to ensure the best compression possible.
- Moved previous per-page structure toward a product/collection oriented structure to allow for the different filters used in the homepage.

## Constraints

Magento's theme injects ~300 kB of scripts (jQuery, RequireJS, Knockout) on every page. These cannot be removed without breaking the rest of the store. The 1.01 g CO₂/view figure reflects this shared overhead.
