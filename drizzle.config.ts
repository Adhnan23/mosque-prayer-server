import { defineConfig } from "drizzle-kit";
import { ENV } from "@utils";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: ENV.DB_FILE_NAME,
  },
});
