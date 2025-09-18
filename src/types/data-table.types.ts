import { ReactNode } from 'react';

// Column definition interface similar to Ant Design
export interface DataTableColumn<T = any> {
  title: string | ReactNode;
  dataIndex?: keyof T;
  key: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
  className?: string;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  hidden?: boolean;
}

// Pagination configuration
export interface DataTablePaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, pageSize: number) => void;
}

// Filter configuration
export interface DataTableFilter {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange';
  placeholder?: string;
  options?: { label: string; value: any }[];
  value?: any;
  onChange?: (value: any) => void;
}

// Selection configuration
export interface DataTableSelection<T = any> {
  selectedRowKeys?: (string | number)[];
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  onSelect?: (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event
  ) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

// Main DataTable props interface
export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  dataSource: T[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  error?: string | ReactNode;
  pagination?: DataTablePaginationConfig | false;
  selection?: DataTableSelection<T>;
  filters?: DataTableFilter[];
  initSearchQuery?: string;
  showFilters?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  title?: string | ReactNode;
  headerButton?: ReactNode;
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  scroll?: { x?: number | string; y?: number | string };
  maxTableHeight?: number;
  className?: string;
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onContextMenu?: (event: React.MouseEvent) => void;
  };
  onFilter?: (filters: Record<string, any>) => void;
  emptyText?: ReactNode;
}

// Sort configuration
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc' | null;
}

// Internal state for DataTable (pagination removed)
export interface DataTableState {
  searchQuery: string;
  selectedRowKeys: (string | number)[];
  filters: Record<string, any>;
}
