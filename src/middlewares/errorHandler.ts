// src/middleware/errorHandler.ts
import { NotFoundError, InternalServerError } from "elysia";
import { ZodError, z } from "zod";
import { DrizzleQueryError, DrizzleError } from "drizzle-orm";
import respond from "../utils/respond";
import { ENV } from "../utils/env";

const errorHandler = ({ code, error, status }: any) => {
  // -----------------------------
  // 1) Zod validation errors
  // -----------------------------
  if (code === "VALIDATION") {
    const simple = error.all.map((i: { path: string; message: string }) => ({
      path: i.path,
      message: i.message,
    }));
    return status(400, respond(false, "Validation Failed", null, simple));
  }

  if (error instanceof ZodError) {
    const prettyString = z.prettifyError(error);
    const errorData =
      ENV.ENVIRONMENT === "development"
        ? { raw: error.issues, pretty: prettyString.split("\n") }
        : { message: "Invalid input" };

    return status(400, respond(false, "Validation Failed", null, errorData));
  }

  // -----------------------------
  // 2) Built-in HTTP errors
  // -----------------------------
  if (error instanceof NotFoundError) {
    return status(404, respond(false, error.message || "Route not found"));
  }

  if (error instanceof InternalServerError) {
    return status(
      500,
      respond(false, error.message || "Internal server error")
    );
  }

  // -----------------------------
  // 3) Drizzle / SQLite errors
  // -----------------------------
  if (error instanceof DrizzleQueryError || error instanceof DrizzleError) {
    const cause = (error.cause as { message?: string; code?: number }) || {};
    const sqliteMsg = cause.message || "";

    const isUnique = sqliteMsg.includes("UNIQUE constraint failed");
    const httpStatus = isUnique ? 409 : 500;

    const errorData =
      ENV.ENVIRONMENT === "development"
        ? {
            drizzleName: error.name,
            message: error.message,
            code: cause.code || null,
            detail: sqliteMsg,
          }
        : null;

    const message =
      ENV.ENVIRONMENT === "development"
        ? "Database Error"
        : "Internal Server Error";

    return status(httpStatus, respond(false, message, null, errorData));
  }

  // -----------------------------
  // 4) Fallback / unknown errors
  // -----------------------------
  const fallbackData =
    ENV.ENVIRONMENT === "development"
      ? { message: error?.message, stack: error?.stack }
      : null;

  return status(
    500,
    respond(false, "Internal Server Error", null, fallbackData)
  );
};

export default errorHandler;
