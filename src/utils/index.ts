import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Confirmation utility for user actions
 */
export const confirmAction = (message: string): boolean => {
  return confirm(message);
}

/**
 * Helper to get nested values via dot notation
 */
export const getNested = (obj: any, path: string): any => {
  if (!obj || !path) return undefined;
  if (path.indexOf('.') === -1) return obj[path];
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

/**
 * Format date for display
 */
export const formatDate = (date: string | Date, format: string = 'yyyy-MM-dd'): string => {
  if (!date) return 'Not set';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';
  
  // Simple date formatting - can be enhanced with date-fns if needed
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Format datetime for display
 */
export const formatDateTime = (datetime: string | Date): string => {
  if (!datetime) return 'Not scheduled';
  const d = new Date(datetime);
  if (isNaN(d.getTime())) return 'Invalid datetime';
  
  return d.toISOString().replace('T', ' ').replace('.000Z', '');
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `ID_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
