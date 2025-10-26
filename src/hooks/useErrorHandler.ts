import { useState, useCallback, useRef } from 'react';
// Note: These would normally be imported from @santonastaso/shared-utils
// For now using placeholder functions
const showError = (message: string) => console.error(message);
const showWarning = (message: string) => console.warn(message);
const showInfo = (message: string) => console.info(message);
const showSuccess = (message: string) => console.log(message);
import { ERROR_TYPES, type ErrorType } from '../constants';

interface ErrorHandlerOptions {
  logErrors?: boolean;
  showUserMessages?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: any, context: string) => void;
  onRetry?: (error: any, attempt: number, delay: number) => void;
  onFallback?: (error: any) => void;
}

interface AsyncErrorOptions extends ErrorHandlerOptions {
  context?: string;
  fallbackMessage?: string;
  retry?: boolean;
}

/**
 * Unified Error Handling Hook
 * Provides comprehensive error handling capabilities for React components
 */
export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    logErrors = true,
    showUserMessages = true,
    maxRetries = 3,
    retryDelay = 1000,
    onError = null,
    onRetry = null,
    onFallback = null
  } = options;

  const [errors, setErrors] = useState<any[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryCountRef = useRef(0);

  /**
   * Handle error with comprehensive error management
   */
  const handleError = useCallback(async (error: any, context = '', customOptions: any = {}) => {
    // Create normalized error object
    const normalizedError = {
      id: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message || 'An unexpected error occurred',
      type: error.type || ERROR_TYPES.SERVER_ERROR,
      severity: error.severity || 'medium',
      context,
      timestamp: new Date().toISOString(),
      userMessage: error.userMessage || error.message || 'An unexpected error occurred'
    };

    // Add to errors state
    setErrors(prev => [...prev, normalizedError]);

    // Log error if enabled
    if (logErrors) {
      console.error(`[${context}] Error:`, error);
    }

    // Show user message if enabled
    if (showUserMessages) {
      const message = normalizedError.userMessage;
      
      switch (normalizedError.severity) {
        case 'low':
          showWarning(message);
          break;
        case 'medium':
          showError(message);
          break;
        case 'high':
        case 'critical':
          showError(message);
          break;
        default:
          showError(message);
      }
    }

    // Call custom error handler if provided
    if (onError) {
      await onError(normalizedError, context);
    }

    return normalizedError;
  }, [logErrors, showUserMessages, onError]);

  /**
   * Handle async operations with automatic retry
   */
  const handleAsync = useCallback(async (
    asyncOperation: () => Promise<any>, 
    options: AsyncErrorOptions = {}
  ) => {
    const {
      context = '',
      fallbackMessage = 'Operation failed',
      retry = false,
      maxRetries: customMaxRetries = maxRetries
    } = options;

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

  /**
   * Retry operation with exponential backoff
   */
  const retryOperation = useCallback(async (
    operation: () => Promise<any>,
    maxAttempts: number
  ) => {
    let lastError: any;
    
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
          const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
          
          if (onRetry) {
            await onRetry(error, attempt, delay);
          }
          
          if (showUserMessages) {
            showInfo(`Retrying... (${attempt}/${maxAttempts})`);
          }
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    setIsRetrying(false);
    retryCountRef.current = 0;
    throw lastError;
  }, [retryDelay, onRetry, showUserMessages]);

  /**
   * Handle specific error types
   */
  const handleValidationError = useCallback((message: string, details: any = {}) => {
    const error = {
      message,
      type: ERROR_TYPES.VALIDATION_ERROR,
      severity: 'medium',
      details,
      userMessage: message
    };
    return handleError(error, 'validation');
  }, [handleError]);

  const handleNetworkError = useCallback((message = 'Network connection failed') => {
    const error = {
      message,
      type: ERROR_TYPES.NETWORK_ERROR,
      severity: 'high',
      userMessage: message
    };
    return handleError(error, 'network');
  }, [handleError]);

  const handleAuthError = useCallback((message = 'Authentication failed') => {
    const error = {
      message,
      type: ERROR_TYPES.AUTHENTICATION_ERROR,
      severity: 'high',
      userMessage: message
    };
    return handleError(error, 'authentication');
  }, [handleError]);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  /**
   * Clear specific error by ID
   */
  const clearError = useCallback((errorId: string) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  /**
   * Get errors by type
   */
  const getErrorsByType = useCallback((type: ErrorType) => {
    return errors.filter(error => error.type === type);
  }, [errors]);

  /**
   * Check if there are any critical errors
   */
  const hasCriticalErrors = useCallback(() => {
    return errors.some(error => error.severity === 'critical');
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

/**
 * Hook for handling form validation errors
 */
export const useValidationErrorHandler = () => {
  const { handleValidationError, clearErrors } = useErrorHandler({
    showUserMessages: false // Don't show toast for validation errors
  });

  const handleFieldError = useCallback((field: string, message: string) => {
    return handleValidationError(`Field '${field}': ${message}`, { field });
  }, [handleValidationError]);

  const handleRequiredFieldError = useCallback((field: string) => {
    return handleValidationError(`Field '${field}' is required`, { field, type: 'required' });
  }, [handleValidationError]);

  return {
    handleFieldError,
    handleRequiredFieldError,
    clearErrors
  };
};
