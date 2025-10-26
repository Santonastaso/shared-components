/**
 * Shared Application Constants
 * Common constants used across multiple applications
 */
declare const ALERT_TYPES: {
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly WARNING: "warning";
    readonly INFO: "info";
};
declare const CONFIRMATION_TYPES: {
    readonly DANGER: "danger";
    readonly WARNING: "warning";
    readonly INFO: "info";
};
declare const TIME_CONSTANTS: {
    readonly MILLISECONDS_PER_SECOND: 1000;
    readonly SECONDS_PER_MINUTE: 60;
    readonly MINUTES_PER_HOUR: 60;
    readonly HOURS_PER_DAY: 24;
    readonly DAYS_PER_WEEK: 7;
    readonly DAYS_PER_YEAR: 365;
    readonly MILLISECONDS_PER_MINUTE: number;
    readonly MILLISECONDS_PER_HOUR: number;
    readonly MILLISECONDS_PER_DAY: number;
};
declare const VALIDATION_MESSAGES: {
    readonly REQUIRED: "This field is required";
    readonly INVALID_EMAIL: "Please enter a valid email address";
    readonly INVALID_DATE: "Please enter a valid date";
    readonly END_DATE_BEFORE_START: "End date cannot be before start date";
    readonly END_TIME_BEFORE_START: "End time must be after start time when dates are the same";
    readonly QUANTITY_COMPLETED_EXCEEDS_TOTAL: "Quantity completed cannot exceed total quantity";
};
declare const FIELD_CONFIGS: {
    readonly DECIMAL_PRECISION: {
        readonly ONE_DECIMAL: readonly ["setup_time", "changeover_time"];
        readonly TWO_DECIMAL: readonly ["cost", "price"];
        readonly PLAIN_NUMBER: readonly ["speed", "quantity"];
    };
    readonly FIELD_STEPS: {
        readonly TIME: 0.1;
        readonly COST: 0.01;
        readonly QUANTITY: 1;
        readonly DIMENSION: 1;
    };
};
declare const ERROR_TYPES: {
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly SERVER_ERROR: "SERVER_ERROR";
    readonly AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR";
    readonly AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR";
    readonly NOT_FOUND_ERROR: "NOT_FOUND_ERROR";
    readonly BUSINESS_LOGIC_ERROR: "BUSINESS_LOGIC_ERROR";
    readonly UI_ERROR: "UI_ERROR";
    readonly API_ERROR: "API_ERROR";
    readonly TIMEOUT_ERROR: "TIMEOUT_ERROR";
    readonly PERMISSION_ERROR: "PERMISSION_ERROR";
    readonly DUPLICATE_ERROR: "DUPLICATE_ERROR";
};
declare const COMMON_STATUSES: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly IN_PROGRESS: "IN_PROGRESS";
};
declare const DATA_TABLE_DEFAULTS: {
    readonly PAGE_SIZE: 10;
    readonly PAGE_SIZE_OPTIONS: readonly [10, 25, 50, 100];
    readonly MAX_VISIBLE_PAGES: 5;
};
declare const DEPARTMENT_TYPES: {
    readonly PRINTING: "STAMPA";
    readonly PACKAGING: "CONFEZIONAMENTO";
};
declare const WORK_CENTERS: {
    readonly ZANICA: "ZANICA";
    readonly BUSTO_GAROLFO: "BUSTO_GAROLFO";
    readonly BOTH: "BOTH";
};
declare const MACHINE_STATUSES: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
declare const PRODUCT_TYPES: {
    readonly CREMA: "CREMA";
    readonly LIQUIDO: "LIQUIDO";
    readonly POLVERI: "POLVERI";
};
declare const SHIFT_TYPES: {
    readonly T1: "T1";
    readonly T2: "T2";
    readonly T3: "T3";
};
declare const SEAL_SIDES: {
    readonly THREE: 3;
    readonly FOUR: 4;
};
declare const TASK_STATUSES: {
    readonly NOT_SCHEDULED: "NOT SCHEDULED";
    readonly SCHEDULED: "SCHEDULED";
    readonly IN_PROGRESS: "IN PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];
type ConfirmationType = typeof CONFIRMATION_TYPES[keyof typeof CONFIRMATION_TYPES];
type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
type CommonStatus = typeof COMMON_STATUSES[keyof typeof COMMON_STATUSES];
type DepartmentType = typeof DEPARTMENT_TYPES[keyof typeof DEPARTMENT_TYPES];
type WorkCenter = typeof WORK_CENTERS[keyof typeof WORK_CENTERS];
type MachineStatus = typeof MACHINE_STATUSES[keyof typeof MACHINE_STATUSES];
type ProductType = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];
type ShiftType = typeof SHIFT_TYPES[keyof typeof SHIFT_TYPES];
type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];

export { ALERT_TYPES, type AlertType, COMMON_STATUSES, CONFIRMATION_TYPES, type CommonStatus, type ConfirmationType, DATA_TABLE_DEFAULTS, DEPARTMENT_TYPES, type DepartmentType, ERROR_TYPES, type ErrorType, FIELD_CONFIGS, MACHINE_STATUSES, type MachineStatus, PRODUCT_TYPES, type ProductType, SEAL_SIDES, SHIFT_TYPES, type ShiftType, TASK_STATUSES, TIME_CONSTANTS, type TaskStatus, VALIDATION_MESSAGES, WORK_CENTERS, type WorkCenter };
