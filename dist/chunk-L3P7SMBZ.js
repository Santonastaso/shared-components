import {
  ERROR_TYPES
} from "./chunk-ICS7PABN.js";

// src/hooks/useErrorHandler.ts
import { useState, useCallback, useRef } from "react";
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
  const [errors, setErrors] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryCountRef = useRef(0);
  const handleError = useCallback(async (error, context = "", customOptions = {}) => {
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
  const handleAsync = useCallback(async (asyncOperation, options2 = {}) => {
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
  const retryOperation = useCallback(async (operation, maxAttempts) => {
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
  const handleValidationError = useCallback((message, details = {}) => {
    const error = {
      message,
      type: ERROR_TYPES.VALIDATION_ERROR,
      severity: "medium",
      details,
      userMessage: message
    };
    return handleError(error, "validation");
  }, [handleError]);
  const handleNetworkError = useCallback((message = "Network connection failed") => {
    const error = {
      message,
      type: ERROR_TYPES.NETWORK_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "network");
  }, [handleError]);
  const handleAuthError = useCallback((message = "Authentication failed") => {
    const error = {
      message,
      type: ERROR_TYPES.AUTHENTICATION_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "authentication");
  }, [handleError]);
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);
  const clearError = useCallback((errorId) => {
    setErrors((prev) => prev.filter((error) => error.id !== errorId));
  }, []);
  const getErrorsByType = useCallback((type) => {
    return errors.filter((error) => error.type === type);
  }, [errors]);
  const hasCriticalErrors = useCallback(() => {
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
  const handleFieldError = useCallback((field, message) => {
    return handleValidationError(`Field '${field}': ${message}`, { field });
  }, [handleValidationError]);
  const handleRequiredFieldError = useCallback((field) => {
    return handleValidationError(`Field '${field}' is required`, { field, type: "required" });
  }, [handleValidationError]);
  return {
    handleFieldError,
    handleRequiredFieldError,
    clearErrors
  };
};

// src/hooks/useSidebar.ts
import { create } from "zustand";
var useSidebar = create((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export {
  useErrorHandler,
  useValidationErrorHandler,
  useSidebar
};
//# sourceMappingURL=chunk-L3P7SMBZ.js.map