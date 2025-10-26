"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ALERT_TYPES: () => ALERT_TYPES,
  COMMON_STATUSES: () => COMMON_STATUSES,
  CONFIRMATION_TYPES: () => CONFIRMATION_TYPES,
  DATA_TABLE_DEFAULTS: () => DATA_TABLE_DEFAULTS,
  DEPARTMENT_TYPES: () => DEPARTMENT_TYPES,
  DataTable: () => DataTable,
  ERROR_TYPES: () => ERROR_TYPES,
  ErrorBoundary: () => ErrorBoundary,
  FIELD_CONFIGS: () => FIELD_CONFIGS,
  MACHINE_STATUSES: () => MACHINE_STATUSES,
  PRODUCT_TYPES: () => PRODUCT_TYPES,
  SEAL_SIDES: () => SEAL_SIDES,
  SHIFT_TYPES: () => SHIFT_TYPES,
  TASK_STATUSES: () => TASK_STATUSES,
  TIME_CONSTANTS: () => TIME_CONSTANTS,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES,
  WORK_CENTERS: () => WORK_CENTERS,
  cn: () => cn,
  confirmAction: () => confirmAction,
  debounce: () => debounce,
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  generateId: () => generateId,
  getNested: () => getNested,
  throttle: () => throttle,
  useErrorBoundary: () => useErrorBoundary,
  useErrorHandler: () => useErrorHandler,
  useValidationErrorHandler: () => useValidationErrorHandler,
  withErrorBoundary: () => withErrorBoundary
});
module.exports = __toCommonJS(src_exports);

// src/components/ErrorBoundary.tsx
var import_react = __toESM(require("react"), 1);

