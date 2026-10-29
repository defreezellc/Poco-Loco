# Poco Loco Market

A starting website for [pocolocomarket.com](https://pocolocomarket.com). It is a small static site: a landing page, plus pages for a menu, events, a photo gallery, and a zine.

The design is the real foundation. The words, prices, dates, and pictures are **samples**. Each one is marked on the page (a yellow “Sample” chip, a “Sample image” frame, or a “Sample price”) so they are easy to spot and replace.

Built with [Astro](https://astro.build). The published site is plain HTML, CSS, and a few lines of JavaScript for the mobile menu, so it can be hosted for free on any static host.

## Run it locally

Install [Node.js](https://nodejs.org) 20 or newer, then from this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:4321/Poco-Loco/](http://localhost:4321/Poco-Loco/). Local dev uses the same `/Poco-Loco/` base path as the GitHub Pages test site, so links match production.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site with live reload |
| `npm run check` | Typecheck the project |
| `npm run build` | Write the static site into `dist/` |
| `npm run preview` | Serve the `dist/` folder locally |

## Where things live

```text
src/data/site.ts          Name, tagline, about text, address, hours, email
src/content/menu/         One markdown file per menu item
src/content/events/       One markdown file per event
src/content/gallery/      One markdown file per photo
src/content/zine/         One markdown file per zine issue
src/pages/                The page layouts
public/                   Favicon and, later, real images
```

The header links are the `nav` list in `src/data/site.ts`.

## Add content

### Homepage copy

Edit `src/data/site.ts`.

- `tagline` is the line under the big title. It is labeled “Draft tagline” on the page.
- `about` is the two paragraphs in the about section.
- `address`, `hours`, and `email` are the “Come by” block. An address at `example.com` is shown as a sample, not a mailto link. Put the real inbox in `email` and it becomes a link.
- `socials` at the bottom of that file starts empty. Add `{ label: 'Instagram', href: 'https://…' }` when you have a real profile.
- `indexable` stays `false` while the site is still sample copy, which asks search engines not to index it. Set it to `true` when the real content is up.

### Menu

Add a file such as `src/content/menu/horchata.md`:

```yaml
---
name: Horchata
price: "$4"
category: Drinks
detail: Rice drink with cinnamon, served over ice.
order: 10
placeholder: false
---
```

`category` must be `Food`, `Drinks`, or `Market`. `order` controls the sort inside that category (lower numbers come first). Set `placeholder: false` once the item is real so the Sample chip goes away. Delete the sample files when you no longer want them.

### Events

Add a file such as `src/content/events/saturday-market.md`:

```yaml
---
title: Saturday market
date: "2026-11-14"
time: 10:00 a.m. – 2:00 p.m.
place: Your real address
summary: What is happening, in a sentence or two.
placeholder: false
---
```

Keep `date` quoted, in `YYYY-MM-DD` form. Events are listed earliest first.

### Gallery

Sample frames are drawn in CSS on purpose, so nobody mistakes them for photos of the market.

To use a real photo:

1. Put the file in `public/images/gallery/`, for example `public/images/gallery/saturday.jpg`.
2. Point a gallery entry at it:

```yaml
---
title: Saturday under the awning
caption: Neighbors at the first market of the season.
tone: mango
image: /images/gallery/saturday.jpg
imageAlt: Neighbors talking under the striped awning
order: 1
placeholder: false
---
```

`image` must start with `/` and should not include the `/Poco-Loco` base. The build adds that prefix. `imageAlt` is required whenever `image` is set — describe the picture for someone who cannot see it. `tone` (`chili`, `mango`, `cactus`, `grape`, or `sky`) only shows while the frame is still a sample.

### Zine

Add `src/content/zine/issue-01.md`. The top of the file is the cover info; everything after the second `---` is the article, in Markdown.

```yaml
---
title: First Saturday
issue: "01"
date: "2026-12-01"
summary: Notes from the first market, a recipe, and a playlist.
status: New
placeholder: false
---
```

Then write the issue in Markdown underneath. The newest issue is featured on the Zine page, and each issue gets its own URL, such as `/zine/issue-01`. On the GitHub Pages test site that address is `/Poco-Loco/zine/issue-01`. You still write `/zine/issue-01` in links. The build adds the base path.

A picture inside an issue works the same way as the gallery: save it under `public/images/` and embed it with a root-relative path. Do not include `/Poco-Loco` in the path. The build adds the base.

```markdown
![Stacks of the new issue on the counter](/images/zine/issue-01-stack.jpg)
```

## Deploy

The test site is [https://defreezellc.github.io/Poco-Loco/](https://defreezellc.github.io/Poco-Loco/). `.github/workflows/pages.yml` builds and deploys on every push to `main`. Pull requests are only typechecked and built, by `.github/workflows/build.yml`.

Before the first deploy, in the GitHub repo open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Leave the custom domain blank. After that workflow succeeds, the site is at the URL above.

`npm run build` writes the static site to `dist/`. The defaults in `astro.config.mjs` publish it under `/Poco-Loco/`.

### Switch to pocolocomarket.com later

Change the two defaults at the top of `astro.config.mjs` (or set the same values as env vars when you build):

```bash
SITE=https://pocolocomarket.com
BASE_PATH=/
```

`BASE_PATH=/` is the domain root. Links and assets drop the `/Poco-Loco` prefix. Then, in **Settings → Pages**, set the custom domain to `pocolocomarket.com` and follow GitHub’s DNS instructions. Do not add a `CNAME` file until you make that switch. The GitHub Actions workflow itself does not need to change.

Until `indexable` is `true` in `src/data/site.ts`, pages send `noindex`, so sample copy is less likely to show up in search.

Other static hosts (Cloudflare Pages, Netlify, Vercel) can serve the same `dist/` folder. Use them with `BASE_PATH=/` and `SITE` set to that host’s URL, unless you are also serving the site from a subpath.

## Favicon

`public/favicon.svg` is the red “PL” mark from the header. Swap that file if you get a real logo.
