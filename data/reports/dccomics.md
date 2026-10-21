---
title: "DC Comics Collection"
description: "A VueJS single-page app for the DC Comics coin collection, embedded in the Monnaie de Paris Magento store, with every product filterable from the homepage."
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
    notes: "The Vue app is optimised. The Magento theme around it loads ~300 kB of legacy scripts (jQuery, RequireJS, Knockout) that the rest of the store depends on. Every product is listed on the homepage, which makes for a long page with many DOM elements and network requests."
tags: ["VueJS", "Magento"]
icon: "zap"
---

## Approach

The DC Comics page is a VueJS SPA embedded in a Magento 2 theme. The main change on this collection is the data model, rebuilt around products and collections so the homepage can filter them.

- Custom Vue 2 platform that exposes Magento's e-commerce features inside the Vue app.
- Per-page structure replaced by a product and collection structure, which the homepage filters rely on.
- Images optimised at compile time, with each format chosen by hand.
