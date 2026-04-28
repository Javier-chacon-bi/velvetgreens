const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.velvetgreens.co',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function withCors(response) {
  const res = new Response(response.body, response);
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      const url = new URL(request.url);

      // INGREDIENTS
      if (url.pathname === '/api/ingredients') {
        const { results } = await env.DB.prepare(
          'SELECT * FROM ingredients WHERE active = 1'
        ).all();

        return withCors(Response.json(results.map(i => ({
          ...i,
          benefits: JSON.parse(i.benefits || '[]'),
        }))));
      }

      if (url.pathname.startsWith('/api/ingredients/')) {
        const slug = url.pathname.split('/').pop();

        const result = await env.DB.prepare(
          'SELECT * FROM ingredients WHERE slug = ?'
        ).bind(slug).first();

        if (result?.benefits) {
          result.benefits = JSON.parse(result.benefits);
        }

        return withCors(Response.json(result));
      }

      // RECIPES
      if (url.pathname === '/api/recipes') {
        const { results } = await env.DB.prepare(
          'SELECT * FROM recipes WHERE active = 1'
        ).all();

        return withCors(Response.json(results.map(r => ({
          ...r,
          steps: JSON.parse(r.steps || '[]'),
          ingredients: JSON.parse(r.ingredients || '[]'),
        }))));
      }

      if (url.pathname.startsWith('/api/recipes/')) {
        const slug = url.pathname.split('/').pop();

        const result = await env.DB.prepare(
          'SELECT * FROM recipes WHERE slug = ?'
        ).bind(slug).first();

        if (result) {
          result.steps = JSON.parse(result.steps || '[]');
          result.ingredients = JSON.parse(result.ingredients || '[]');
        }

        return withCors(Response.json(result));
      }

      return withCors(new Response('Not found', { status: 404 }));

    } catch (e) {
      return withCors(new Response(
        JSON.stringify({ error: e.message }),
        { status: 500 }
      ));
    }
  },
};
