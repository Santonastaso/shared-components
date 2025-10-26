"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  useErrorHandler: () => useErrorHandler,
  useSidebar: () => useSidebar,
  useValidationErrorHandler: () => useValidationErrorHandler
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/useErrorHandler.ts
var import_react = require("react");

// src/constants/index.ts
var TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1e3,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  DAYS_PER_YEAR: 365,
  MILLISECONDS_PER_MINUTE: 60 * 1e3,
  MILLISECONDS_PER_HOUR: 60 * 60 * 1e3,
  MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1e3
};
var ERROR_TYPES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  BUSINESS_LOGIC_ERROR: "BUSINESS_LOGIC_ERROR",
  UI_ERROR: "UI_ERROR",
  API_ERROR: "API_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  PERMISSION_ERROR: "PERMISSION_ERROR",
  DUPLICATE_ERROR: "DUPLICATE_ERROR"
};

// src/hooks/useErrorHandler.ts
var showError = (message) => console.error(message);
var showWarning = (message) => console.warn(message);
var showInfo = (message) => console.info(message);
var useErrorHandler = (options = {}) => {
  const {
    logErrors = true,
    showUserMessages = true,
    maxRetries = 3,
    retryDelay = 1e3,
    onError = null,
    onRetry = null,
    onFallback = null
  } = options;
  const [errors, setErrors] = (0, import_react.useState)([]);
  const [isRetrying, setIsRetrying] = (0, import_react.useState)(false);
  const retryCountRef = (0, import_react.useRef)(0);
  const handleError = (0, import_react.useCallback)(async (error, context = "", customOptions = {}) => {
    const normalizedError = {
      id: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message || "An unexpected error occurred",
      type: error.type || ERROR_TYPES.SERVER_ERROR,
      severity: error.severity || "medium",
      context,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userMessage: error.userMessage || error.message || "An unexpected error occurred"
    };
    setErrors((prev) => [...prev, normalizedError]);
    if (logErrors) {
      console.error(`[${context}] Error:`, error);
    }
    if (showUserMessages) {
      const message = normalizedError.userMessage;
      switch (normalizedError.severity) {
        case "low":
          showWarning(message);
          break;
        case "medium":
          showError(message);
          break;
        case "high":
        case "critical":
          showError(message);
          break;
        default:
          showError(message);
      }
    }
    if (onError) {
      await onError(normalizedError, context);
    }
    return normalizedError;
  }, [logErrors, showUserMessages, onError]);
  const handleAsync = (0, import_react.useCallback)(async (asyncOperation, options2 = {}) => {
    const {
      context = "",
      fallbackMessage = "Operation failed",
      retry = false,
      maxRetries: customMaxRetries = maxRetries
    } = options2;
    try {
      if (retry) {
        return await retryOperation(asyncOperation, customMaxRetries);
      }
      return await asyncOperation();
    } catch (error) {
      const handledError = await handleError(error, context, { fallbackMessage });
      throw handledError;
    }
  }, [maxRetries, handleError]);
  const retryOperation = (0, import_react.useCallback)(async (operation, maxAttempts) => {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setIsRetrying(attempt > 1);
        retryCountRef.current = attempt - 1;
        const result = await operation();
        setIsRetrying(false);
        retryCountRef.current = 0;
        return result;
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          const delay = retryDelay * Math.pow(2, attempt - 1);
          if (onRetry) {
            await onRetry(error, attempt, delay);
          }
          if (showUserMessages) {
            showInfo(`Retrying... (${attempt}/${maxAttempts})`);
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    setIsRetrying(false);
    retryCountRef.current = 0;
    throw lastError;
  }, [retryDelay, onRetry, showUserMessages]);
  const handleValidationError = (0, import_react.useCallback)((message, details = {}) => {
    const error = {
      message,
      type: ERROR_TYPES.VALIDATION_ERROR,
      severity: "medium",
      details,
      userMessage: message
    };
    return handleError(error, "validation");
  }, [handleError]);
  const handleNetworkError = (0, import_react.useCallback)((message = "Network connection failed") => {
    const error = {
      message,
      type: ERROR_TYPES.NETWORK_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "network");
  }, [handleError]);
  const handleAuthError = (0, import_react.useCallback)((message = "Authentication failed") => {
    const error = {
      message,
      type: ERROR_TYPES.AUTHENTICATION_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "authentication");
  }, [handleError]);
  const clearErrors = (0, import_react.useCallback)(() => {
    setErrors([]);
  }, []);
  const clearError = (0, import_react.useCallback)((errorId) => {
    setErrors((prev) => prev.filter((error) => error.id !== errorId));
  }, []);
  const getErrorsByType = (0, import_react.useCallback)((type) => {
    return errors.filter((error) => error.type === type);
  }, [errors]);
  const hasCriticalErrors = (0, import_react.useCallback)(() => {
    return errors.some((error) => error.severity === "critical");
  }, [errors]);
  return {
    // Error handling functions
    handleError,
    handleAsync,
    handleValidationError,
    handleNetworkError,
    handleAuthError,
    // Error management
    clearErrors,
    clearError,
    getErrorsByType,
    hasCriticalErrors,
    // State
    errors,
    isRetrying,
    retryCount: retryCountRef.current,
    // Utilities
    retryOperation
  };
};
var useValidationErrorHandler = () => {
  const { handleValidationError, clearErrors } = useErrorHandler({
    showUserMessages: false
    // Don't show toast for validation errors
  });
  const handleFieldError = (0, import_react.useCallback)((field, message) => {
    return handleValidationError(`Field '${field}': ${message}`, { field });
  }, [handleValidationError]);
  const handleRequiredFieldError = (0, import_react.useCallback)((field) => {
    return handleValidationError(`Field '${field}' is required`, { field, type: "required" });
  }, [handleValidationError]);
  return {
    handleFieldError,
    handleRequiredFieldError,
    clearErrors
  };
};

// src/hooks/useSidebar.ts
var import_zustand = require("zustand");
var useSidebar = (0, import_zustand.create)((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useErrorHandler,
  useSidebar,
  useValidationErrorHandler
});
//# sourceMappingURL=hooks.cjs.map