import { z } from "zod";

const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "production", "test"]),
  DB_FILE_NAME: z.string().min(1, "DB_FILE_NAME is required"),
  PORT: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val), {
      message: "PORT must be a number",
    }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.prettifyError(parsedEnv.error));
  throw new Error("Invalid environment configuration");
}

const ENV = parsedEnv.data;
export default ENV;
