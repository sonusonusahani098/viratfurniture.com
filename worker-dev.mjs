// Dev-only wrapper: Basic Auth lagata hai, phir Nuxt app ko request pass karta hai.
import app from "./.output/server/index.mjs";

function unauthorized() {
  return new Response("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Virat Furniture Dev"',
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    const auth = request.headers.get("Authorization");

    if (!auth || !auth.startsWith("Basic ")) {
      return unauthorized();
    }

    let user, pass;
    try {
      const decoded = atob(auth.split(" ")[1]);
      const idx = decoded.indexOf(":");
      user = decoded.slice(0, idx);
      pass = decoded.slice(idx + 1);
    } catch {
      return unauthorized();
    }

    if (user !== env.DEV_USERNAME || pass !== env.DEV_PASSWORD) {
      return unauthorized();
    }

    // Auth pass — Nuxt app ko request do
    return app.fetch(request, env, ctx);
  },
};