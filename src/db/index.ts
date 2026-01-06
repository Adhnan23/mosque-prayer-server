import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "@utils";
import { createClient } from "@libsql/client";

const client = createClient({ url: ENV.DB_FILE_NAME });
const db = drizzle({ client, logger: ENV.ENVIRONMENT === "development" });

export default db;
