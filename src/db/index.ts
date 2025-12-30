import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "../utils/env";

const db = drizzle(ENV.DB_FILE_NAME);
export default db;
