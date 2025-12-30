import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { ENV } from "./utils/env";
import errorHandler from "./middlewares/errorHandler";
import api from "./routes";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use(
    openapi({
      references: fromTypes(),
      documentation: {
        info: {
          title: "Kandakuliya Mosque Prayer Time API",
          version: "1.0.0",
          description:
            "API documentation for Kandakuliya Mosque Prayer Time Service",
          contact: {
            name: "Sheik Adhnan (Karots)",
            email: "karots@karots.lk",
            url: "https://karots.lk",
          },
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
          termsOfService: "https://karots.lk",
        },
      },
    })
  )
  .onError(errorHandler)
  .use(api)
  .listen(ENV.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
