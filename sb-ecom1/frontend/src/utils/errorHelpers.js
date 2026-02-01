export function normalizeError(error) {
  if (!error) {
    return { message: "Something went wrong.", suggestion: "Please try again." };
  }

  if (typeof error === "string") {
    return { message: error, suggestion: "Please try again." };
  }

  const message = error.message || "Request failed";
  const suggestion =
    error.suggestion ||
    deriveSuggestion(error.status, error.details) ||
    "Please try again.";

  return { message, suggestion };
}

function deriveSuggestion(status, details) {
  if (status === 400) {
    if (details && typeof details === "object") {
      const fields = Object.keys(details);
      if (fields.length > 0) {
        return `Check these fields: ${fields.join(", ")}.`;
      }
    }
    return "Please check your input and try again.";
  }

  if (status === 401) {
    return "Please login to continue.";
  }

  if (status === 403) {
    return "Your account does not have access to this action.";
  }

  if (status === 404) {
    return "The requested resource was not found.";
  }

  if (status >= 500) {
    return "Server error. Please try again later.";
  }

  return "Please try again.";
}
