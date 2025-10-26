import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, type ColumnDef } from '@tanstack/react-table';
// Note: These would normally be imported from @santonastaso/crm-ui
// For now using placeholder interfaces
interface TableProps { children: React.ReactNode; className?: string; }
interface ButtonProps { children: React.ReactNode; variant?: string; size?: string; onClick?: () => void; disabled?: boolean; className?: string; }

const Table = ({ children, className, ...props }: TableProps) => (
  <table className={`w-full border-collapse border border-gray-200 table-auto ${className || ''}`} {...props}>
    {children}
  </table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50">
    {children}
  </thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200">
    {children}
  </tbody>
);

const TableRow = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <tr 
    onClick={onClick} 
    className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className || ''}`}
  >
    {children}
  </tr>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-0">
    {children}
  </th>
);

const TableCell = ({ children, colSpan, className }: { children: React.ReactNode; colSpan?: number; className?: string }) => (
  <td 
    colSpan={colSpan} 
    className={`px-4 py-3 text-sm text-gray-900 border-b border-gray-200 min-w-0 max-w-xs ${className || ''}`}
  >
    <div className="truncate" title={typeof children === 'string' ? children : ''}>
      {children}
    </div>
  </td>
);

const Button = ({ children, variant = 'default', size = 'default', onClick, disabled, className }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary'
  };
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md'
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${className || ''}`}
    >
      {children}
    </button>
  );
};
import { confirmAction, getNested } from '../utils';
import { DATA_TABLE_DEFAULTS } from '../constants';

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
export function DataTable<T extends Record<string, any>>({
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
}: DataTableProps<T>) {
  // State management
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [globalQuery, setGlobalQuery] = useState('');
  const [sorting, setSorting] = useState<any[]>([]);

  // Build columns with selection and actions
  const columns = useMemo(() => {
    const selectionColumn = enableRowSelection ? {
      id: 'select',
      header: ({ table }: any) => {
        const currentPageRows = table.getRowModel().rows.map((row: any) => row.original);
        const allSelected = currentPageRows.length > 0 && currentPageRows.every((r: any) => selectedIds.has(r.id));
        
        return (
          <div className="w-8">
            <input
              type="checkbox"
              aria-label="Select all"
              checked={allSelected}
              onChange={(e) => {
                const newSet = new Set(selectedIds);
                if (e.target.checked) {
                  currentPageRows.forEach((r: any) => newSet.add(r.id));
                } else {
                  currentPageRows.forEach((r: any) => newSet.delete(r.id));
                }
                setSelectedIds(newSet);
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        );
      },
      cell: ({ row }: any) => (
        <div className="flex w-8">
          <input
            type="checkbox"
            aria-label="Select row"
            checked={selectedIds.has(row.original.id)}
            onChange={(e) => {
              const newSet = new Set(selectedIds);
              if (e.target.checked) {
                newSet.add(row.original.id);
              } else {
                newSet.delete(row.original.id);
              }
              setSelectedIds(newSet);
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      )
    } : null;

    const actionColumn = (onEditRow || onDeleteRow) ? {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          {onEditRow && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEditRow(row.original)}
            >
              Edit
            </Button>
          )}
          {onDeleteRow && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => {
                if (confirmAction('Are you sure you want to delete this item?')) {
                  onDeleteRow(row.original);
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    } : null;

    return [selectionColumn, ...userColumns, actionColumn].filter(Boolean) as ColumnDef<T>[];
  }, [userColumns, onEditRow, onDeleteRow, enableRowSelection, selectedIds]);

  // Apply filters and search
  const filteredData = useMemo(() => {
    let result = data;

    // Apply column filters
    if (enableFiltering && Object.keys(filters).length > 0) {
      result = result.filter(item => {
        return Object.entries(filters).every(([column, filterValue]) => {
          if (!filterValue) return true;
          const value = getNested(item, column);
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }

    // Apply global search
    if (enableGlobalSearch && globalQuery) {
      result = result.filter(item => {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(globalQuery.toLowerCase())
        );
      });
    }

    return result;
  }, [data, filters, globalQuery, enableFiltering, enableGlobalSearch]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, page, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({ ...prev, [column]: value }));
    setPage(0); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({});
    setGlobalQuery('');
    setPage(0);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Only - Remove individual column filters */}
      {enableGlobalSearch && (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search all columns..."
              value={globalQuery}
              onChange={(e) => {
                setGlobalQuery(e.target.value);
                setPage(0);
              }}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {globalQuery && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Table with horizontal scrolling */}
      <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer select-none flex items-center gap-2' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
          >
            Previous
          </Button>
          
          <span className="text-sm">
            Page {page + 1} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (onBulkDelete || onBulkExport) && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">
            {selectedIds.size} items selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
            >
              Clear Selection
            </Button>
            {onBulkExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkExport(Array.from(selectedIds))}
              >
                Export Selected
              </Button>
            )}
            {onBulkDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirmAction(`Delete ${selectedIds.size} selected items?`)) {
                    onBulkDelete(Array.from(selectedIds));
                    setSelectedIds(new Set());
                  }
                }}
              >
                Delete Selected
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
