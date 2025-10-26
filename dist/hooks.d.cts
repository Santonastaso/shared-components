import { ErrorType } from './constants.cjs';

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
declare const useErrorHandler: (options?: ErrorHandlerOptions) => {
    handleError: (error: any, context?: string, customOptions?: any) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    handleAsync: (asyncOperation: () => Promise<any>, options?: AsyncErrorOptions) => Promise<any>;
    handleValidationError: (message: string, details?: any) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    handleNetworkError: (message?: string) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    handleAuthError: (message?: string) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    clearErrors: () => void;
    clearError: (errorId: string) => void;
    getErrorsByType: (type: ErrorType) => any[];
    hasCriticalErrors: () => boolean;
    errors: any[];
    isRetrying: boolean;
    retryCount: number;
    retryOperation: (operation: () => Promise<any>, maxAttempts: number) => Promise<any>;
};
/**
 * Hook for handling form validation errors
 */
declare const useValidationErrorHandler: () => {
    handleFieldError: (field: string, message: string) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    handleRequiredFieldError: (field: string) => Promise<{
        id: string;
        message: any;
        type: any;
        severity: any;
        context: string;
        timestamp: string;
        userMessage: any;
    }>;
    clearErrors: () => void;
};

declare const useSidebar: any;

export { useErrorHandler, useSidebar, useValidationErrorHandler };
