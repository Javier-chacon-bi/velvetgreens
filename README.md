# Velvet Greens — Website v1

Static frontend built with [Astro](https://astro.build), deployed on GitHub Pages, connected to a Cloudflare Workers + D1 backend.

## Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | Astro (static output)         |
| Hosting    | GitHub Pages + custom domain  |
| API        | Cloudflare Workers            |
| Database   | Cloudflare D1 (SQLite)        |
| CDN / DNS  | Cloudflare                    |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Worker URL
cp .env.example .env

# 3. Start dev server
npm run dev
```

Open http://localhost:4321

---

## Environment Variables

| Variable          | Description                          |
|-------------------|--------------------------------------|
| `PUBLIC_API_BASE` | Base URL of your Cloudflare Worker   |

Set this as a **GitHub Actions secret** (`PUBLIC_API_BASE`) for CI builds.

---

## Deploy

Push to `main` — GitHub Actions builds and deploys automatically.

### First-time setup:
1. Go to repo **Settings → Pages**
2. Source: **GitHub Actions**
3. Add secret: `PUBLIC_API_BASE = https://api.velvetgreens.com`
4. DNS: Add a CNAME record pointing `velvetgreens.com` → `<username>.github.io`

---

## Pages

| Route                     | Description              |
|---------------------------|--------------------------|
| `/`                       | Home                     |
| `/ingredients`            | Ingredient listing       |
| `/ingredients/[slug]`     | Ingredient detail        |
| `/recipes`                | Recipes listing          |
| `/recipes/[slug]`         | Recipe detail            |
| `/about`                  | Brand story              |

---

## API Contract

The frontend expects these endpoints from your Cloudflare Worker:

```
GET /api/ingredients             → Array of ingredients (active=true)
GET /api/ingredients?featured=true → Featured ingredients
GET /api/ingredients/:slug       → Single ingredient
GET /api/recipes                 → Array of recipes (active=true)
GET /api/recipes?ingredient=:id  → Recipes linked to an ingredient
GET /api/recipes/:slug           → Single recipe
```

### Ingredient object
```json
{
  "id": 1,
  "name": "Mucuna Pruriens",
  "slug": "mucuna-pruriens",
  "subtitle": "Natural dopamine support for focus and vitality",
  "description": "...",
  "benefits": ["Supports dopamine production", "..."],
  "traditional_uses": "...",
  "usage": ["Smoothies", "Capsules"],
  "image_url": "https://...",
  "tags": ["adaptogens"],
  "active": true,
  "featured": true
}
```

### Recipe object
```json
{
  "id": 1,
  "name": "Adaptogenic Smoothie",
  "slug": "adaptogenic-smoothie",
  "description": "...",
  "steps": ["Step 1...", "Step 2..."],
  "ingredients": [{ "name": "Mucuna Pruriens", "slug": "mucuna-pruriens" }],
  "image_url": "https://...",
  "active": true
}
```

---

## Media Placeholders

Place your images in `/public/media/`:

```
public/media/
  ingredient_1.jpg
  ingredient_2.jpg
  ingredient_3.jpg
  recipe_1.png
  recipe_2.png
  recipe_3.png
  philosophy.jpg
  about.jpg
  sourcing.jpg
  favicon.png
```
