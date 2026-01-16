import { z } from "zod";

// Define schema to validate hardcoded values
const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "production", "test"]),
  DB_FILE_NAME: z.string().min(1, "DB_FILE_NAME is required"),
  PORT: z.number().refine((val) => !Number.isNaN(val), {
    message: "PORT must be a number",
  }),
  BASE_URL: z.string().url("BASE_URL must be a valid URL"),
});

// Hardcoded values from your .env
const hardcodedEnv = {
  ENVIRONMENT: "production",
  DB_FILE_NAME: "file:./db/mosque.db",
  PORT: 3000,
  BASE_URL: "http://localhost:3000",
};

// Validate the hardcoded values
const parsedEnv = envSchema.safeParse(hardcodedEnv);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.prettifyError(parsedEnv.error));
  throw new Error("Invalid environment configuration");
}

const ENV = parsedEnv.data;
export default ENV;
