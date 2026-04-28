// src/lib/api.js
// All data fetched from Cloudflare Workers API.
// Replace API_BASE with your actual Workers URL before deploying.

const API_BASE = import.meta.env.PUBLIC_API_BASE || 'https://api.velvetgreens.com';

async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export async function getIngredients() {
  return fetchJSON('/api/ingredients');
}

export async function getIngredient(slug) {
  return fetchJSON(`/api/ingredients/${slug}`);
}

export async function getRecipes() {
  return fetchJSON('/api/recipes');
}

export async function getRecipe(slug) {
  return fetchJSON(`/api/recipes/${slug}`);
}
