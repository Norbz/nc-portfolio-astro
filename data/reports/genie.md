---
title: "Monnaie de Paris — Le Génie Français"
description: "A VueJS single-page application embedded in a Magento theme for the Génie Français coin collection."
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
    notes: "The VueJS app itself is optimised. The surrounding Magento theme loads ~300 kB over 120 network requests of legacy scripts that cannot be removed. 3D textures are high definition to preserve the details of the coin engraving, which contributes to the page weight.  Metrics are based in real production environment and reflect the whole website, not just my developments"
tags: ["VueJS", "Magento", "WebGL"]
icon: "leaf"
---

## What was done

The Génie Français page is a VueJS SPA embedded inside a Magento 2 theme. Development focused on keeping the Vue bundle lean while working around Magento's constraints.

- 3D WebGL model of the coin built with BabylonJS, only with heightmap from the engraving industrial process.
- Custom Vue2 platform that allows using the magento e-commerce functionality inside the Vue app.
- Auto Image optimisation at compile time, picture format are always manually selected to ensure the best compression possible.

## Constraints

Magento's theme injects ~300 kB of scripts (jQuery, RequireJS, Tags and GTML) on every page. These cannot be removed without breaking the rest of the store. The 1.01 g CO₂/view figure reflects this shared overhead.
