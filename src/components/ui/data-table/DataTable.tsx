'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTablePagination } from './DataTablePagination';
import { FaFilter, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { DataTableFilters } from '@/components/ui/data-table/DataTableFilters';
import { DataTableProps } from '@/types/data-table.types';

export function DataTable<T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  error,
  pagination = { current: 1, pageSize: 10, total: 0 },
  selection,
  filters = [],
  showFilters = false,
  searchable = true,
  searchPlaceholder = 'Search...',
  initSearchQuery = '',
  title,
  headerButton,
  bordered = false,
  size = 'middle',
  scroll,
  maxTableHeight,
  className = '',
  onRow,
  onFilter,
  emptyText = 'No data available',
}: DataTableProps<T>) {
  // ========== STATE MANAGEMENT ==========
  // Main table state - handles search, selection, and filters only
  const [state, setState] = useState({
    searchQuery: initSearchQuery,
    selectedRowKeys: selection?.selectedRowKeys || [],
    filters: {},
  });

  // Debounced search query for better performance
  const debouncedSearchQuery = useDebouncedValue(state.searchQuery, 500);

  // Controls whether the filter panel is visible or hidden
  // Initialize with showFilters prop value
  const [showFilterPanel, setShowFilterPanel] = useState(showFilters);

  // Track if this is the initial render to avoid calling onFilter on mount
  const isInitialRender = useRef(true);

  // ========== HELPER FUNCTIONS ==========
  // Generates unique key for each table row - supports both string key and function
  const getRowKey = useCallback(
    (record: T, index: number): string => {
      if (typeof rowKey === 'function') {
        const functionKey = rowKey(record);
        // Ensure uniqueness by combining function result with index
        return `${functionKey}-${index}`;
      }
      const recordKey = record[rowKey];
      // Ensure uniqueness by combining record key with index
      return recordKey ? `${recordKey}-${index}` : index.toString();
    },
    [rowKey]
  );

  // ========== DATA PROCESSING ==========
  // No client-side filtering - just return dataSource
  const processedData = dataSource;

  // Always use dataSource directly - pagination handled by parent
  const paginatedData = processedData;

  // ========== FILTER EFFECT ==========
  // Handle filter changes separately - only call onFilter when filters actually change
  useEffect(() => {
    // Skip calling onFilter on initial render (component mount)
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Prepare filter data in the required format
    const combinedFilters = {
      searchQuery: debouncedSearchQuery || '', // Always include searchQuery (even if empty)
      ...Object.fromEntries(
        Object.entries(state.filters).filter(
          ([_, value]) =>
            value !== undefined &&
            value !== null &&
            value !== '' &&
            value !== 'all'
        )
      ),
    };

    // Call onFilter only when search or filters change
    onFilter?.(combinedFilters);
  }, [debouncedSearchQuery, state.filters, onFilter]);

  // ========== EVENT HANDLERS ==========
  // Updates search query in state
  const handleSearch = (value: string) => {
    setState(prev => ({ ...prev, searchQuery: value }));
  };

  // Pagination handled by parent - just call onChange and reset selection
  const handlePageChange = (page: number) => {
    if (pagination && typeof pagination === 'object') {
      // Reset selected rows when changing pages
      setState(prev => ({ ...prev, selectedRowKeys: [] }));
      selection?.onChange?.([], []);
      pagination.onChange?.(page, pagination.pageSize || 10);
    }
  };

  // Handles "select all" checkbox in table header
  const handleSelectAll = (checked: boolean) => {
    const newSelectedKeys = checked
      ? paginatedData.map((record, index) => getRowKey(record, index))
      : [];
    setState(prev => ({ ...prev, selectedRowKeys: newSelectedKeys }));
    selection?.onChange?.(newSelectedKeys, checked ? paginatedData : []);
  };

  // Handles individual row selection checkbox
  const handleSelectRow = (record: T, index: number, checked: boolean) => {
    const recordKey = getRowKey(record, index);
    const newSelectedKeys = checked
      ? [...state.selectedRowKeys, recordKey]
      : state.selectedRowKeys.filter(key => key !== recordKey);

    setState(prev => ({ ...prev, selectedRowKeys: newSelectedKeys }));

    // Calculate selected rows to pass to onChange callback
    const selectedRows = paginatedData.filter((row, idx) =>
      newSelectedKeys.includes(getRowKey(row, idx))
    );
    selection?.onChange?.(newSelectedKeys, selectedRows);
  };

  // ========== LOADING TABLE SKELETON ==========
  // Renders skeleton content for table body when loading
  const renderTableSkeleton = () => {
    const skeletonRows =
      pagination && typeof pagination === 'object'
        ? pagination.pageSize || 10
        : 5;

    return (
      <TableBody>
        {Array.from({ length: skeletonRows }).map((_, index) => (
          <TableRow key={index}>
            {/* Selection checkbox skeleton */}
            {selection && (
              <TableCell className="px-4">
                <Skeleton className="h-[22px] w-[22px] rounded-sm" />
              </TableCell>
            )}

            {/* Table cells skeleton */}
            {columns
              .filter(column => !column.hidden)
              .map(column => (
                <TableCell key={column.key}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  // ========== ERROR TABLE STATE ==========
  // Renders error message for table body when there's an error
  const renderTableError = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + (selection ? 1 : 0)}
            className="py-12 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="mb-4 text-3xl text-red-500">
                <FaExclamationTriangle />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Something went wrong
                </h3>
                <div className="text-sm">
                  {/* {typeof error === 'string' ? error : 'Please try again later'} */}
                  Please try again later
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white px-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md ${className}`}
    >
      {/* ========== TABLE HEADER ========== */}
      {/* Renders title, filter button, search box and header button if enabled */}
      {(title || searchable || filters.length > 0 || headerButton) && (
        <div className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          {title && (
            <h2 className="m-0 text-xl font-semibold text-gray-900">{title}</h2>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {/* Filter toggle button */}
            {filters.length > 0 && (
              <button
                className={`flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-light text-gray-700 transition-all ${showFilterPanel ? 'border-green-500 bg-green-100' : 'hover:border-green-500 hover:bg-gray-50'}`}
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                <FaFilter className="text-lg" />
              </button>
            )}

            {/* Search input with icon */}
            {searchable && (
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 z-10 text-sm text-gray-500" />
                <Input
                  className="min-w-40 rounded-full border border-gray-300 bg-white py-5 pr-3 pl-9 text-sm text-gray-800 transition-all outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
                  placeholder={searchPlaceholder}
                  value={state.searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                />
              </div>
            )}

            {/* Custom header button */}
            {headerButton && (
              <div className="flex items-center">{headerButton}</div>
            )}
          </div>
        </div>
      )}

      {/* ========== FILTER PANEL ========== */}
      {/* Conditional filter panel - shows when filter button is clicked */}
      {showFilterPanel && filters.length > 0 && (
        <DataTableFilters
          filters={filters}
          values={state.filters}
          onChange={(filterValues: Record<string, any>) =>
            setState(prev => ({ ...prev, filters: filterValues }))
          }
        />
      )}

      {/* ========== TABLE CONTENT ========== */}
      {/* Table container with optional horizontal scrolling */}
      <div
        className="overflow-x-auto"
        style={{
          ...(scroll?.x && { overflowX: 'auto', maxWidth: scroll.x }),
          ...(maxTableHeight && { overflowY: 'auto', maxHeight: maxTableHeight }),
        }}
      >
        <Table>
          {/* Table Header with columns and optional selection checkbox */}
          <TableHeader className={`${maxTableHeight ? 'sticky top-0 z-10' : ''}`}>
            <TableRow className="bg-green-50 hover:bg-green-50">
              {/* "Select All" checkbox column */}
              {selection && (
                <TableHead className="px-4 py-3">
                  <Checkbox
                    className="h-[22px] w-[22px] rounded-sm border border-gray-400 accent-green-600 opacity-50 checked:opacity-100"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((record, index) =>
                        state.selectedRowKeys.includes(getRowKey(record, index))
                      )
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}

              {/* Dynamic column headers based on columns configuration */}
              {columns
                .filter(column => !column.hidden)
                .map(column => (
                  <TableHead
                    key={column.key}
                    className={`font-normal text-gray-800 ${column.className || ''}`}
                    style={{ width: column.width, textAlign: column.align }}
                  >
                    {column.title}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>

          {/* Table Body with data rows, empty state, loading skeleton, or error state */}
          {loading ? (
            /* Loading skeleton - shows skeleton rows while data is loading */
            renderTableSkeleton()
          ) : error ? (
            /* Error state - shows error message when there's an error */
            renderTableError()
          ) : (
            <TableBody>
              {paginatedData.length === 0 ? (
                /* Empty state - shows when no data is available */
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selection ? 1 : 0)}
                    className="py-8 text-center text-gray-500"
                  >
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                /* Data rows - renders each record with dynamic columns */
                paginatedData.map((record, index) => {
                  const recordKey = getRowKey(record, index);
                  const rowProps = onRow?.(record, index) || {};

                  return (
                    <TableRow
                      key={recordKey}
                      className="hover:bg-slate-50"
                      {...rowProps}
                    >
                      {/* Individual row selection checkbox */}
                      {selection && (
                        <TableCell className="px-4">
                          <Checkbox
                            className="h-[22px] w-[22px] rounded-sm border border-gray-400 accent-green-600 opacity-50 checked:opacity-100"
                            checked={state.selectedRowKeys.includes(recordKey)}
                            onCheckedChange={checked =>
                              handleSelectRow(record, index, checked as boolean)
                            }
                          />
                        </TableCell>
                      )}

                      {/* Dynamic table cells based on column configuration */}
                      {columns
                        .filter(column => !column.hidden)
                        .map(column => {
                          // Get cell value from record based on dataIndex
                          const value = column.dataIndex
                            ? record[column.dataIndex]
                            : record;
                          // Use custom render function or default string conversion
                          const cellContent = column.render
                            ? column.render(value, record, index)
                            : String(value || '');

                          return (
                            <TableCell
                              key={column.key}
                              className={`font-light text-gray-800 ${column.className || ''}`}
                              style={{ textAlign: column.align }}
                            >
                              {/* Handle text ellipsis for long content */}
                              {column.ellipsis ? (
                                <div
                                  className="truncate"
                                  title={String(cellContent)}
                                >
                                  {cellContent}
                                </div>
                              ) : (
                                cellContent
                              )}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* ========== PAGINATION ========== */}
      {/* Pagination controlled by parent component */}
      {pagination && typeof pagination === 'object' && (
        <DataTablePagination
          currentPage={pagination.current || 1}
          totalItems={pagination.total || 0}
          itemsPerPage={pagination.pageSize || 10}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
