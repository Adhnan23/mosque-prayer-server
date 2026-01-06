import {
  InternalServerError,
  NotFoundError,
  ValidationError,
  type ErrorHandler,
} from "elysia";
import { ENV, respond } from "@utils";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm";

const errorHandler: ErrorHandler = ({ code, error, status, request }) => {
  if (code === "VALIDATION" && error instanceof ValidationError) {
    const simpleErrors = error.all.map((err) => {
      const path = "path" in err && err.path ? err.path : "(unknown)";
      const message =
        "message" in err ? err.message : err.summary ?? "Invalid input";
      return `${path}: ${message}`;
    });

    if (ENV.ENVIRONMENT === "development") {
      console.log("[ValidationError]", error);
    }

    return status(
      "Unprocessable Content",
      respond(false, "Validation Failed", null, simpleErrors)
    );
  } else if (code === "NOT_FOUND" && error instanceof NotFoundError) {
    const url = request?.url ? new URL(request.url).pathname : "(unknown)";
    if (ENV.ENVIRONMENT === "development") {
      console.log("[NotFoundError]", url);
    }
    return status("Not Found", respond(false, `${url} is not found`));
  } else if (
    code === "INTERNAL_SERVER_ERROR" &&
    error instanceof InternalServerError
  ) {
    if (ENV.ENVIRONMENT === "development") {
      console.log("[InternalServerError]", error);
    }
    return status(
      "Internal Server Error",
      respond(false, error.message || "Internal Server Error")
    );
  } else if (
    error instanceof DrizzleQueryError ||
    error instanceof DrizzleError
  ) {
    const cause = (error.cause as { message?: string; code?: number }) || {};
    const sqliteMsg = cause.message || "";
    const isUnique = sqliteMsg.includes("UNIQUE constraint failed");

    if (ENV.ENVIRONMENT === "development") {
      console.log("[DrizzleError]", {
        name: error.name,
        message: error.message,
        code: cause.code,
        detail: sqliteMsg,
      });
    }

    const errorData =
      ENV.ENVIRONMENT === "development"
        ? {
            drizzleName: error.name,
            message: error.message,
            code: cause.code ?? null,
            detail: sqliteMsg,
          }
        : null;

    const message =
      ENV.ENVIRONMENT === "development"
        ? "Database Error"
        : "Internal Server Error";

    return status(
      isUnique ? "Conflict" : "Internal Server Error",
      respond(false, message, null, errorData)
    );
  } else if (code === "UNKNOWN" || error instanceof Error) {
    if (ENV.ENVIRONMENT === "development") {
      console.log("[UnknownError]", error);
    }

    const fallbackData =
      ENV.ENVIRONMENT === "development"
        ? { message: (error as any)?.message, stack: (error as any)?.stack }
        : null;

    return status(
      "Internal Server Error",
      respond(false, "Internal Server Error", null, fallbackData)
    );
  }
};

export default errorHandler;
