import db from "@db";
import { respond } from "@utils";
import Elysia from "elysia";

const ApiRoute = new Elysia({ prefix: "/api" }).get("/health", async () => {
    await db.run("SELECT 1");

    return respond(true, "Service is healthy", {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    })
});

export default ApiRoute;