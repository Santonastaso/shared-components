import { ClassValue } from 'clsx';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Confirmation utility for user actions
 */
declare const confirmAction: (message: string) => boolean;
/**
 * Helper to get nested values via dot notation
 */
declare const getNested: (obj: any, path: string) => any;
/**
 * Format date for display
 */
declare const formatDate: (date: string | Date, format?: string) => string;
/**
 * Format datetime for display
 */
declare const formatDateTime: (datetime: string | Date) => string;
/**
 * Generate unique ID
 */
declare const generateId: () => string;
/**
 * Debounce function
 */
declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
/**
 * Throttle function
 */
declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);

export { cn, confirmAction, debounce, formatDate, formatDateTime, generateId, getNested, throttle };
