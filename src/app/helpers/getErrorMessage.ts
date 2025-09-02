import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) return "Something went wrong.";

  // FetchBaseQueryError
  if ("status" in error) {
    if (typeof error.data === "string") return error.data;
    if (
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
    ) {
      return String(error.data.message);
    }
    return `Request failed with status ${error.status}`;
  }

  // SerializedError
  if ("message" in error && error.message) {
    return error.message;
  }

  return "Something went wrong.";
}
