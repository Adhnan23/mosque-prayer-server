import createHttpError from "http-errors";
import { ZodError, z } from "zod";
import { DrizzleQueryError, DrizzleError } from "drizzle-orm";
import { respond } from "../utils/respond.js";

const ENVIRONMENT = process.env.ENVIRONMENT || "undefined";

export const errorHandler = (err, req, res, next) => {
  // Log full error in development
  if (ENVIRONMENT === "development") {
    console.error(err);
  }

  // 1) Zod validation errors
  if (err instanceof ZodError) {
    const prettyString = z.prettifyError(err); // human-friendly
    const errorData =
      ENVIRONMENT === "development"
        ? { raw: err.issues, pretty: prettyString.split("\n") }
        : { message: "Invalid input" };

    return res
      .status(400)
      .json(respond(false, "Validation Failed", null, errorData));
  }

  // 2) HTTP errors
  if (createHttpError.isHttpError(err)) {
    const errorData =
      ENVIRONMENT === "development" ? { status: err.statusCode } : null;
    return res
      .status(err.statusCode)
      .json(respond(false, err.message, null, errorData));
  }

  // 3) Drizzle/SQLite errors
  if (err instanceof DrizzleQueryError || err instanceof DrizzleError) {
    const cause = err.cause || {};
    const sqliteMessage = cause.message || null;

    const errorData =
      ENVIRONMENT === "development"
        ? {
            drizzleName: err.name,
            message: err.message,
            code: cause.code || null,
            detail: sqliteMessage,
          }
        : null;

    const status =
      sqliteMessage && sqliteMessage.includes("UNIQUE constraint failed")
        ? 409
        : 500;

    const message =
      ENVIRONMENT === "development"
        ? "Database Error"
        : "Internal Server Error";

    return res.status(status).json(respond(false, message, null, errorData));
  }

  // 4) Fallback / unknown errors
  const errorData =
    ENVIRONMENT === "development"
      ? { message: err?.message, stack: err?.stack }
      : null;

  return res
    .status(500)
    .json(respond(false, "Internal Server Error", null, errorData));
};
