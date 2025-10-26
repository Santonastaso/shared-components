/**
 * Shared Application Constants
 * Common constants used across multiple applications
 */

// ===== ALERT TYPES =====
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

// ===== CONFIRMATION DIALOG TYPES =====
export const CONFIRMATION_TYPES = {
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info'
} as const;

// ===== TIME CONSTANTS =====
export const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  DAYS_PER_YEAR: 365,
  MILLISECONDS_PER_MINUTE: 60 * 1000,
  MILLISECONDS_PER_HOUR: 60 * 60 * 1000,
  MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1000
} as const;

// ===== COMMON VALIDATION MESSAGES =====
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_DATE: 'Please enter a valid date',
  END_DATE_BEFORE_START: 'End date cannot be before start date',
  END_TIME_BEFORE_START: 'End time must be after start time when dates are the same',
  QUANTITY_COMPLETED_EXCEEDS_TOTAL: 'Quantity completed cannot exceed total quantity'
} as const;

// ===== COMMON FIELD CONFIGURATIONS =====
export const FIELD_CONFIGS = {
  // Decimal precision for different field types
  DECIMAL_PRECISION: {
    ONE_DECIMAL: ['setup_time', 'changeover_time'],
    TWO_DECIMAL: ['cost', 'price'],
    PLAIN_NUMBER: ['speed', 'quantity']
  },
  
  // Field step values
  FIELD_STEPS: {
    TIME: 0.1,
    COST: 0.01,
    QUANTITY: 1,
    DIMENSION: 1
  }
} as const;

// ===== ERROR TYPES =====
export const ERROR_TYPES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  BUSINESS_LOGIC_ERROR: 'BUSINESS_LOGIC_ERROR',
  UI_ERROR: 'UI_ERROR',
  API_ERROR: 'API_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  DUPLICATE_ERROR: 'DUPLICATE_ERROR'
} as const;

// ===== COMMON STATUSES =====
export const COMMON_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS'
} as const;

// ===== DATA TABLE DEFAULTS =====
export const DATA_TABLE_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5
} as const;

// ===== DEPARTMENT TYPES =====
export const DEPARTMENT_TYPES = {
  PRINTING: 'STAMPA',
  PACKAGING: 'CONFEZIONAMENTO'
} as const;

// ===== WORK CENTERS =====
export const WORK_CENTERS = {
  ZANICA: 'ZANICA',
  BUSTO_GAROLFO: 'BUSTO_GAROLFO',
  BOTH: 'BOTH'
} as const;

// ===== MACHINE STATUSES =====
export const MACHINE_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;

// ===== PRODUCT TYPES =====
export const PRODUCT_TYPES = {
  CREMA: 'CREMA',
  LIQUIDO: 'LIQUIDO',
  POLVERI: 'POLVERI'
} as const;

// ===== SHIFT TYPES =====
export const SHIFT_TYPES = {
  T1: 'T1',
  T2: 'T2',
  T3: 'T3'
} as const;

// ===== SEAL SIDES =====
export const SEAL_SIDES = {
  THREE: 3,
  FOUR: 4
} as const;

// ===== TASK STATUSES =====
export const TASK_STATUSES = {
  NOT_SCHEDULED: 'NOT SCHEDULED',
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];
export type ConfirmationType = typeof CONFIRMATION_TYPES[keyof typeof CONFIRMATION_TYPES];
export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
export type CommonStatus = typeof COMMON_STATUSES[keyof typeof COMMON_STATUSES];
export type DepartmentType = typeof DEPARTMENT_TYPES[keyof typeof DEPARTMENT_TYPES];
export type WorkCenter = typeof WORK_CENTERS[keyof typeof WORK_CENTERS];
export type MachineStatus = typeof MACHINE_STATUSES[keyof typeof MACHINE_STATUSES];
export type ProductType = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];
export type ShiftType = typeof SHIFT_TYPES[keyof typeof SHIFT_TYPES];
export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
