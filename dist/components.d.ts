import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
    errorId: string | null;
    retryCount: number;
}
interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: (error: Error, errorInfo: React.ErrorInfo, actions: {
        retry: () => void;
        reset: () => void;
        retryCount: number;
        maxRetries: number;
    }) => React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    maxRetries?: number;
}
/**
 * Unified Error Boundary Component
 * Provides comprehensive error handling for React components across all applications
 */
declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    handleRetry: () => void;
    handleReset: () => void;
    handleReportIssue: () => void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null | undefined;
}
/**
 * Higher-order component for error boundary
 */
declare const withErrorBoundary: <P extends object>(WrappedComponent: React.ComponentType<P>, options?: Omit<ErrorBoundaryProps, "children">) => (props: P) => react_jsx_runtime.JSX.Element;
/**
 * Hook for error boundary functionality
 */
declare const useErrorBoundary: () => {
    captureError: (error: Error) => void;
    resetError: () => void;
};

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    onEditRow?: (row: T) => void;
    onDeleteRow?: (row: T) => void;
    onRowClick?: (row: T) => void;
    enableFiltering?: boolean;
    filterableColumns?: string[];
    stickyColumns?: string[];
    onBulkDelete?: (ids: (string | number)[]) => void;
    onBulkExport?: (ids: (string | number)[]) => void;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    enableGlobalSearch?: boolean;
    enableColumnVisibility?: boolean;
    enableRowSelection?: boolean;
}
/**
 * Unified DataTable Component
 * Provides consistent data table functionality across all applications
 */
declare function DataTable<T extends Record<string, any>>({ data, columns: userColumns, onEditRow, onDeleteRow, onRowClick, enableFiltering, filterableColumns, stickyColumns, onBulkDelete, onBulkExport, initialPageSize, pageSizeOptions, enableGlobalSearch, enableColumnVisibility, enableRowSelection }: DataTableProps<T>): react_jsx_runtime.JSX.Element;

export { DataTable, ErrorBoundary, useErrorBoundary, withErrorBoundary };
