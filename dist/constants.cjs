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

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  ALERT_TYPES: () => ALERT_TYPES,
  COMMON_STATUSES: () => COMMON_STATUSES,
  CONFIRMATION_TYPES: () => CONFIRMATION_TYPES,
  DATA_TABLE_DEFAULTS: () => DATA_TABLE_DEFAULTS,
  DEPARTMENT_TYPES: () => DEPARTMENT_TYPES,
  ERROR_TYPES: () => ERROR_TYPES,
  FIELD_CONFIGS: () => FIELD_CONFIGS,
  MACHINE_STATUSES: () => MACHINE_STATUSES,
  PRODUCT_TYPES: () => PRODUCT_TYPES,
  SEAL_SIDES: () => SEAL_SIDES,
  SHIFT_TYPES: () => SHIFT_TYPES,
  TASK_STATUSES: () => TASK_STATUSES,
  TIME_CONSTANTS: () => TIME_CONSTANTS,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES,
  WORK_CENTERS: () => WORK_CENTERS
});
module.exports = __toCommonJS(constants_exports);
var ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info"
};
var CONFIRMATION_TYPES = {
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info"
};
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
var VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_DATE: "Please enter a valid date",
  END_DATE_BEFORE_START: "End date cannot be before start date",
  END_TIME_BEFORE_START: "End time must be after start time when dates are the same",
  QUANTITY_COMPLETED_EXCEEDS_TOTAL: "Quantity completed cannot exceed total quantity"
};
var FIELD_CONFIGS = {
  // Decimal precision for different field types
  DECIMAL_PRECISION: {
    ONE_DECIMAL: ["setup_time", "changeover_time"],
    TWO_DECIMAL: ["cost", "price"],
    PLAIN_NUMBER: ["speed", "quantity"]
  },
  // Field step values
  FIELD_STEPS: {
    TIME: 0.1,
    COST: 0.01,
    QUANTITY: 1,
    DIMENSION: 1
  }
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
var COMMON_STATUSES = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  IN_PROGRESS: "IN_PROGRESS"
};
var DATA_TABLE_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5
};
var DEPARTMENT_TYPES = {
  PRINTING: "STAMPA",
  PACKAGING: "CONFEZIONAMENTO"
};
var WORK_CENTERS = {
  ZANICA: "ZANICA",
  BUSTO_GAROLFO: "BUSTO_GAROLFO",
  BOTH: "BOTH"
};
var MACHINE_STATUSES = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};
var PRODUCT_TYPES = {
  CREMA: "CREMA",
  LIQUIDO: "LIQUIDO",
  POLVERI: "POLVERI"
};
var SHIFT_TYPES = {
  T1: "T1",
  T2: "T2",
  T3: "T3"
};
var SEAL_SIDES = {
  THREE: 3,
  FOUR: 4
};
var TASK_STATUSES = {
  NOT_SCHEDULED: "NOT SCHEDULED",
  SCHEDULED: "SCHEDULED",
  IN_PROGRESS: "IN PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALERT_TYPES,
  COMMON_STATUSES,
  CONFIRMATION_TYPES,
  DATA_TABLE_DEFAULTS,
  DEPARTMENT_TYPES,
  ERROR_TYPES,
  FIELD_CONFIGS,
  MACHINE_STATUSES,
  PRODUCT_TYPES,
  SEAL_SIDES,
  SHIFT_TYPES,
  TASK_STATUSES,
  TIME_CONSTANTS,
  VALIDATION_MESSAGES,
  WORK_CENTERS
});
//# sourceMappingURL=constants.cjs.map