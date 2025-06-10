# Nicolas Chesné - Portfolio

Hi.
This is the source code of my [portfolio](https://nicolaschesne.fr), built with [Astro](https://astro.build/).

## Who am I?
I'm Nicolas Chesné, a web developer with a passion for creating efficient and user-friendly web applications. I specialize in modern web technologies and frameworks, and I'm always eager to learn and explore new tools.

My favorite stack includes VueJS and NuxtJS, combined with headless frameworks such as Strapi or Directus, but most importantly, I love choosing the right tool for the job, whether it's a static site generator, a headless CMS, or a full-fledged framework.

For every project I work on, I strive to deliver high-quality code, maintainable architecture, and a seamless user experience.
For the last 3 years, I have also been working on reducing the carbon footprint of my projects, and I am always looking for ways to improve the sustainability of my work.

## What is this repository?
This repository contains the source code of my personal [portfolio](https://nicolaschesne.fr), which serves as a showcase of my work and skills as a web developer.

## How is it built?
As I was chasing the goal of having the most sustainable, most lightweight portfolio I could get, I ditched by beloved Nuxt stack for this project and decided to build it with Astro and pure vanilla JS.

For the images, I used a custom bayer algorythim to convert them to a pixelated format, which reduces their size and improves loading times. They are then displayed with a multiply blend mode to make them blend with the solid background color.
This idea came from [Low Tech Magazine](https://solar.lowtechmagazine.com/about/the-solar-website/), although I ported the algorithm to nodeJS as I didn't want to use a python script just for this.

The result is a fast, lightweight, and efficient portfolio that showcases my work without unnecessary bloat, that generates only 0.01g of CO2eq according to the [Sustainable Web Design model](https://sustainablewebdesign.org/estimating-digital-emissions/) 🌱.

I believe it showcases that sustainable webdesign doesn't have to be a compromise on quality or user experience.

> 💡 This portfolio, once compiled, only weight around 70kB (depending on the latests projects), which means I could store it 20 times on a single floppy disk! 

## How is it deployed?
I am using [Release Please](https://github.com/googleapis/release-please-action) to keep tracks of [releases](/releases). Once a release is created, the code is automatically deployed to GitHub Pages using GitHub Actions.

Sadly, Github pages isn't 100% powered by renewable energy so I may change the hosting solution in the future.

## 👀 Want to get in touch?

Feel free to reach out to me via my [portfolio](https://nicolaschesne.fr), or even by opening an issue here, because why not?