// src/utils/index.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
var confirmAction = (message) => {
  return confirm(message);
};
var getNested = (obj, path) => {
  if (!obj || !path) return void 0;
  if (path.indexOf(".") === -1) return obj[path];
  return path.split(".").reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0, obj);
};
var formatDate = (date, format = "yyyy-MM-dd") => {
  if (!date) return "Not set";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
var formatDateTime = (datetime) => {
  if (!datetime) return "Not scheduled";
  const d = new Date(datetime);
  if (isNaN(d.getTime())) return "Invalid datetime";
  return d.toISOString().replace("T", " ").replace(".000Z", "");
};
var generateId = () => {
  return `ID_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
var debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
var throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// src/components/ErrorBoundary.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.handleRetry = () => {
      const maxRetries = this.props.maxRetries || 3;
      if (this.state.retryCount < maxRetries) {
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          errorId: null,
          retryCount: this.state.retryCount + 1
        });
      }
    };
    this.handleReset = () => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        retryCount: 0
      });
    };
    this.handleReportIssue = () => {
      const subject = encodeURIComponent(`App Error Report - ${this.state.errorId}`);
      const body = encodeURIComponent(`
Error Report Details:
- Error ID: ${this.state.errorId}
- Error: ${this.state.error?.message || "Unknown error"}
- URL: ${window.location.href}
- User Agent: ${navigator.userAgent}
- Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}

Please describe what you were doing when this error occurred:
    `);
      window.open(`mailto:support@company.com?subject=${subject}&body=${body}`);
    };
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: generateId()
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
      errorId: this.state.errorId || generateId()
    });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo, {
          retry: this.handleRetry,
          reset: this.handleReset,
          retryCount: this.state.retryCount,
          maxRetries: this.props.maxRetries || 3
        });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-md w-full bg-card shadow-lg rounded-lg p-6 border", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 text-destructive text-2xl", children: "\u{1F6A8}" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-medium text-foreground", children: "Something went wrong" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground", children: "We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue." }),
          this.state.errorId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "Error ID: ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "bg-muted px-1 rounded", children: this.state.errorId })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex space-x-3 mb-4", children: [
          this.state.retryCount < (this.props.maxRetries || 3) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              onClick: this.handleRetry,
              className: "flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                "Try Again (",
                this.state.retryCount + 1,
                "/",
                (this.props.maxRetries || 3) + 1,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: this.handleReset,
              className: "flex-1 bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: this.handleReportIssue,
            className: "w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300",
            children: "\u{1F4E7} Report Issue"
          }
        ),
        process.env.NODE_ENV === "development" && this.state.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { className: "text-sm text-muted-foreground cursor-pointer hover:text-foreground", children: "Technical Details (Development)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-2 p-3 bg-muted rounded text-xs font-mono text-foreground overflow-auto max-h-40", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Error:" }),
              " ",
              this.state.error.message
            ] }),
            this.state.errorInfo?.componentStack && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Component Stack:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "whitespace-pre-wrap text-xs", children: this.state.errorInfo.componentStack })
            ] }),
            this.state.error.stack && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stack Trace:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "whitespace-pre-wrap text-xs", children: this.state.error.stack })
            ] })
          ] })
        ] })
      ] }) });
    }
    return this.props.children;
  }
};
var withErrorBoundary = (WrappedComponent, options = {}) => {
  return function WithErrorBoundaryComponent(props) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { ...options, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, { ...props }) });
  };
};
var useErrorBoundary = () => {
  const [error, setError] = import_react.default.useState(null);
  const resetError = import_react.default.useCallback(() => {
    setError(null);
  }, []);
  const captureError = import_react.default.useCallback((error2) => {
    setError(error2);
  }, []);
  import_react.default.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  return { captureError, resetError };
};

// src/components/DataTable.tsx
var import_react2 = require("react");
var import_react_table = require("@tanstack/react-table");

// src/constants/index.ts
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

// src/components/DataTable.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Table = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("table", { className: `w-full border-collapse border border-gray-200 ${className || ""}`, ...props, children });
var TableHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { className: "bg-gray-50", children });
var TableBody = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { className: "divide-y divide-gray-200", children });
var TableRow = ({ children, onClick, className }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "tr",
  {
    onClick,
    className: `${onClick ? "cursor-pointer hover:bg-gray-50" : ""} ${className || ""}`,
    children
  }
);
var TableHead = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200", children });
var TableCell = ({ children, colSpan, className }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "td",
  {
    colSpan,
    className: `px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200 ${className || ""}`,
    children
  }
);
var Button = ({ children, variant = "default", size = "default", onClick, disabled, className }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary"
  };
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      onClick,
      disabled,
      className: `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className || ""}`,
      children
    }
  );
};
function DataTable({
  data,
  columns: userColumns,
  onEditRow,
  onDeleteRow,
  onRowClick,
  enableFiltering = false,
  filterableColumns = [],
  stickyColumns = [],
  onBulkDelete,
  onBulkExport,
  initialPageSize = DATA_TABLE_DEFAULTS.PAGE_SIZE,
  pageSizeOptions = [...DATA_TABLE_DEFAULTS.PAGE_SIZE_OPTIONS],
  enableGlobalSearch = true,
  enableColumnVisibility = false,
  enableRowSelection = false
}) {
  const [filters, setFilters] = (0, import_react2.useState)({});
  const [page, setPage] = (0, import_react2.useState)(0);
  const [pageSize, setPageSize] = (0, import_react2.useState)(initialPageSize);
  const [selectedIds, setSelectedIds] = (0, import_react2.useState)(/* @__PURE__ */ new Set());
  const [globalQuery, setGlobalQuery] = (0, import_react2.useState)("");
  const [sorting, setSorting] = (0, import_react2.useState)([]);
  const columns = (0, import_react2.useMemo)(() => {
    const selectionColumn = enableRowSelection ? {
      id: "select",
      header: ({ table: table2 }) => {
        const currentPageRows = table2.getRowModel().rows.map((row) => row.original);
        const allSelected = currentPageRows.length > 0 && currentPageRows.every((r) => selectedIds.has(r.id));
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            type: "checkbox",
            "aria-label": "Select all",
            checked: allSelected,
            onChange: (e) => {
              const newSet = new Set(selectedIds);
              if (e.target.checked) {
                currentPageRows.forEach((r) => newSet.add(r.id));
              } else {
                currentPageRows.forEach((r) => newSet.delete(r.id));
              }
              setSelectedIds(newSet);
            },
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }
        ) });
      },
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex w-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "checkbox",
          "aria-label": "Select row",
          checked: selectedIds.has(row.original.id),
          onChange: (e) => {
            const newSet = new Set(selectedIds);
            if (e.target.checked) {
              newSet.add(row.original.id);
            } else {
              newSet.delete(row.original.id);
            }
            setSelectedIds(newSet);
          },
          className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        }
      ) })
    } : null;
    const actionColumn = onEditRow || onDeleteRow ? {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-2", children: [
        onEditRow && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => onEditRow(row.original),
            children: "Edit"
          }
        ),
        onDeleteRow && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => {
              if (confirmAction("Are you sure you want to delete this item?")) {
                onDeleteRow(row.original);
              }
            },
            children: "Delete"
          }
        )
      ] })
    } : null;
    return [selectionColumn, ...userColumns, actionColumn].filter(Boolean);
  }, [userColumns, onEditRow, onDeleteRow, enableRowSelection, selectedIds]);
  const filteredData = (0, import_react2.useMemo)(() => {
    let result = data;
    if (enableFiltering && Object.keys(filters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(filters).every(([column, filterValue]) => {
          if (!filterValue) return true;
          const value = getNested(item, column);
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }
    if (enableGlobalSearch && globalQuery) {
      result = result.filter((item) => {
        return Object.values(item).some(
          (value) => String(value).toLowerCase().includes(globalQuery.toLowerCase())
        );
      });
    }
    return result;
  }, [data, filters, globalQuery, enableFiltering, enableGlobalSearch]);
  const paginatedData = (0, import_react2.useMemo)(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, page, pageSize]);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const table = (0, import_react_table.useReactTable)({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table.getSortedRowModel)()
  });
  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setPage(0);
  };
  const clearFilters = () => {
    setFilters({});
    setGlobalQuery("");
    setPage(0);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full space-y-4", children: [
    (enableGlobalSearch || enableFiltering) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      enableGlobalSearch && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "text",
          placeholder: "Search all columns...",
          value: globalQuery,
          onChange: (e) => {
            setGlobalQuery(e.target.value);
            setPage(0);
          },
          className: "w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        }
      ) }),
      enableFiltering && filterableColumns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-2", children: [
        filterableColumns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            type: "text",
            placeholder: `Filter ${column}...`,
            value: filters[column] || "",
            onChange: (e) => handleFilterChange(column, e.target.value),
            className: "px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          },
          column
        )),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { variant: "outline", onClick: clearFilters, children: "Clear" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "rounded-md border border-gray-200 overflow-hidden shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableHead, { children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-2" : "",
          onClick: header.column.getToggleSortingHandler(),
          children: [
            (0, import_react_table.flexRender)(header.column.columnDef.header, header.getContext()),
            {
              asc: " \u{1F53C}",
              desc: " \u{1F53D}"
            }[header.column.getIsSorted()] ?? null
          ]
        }
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        TableRow,
        {
          onClick: () => onRowClick && onRowClick(row.original),
          className: onRowClick ? "cursor-pointer hover:bg-muted/50" : "",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableCell, { children: (0, import_react_table.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results found." }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-sm text-muted-foreground", children: [
        "Showing ",
        page * pageSize + 1,
        " to ",
        Math.min((page + 1) * pageSize, filteredData.length),
        " of ",
        filteredData.length,
        " results"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage(Math.max(0, page - 1)),
            disabled: page === 0,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-sm", children: [
          "Page ",
          page + 1,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage(Math.min(totalPages - 1, page + 1)),
            disabled: page >= totalPages - 1,
            children: "Next"
          }
        )
      ] })
    ] }),
    selectedIds.size > 0 && (onBulkDelete || onBulkExport) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between p-4 bg-muted rounded-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
        selectedIds.size,
        " items selected"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setSelectedIds(/* @__PURE__ */ new Set()),
            children: "Clear Selection"
          }
        ),
        onBulkExport && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => onBulkExport(Array.from(selectedIds)),
            children: "Export Selected"
          }
        ),
        onBulkDelete && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => {
              if (confirmAction(`Delete ${selectedIds.size} selected items?`)) {
                onBulkDelete(Array.from(selectedIds));
                setSelectedIds(/* @__PURE__ */ new Set());
              }
            },
            children: "Delete Selected"
          }
        )
      ] })
    ] })
  ] });
}

// src/hooks/useErrorHandler.ts
var import_react3 = require("react");
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
  const [errors, setErrors] = (0, import_react3.useState)([]);
  const [isRetrying, setIsRetrying] = (0, import_react3.useState)(false);
  const retryCountRef = (0, import_react3.useRef)(0);
  const handleError = (0, import_react3.useCallback)(async (error, context = "", customOptions = {}) => {
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
  const handleAsync = (0, import_react3.useCallback)(async (asyncOperation, options2 = {}) => {
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
  const retryOperation = (0, import_react3.useCallback)(async (operation, maxAttempts) => {
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
  const handleValidationError = (0, import_react3.useCallback)((message, details = {}) => {
    const error = {
      message,
      type: ERROR_TYPES.VALIDATION_ERROR,
      severity: "medium",
      details,
      userMessage: message
    };
    return handleError(error, "validation");
  }, [handleError]);
  const handleNetworkError = (0, import_react3.useCallback)((message = "Network connection failed") => {
    const error = {
      message,
      type: ERROR_TYPES.NETWORK_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "network");
  }, [handleError]);
  const handleAuthError = (0, import_react3.useCallback)((message = "Authentication failed") => {
    const error = {
      message,
      type: ERROR_TYPES.AUTHENTICATION_ERROR,
      severity: "high",
      userMessage: message
    };
    return handleError(error, "authentication");
  }, [handleError]);
  const clearErrors = (0, import_react3.useCallback)(() => {
    setErrors([]);
  }, []);
  const clearError = (0, import_react3.useCallback)((errorId) => {
    setErrors((prev) => prev.filter((error) => error.id !== errorId));
  }, []);
  const getErrorsByType = (0, import_react3.useCallback)((type) => {
    return errors.filter((error) => error.type === type);
  }, [errors]);
  const hasCriticalErrors = (0, import_react3.useCallback)(() => {
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
  const handleFieldError = (0, import_react3.useCallback)((field, message) => {
    return handleValidationError(`Field '${field}': ${message}`, { field });
  }, [handleValidationError]);
  const handleRequiredFieldError = (0, import_react3.useCallback)((field) => {
    return handleValidationError(`Field '${field}' is required`, { field, type: "required" });
  }, [handleValidationError]);
  return {
    handleFieldError,
    handleRequiredFieldError,
    clearErrors
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALERT_TYPES,
  COMMON_STATUSES,
  CONFIRMATION_TYPES,
  DATA_TABLE_DEFAULTS,
  DEPARTMENT_TYPES,
  DataTable,
  ERROR_TYPES,
  ErrorBoundary,
  FIELD_CONFIGS,
  MACHINE_STATUSES,
  PRODUCT_TYPES,
  SEAL_SIDES,
  SHIFT_TYPES,
  TASK_STATUSES,
  TIME_CONSTANTS,
  VALIDATION_MESSAGES,
  WORK_CENTERS,
  cn,
  confirmAction,
  debounce,
  formatDate,
  formatDateTime,
  generateId,
  getNested,
  throttle,
  useErrorBoundary,
  useErrorHandler,
  useValidationErrorHandler,
  withErrorBoundary
});
//# sourceMappingURL=index.cjs.map