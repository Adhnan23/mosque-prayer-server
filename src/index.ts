import { Elysia } from "elysia";
import { ENV } from "@utils";
import { Cors, errorHandler } from "@middlewares";
import ApiRoute from "@routes";

const app = new Elysia().onError(errorHandler).use(Cors);

// Serve index.html at /
app.get("*", async ({ set }) => {
  set.headers["content-type"] = "text/html";
  return await Bun.file("public/index.html").text();
});

// Serve JS and CSS assets
app.get("/assets/*", ({ request }) => {
  // request.url includes full URL → strip origin
  const url = new URL(request.url);
  return Bun.file("public" + url.pathname);
});

// Serve vite.svg
app.get("/vite.svg", () => Bun.file("public/vite.svg"));

// API routes
app.use(ApiRoute);

app.listen({
  hostname: "0.0.0.0",
  port: ENV.PORT,
});

console.log(
  `🦊 Elysia is running in ${ENV.ENVIRONMENT} mode at http://${
    app.server?.hostname || "localhost"
  }:${app.server?.port}/`
);
