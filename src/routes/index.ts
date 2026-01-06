import db from "@db";
import { respond } from "@utils";
import Elysia from "elysia";
import IkamahRoute from "./ikamah.routes";
import LanguagesRoute from "./languages.routes";

const ApiRoute = new Elysia({ prefix: "/api" })
  .use(IkamahRoute)
  .use(LanguagesRoute)
  .get("/health", async () => {
    await db.run("SELECT 1");

    return respond(true, "Service is healthy", {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
export default ApiRoute;
