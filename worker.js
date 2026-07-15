import app from "./.output/server/index.mjs";

export default {
  async fetch(request, env, ctx) {
    const auth = request.headers.get("Authorization");

    if (!auth || !auth.startsWith("Basic ")) {
      return new Response("Authentication Required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="viratfurniture Dev"',
        },
      });
    }

    const [user, pass] = atob(auth.split(" ")[1]).split(":");

    if (
      user !== env.DEV_USERNAME ||
      pass !== env.DEV_PASSWORD
    ) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="viratfurniture Dev"',
        },
      });
    }

    return app.fetch(request, env, ctx);
  },
};