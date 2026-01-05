import { Elysia } from "elysia";
import { ENV } from "@utils";
import { Cors, errorHandler, Static } from "@middlewares";
import ApiRoute from "@routes";

const app = new Elysia()
  .use(Cors)
  .use(Static)
  .use(ApiRoute)
  .onError(errorHandler)
  .listen(ENV.PORT);

console.log(
  `🦊 Elysia is running in ${ENV.ENVIRONMENT} mode at http://${app.server?.hostname || "localhost"}:${app.server?.port}/`
);

process.on("SIGINT", async () => {
  console.log("🦊 Shutting down...");
  await app.server?.stop();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🦊 Received SIGTERM, shutting down...");
  await app.server?.stop();
  process.exit(0);
});