# DataTable

A generic, reusable table component inspired by [Ant Design Table](https://ant.design/components/table), built with shadcn/ui components and TypeScript.

## When To Use

- To display a collection of structured data
- To sort, search, paginate, filter data
- When you need a consistent table design across your application
- For server-side data fetching with search and filter callbacks

## How To Use

Specify `dataSource` of DataTable as an array of data and `columns` configuration.

```tsx
import { DataTable, DataTableColumn } from '@/components/ui/data-table'

const dataSource = [
  {
    id: '1',
    name: 'John Doe',
    age: 32,
    email: 'john@example.com',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    email: 'jane@example.com',
    status: 'inactive'
  }
]

const columns: DataTableColumn[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }
]

<DataTable dataSource={dataSource} columns={columns} />
```

## Examples

### Basic Usage

```tsx
<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
/>
```

### With Search

```tsx
<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  searchable={true}
  searchPlaceholder="Search users..."
/>
```

### With Filters

```tsx
const filters = [
  {
    key: 'status',
    label: 'Status',
    type: 'select' as const,
    placeholder: 'All statuses',
    options: [
      { label: 'All statuses', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  },
  {
    key: 'createdAt',
    label: 'Created Date',
    type: 'date' as const,
    placeholder: 'Select date'
  }
]

<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  filters={filters}
  onFilter={(searchQuery, filterValues) => {
    // Handle search and filter changes
    fetchUsers({ search: searchQuery, ...filterValues })
  }}
/>
```

### With Row Selection

```tsx
const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  selection={{
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys as string[])
      console.log('Selected users:', rows)
    }
  }}
/>
```

### With Pagination

```tsx
<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  pagination={{
    current: 1,
    pageSize: 10,
    total: users.length,
    onChange: (page, pageSize) => {
      console.log('Page changed:', { page, pageSize })
    }
  }}
/>
```

### Custom Column Rendering

```tsx
const columns: DataTableColumn[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {value}
      </span>
    )
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <div className="flex gap-2">
        <Button onClick={() => handleEdit(record)}>Edit</Button>
        <Button onClick={() => handleDelete(record)} variant="destructive">Delete</Button>
      </div>
    )
  }
]
```

### Loading State

```tsx
<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  loading={isLoading}
/>
```

### Server-side Data Fetching

```tsx
const handleFilter = (searchQuery: string, filterValues: Record<string, any>) => {
  // Call your API with search and filter parameters
  fetchUsers({
    search: searchQuery,
    filters: filterValues,
    page: currentPage,
    pageSize: 10
  }).then(response => {
    setUsers(response.data)
    setTotal(response.total)
  })
}

<DataTable
  title="Users"
  columns={columns}
  dataSource={users}
  rowKey="id"
  searchable={true}
  filters={filters}
  onFilter={handleFilter}
  pagination={{
    current: currentPage,
    pageSize: 10,
    total: totalUsers,
    onChange: (page) => setCurrentPage(page)
  }}
/>
```

## API

### DataTable

| Property | Description | Type | Default | Version |
|----------|-------------|------|---------|---------|
| columns | Columns configuration | `DataTableColumn[]` | - | - |
| dataSource | Data record array to be displayed | `T[]` | - | - |
| rowKey | Row's unique key, could be a string or function that returns a string | `string \| (record: T) => string` | `'id'` | - |
| title | Table title | `string` | - | - |
| loading | Loading status of table | `boolean` | `false` | - |
| searchable | Whether to show search input | `boolean` | `true` | - |
| searchPlaceholder | Placeholder for search input | `string` | `'Search...'` | - |
| filters | Filter configuration | `DataTableFilter[]` | `[]` | - |
| showFilters | Whether to show filter panel initially | `boolean` | `false` | - |
| pagination | Pagination config, set to `false` to disable | `DataTablePaginationConfig \| false` | `{ current: 1, pageSize: 10 }` | - |
| selection | Row selection config | `DataTableSelection<T>` | - | - |
| scroll | Whether table can be scrolled in x/y direction | `{ x?: number \| string, y?: number \| string }` | - | - |
| bordered | Whether to show all table borders | `boolean` | `false` | - |
| size | Size of table | `'small' \| 'middle' \| 'large'` | `'middle'` | - |
| className | Additional CSS class | `string` | `''` | - |
| emptyText | Empty text when no data | `ReactNode` | `'No data available'` | - |
| onRow | Set props on per row | `(record: T, index: number) => object` | - | - |
| onFilter | Callback when search or filter changes | `(searchQuery: string, filterValues: Record<string, any>) => void` | - | - |

### DataTableColumn

| Property | Description | Type | Default | Version |
|----------|-------------|------|---------|---------|
| title | Title of this column | `string \| ReactNode` | - | - |
| dataIndex | Display field of the data record | `keyof T` | - | - |
| key | Unique key of this column | `string` | - | - |
| width | Width of this column | `number \| string` | - | - |
| align | Alignment of column content | `'left' \| 'center' \| 'right'` | `'left'` | - |
| className | Additional CSS class for column | `string` | - | - |
| ellipsis | Whether to enable ellipsis for long content | `boolean` | `false` | - |
| hidden | Whether to hide this column | `boolean` | `false` | - |
| render | Renderer of table cell | `(value: any, record: T, index: number) => ReactNode` | - | - |

### DataTableFilter

| Property | Description | Type | Default | Version |
|----------|-------------|------|---------|---------|
| key | Filter key | `string` | - | - |
| label | Filter label | `string` | - | - |
| type | Filter type | `'text' \| 'select' \| 'date' \| 'dateRange'` | - | - |
| placeholder | Placeholder text | `string` | - | - |
| options | Options for select filter | `{ label: string, value: any }[]` | - | - |

### DataTableSelection

| Property | Description | Type | Default | Version |
|----------|-------------|------|---------|---------|
| selectedRowKeys | Controlled selected row keys | `(string \| number)[]` | - | - |
| onChange | Callback when selection changes | `(selectedRowKeys: (string \| number)[], selectedRows: T[]) => void` | - | - |
| getCheckboxProps | Get checkbox props | `(record: T) => { disabled?: boolean }` | - | - |

### DataTablePaginationConfig

| Property | Description | Type | Default | Version |
|----------|-------------|------|---------|---------|
| current | Current page number | `number` | `1` | - |
| pageSize | Number of data items per page | `number` | `10` | - |
| total | Total number of data items | `number` | - | - |
| onChange | Called when page number changes | `(page: number, pageSize: number) => void` | - | - |

## Migration from Manual Tables

### Before (Manual Implementation)

```tsx
// ❌ Old way - lots of boilerplate
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Age</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.age}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### After (DataTable)

```tsx
// ✅ New way - clean and declarative
<DataTable
  columns={[
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Email', dataIndex: 'email', key: 'email' }
  ]}
  dataSource={data}
  rowKey="id"
/>
```

## Features

- ✅ **Type-safe**: Full TypeScript support with generic types
- ✅ **Search**: Built-in search functionality
- ✅ **Filters**: Multiple filter types (text, select, date, date range)
- ✅ **Row Selection**: Multi-row selection with callbacks
- ✅ **Pagination**: Configurable pagination
- ✅ **Custom Rendering**: Flexible column rendering
- ✅ **Loading States**: Built-in skeleton loading
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Server-side Ready**: No client-side filtering, delegates to parent
- ✅ **Accessible**: Keyboard navigation and screen reader support

## Best Practices

1. **Always define TypeScript interfaces** for your data types
2. **Use meaningful column keys** for proper identification
3. **Keep render functions simple** - extract complex logic to separate components
4. **Handle server-side operations** through onFilter callback
5. **Use rowKey properly** for optimal performance
6. **Configure pagination** for large datasets

## Notes

- **No client-side filtering**: DataTable doesn't filter data internally. Use the `onFilter` callback to handle search and filter changes on the server side.
- **Pagination calculation**: The component handles pagination display but you need to provide the correct data slice through `dataSource`.
- **Loading states**: Use the `loading` prop to show skeleton placeholders while fetching data.

## FAQ

### How to handle server-side filtering?

Use the `onFilter` callback to receive search and filter values, then fetch new data from your API:

```tsx
const handleFilter = (searchQuery: string, filterValues: Record<string, any>) => {
  fetchData({ search: searchQuery, ...filterValues })
}
```

### How to customize empty state?

Use the `emptyText` prop to customize the message shown when no data is available:

```tsx
<DataTable emptyText="No users found" />
```

### How to make columns responsive?

Use the `scroll` prop to enable horizontal scrolling on smaller screens:

```tsx
<DataTable scroll={{ x: 1200 }} />
```

### How to handle row clicks?

Use the `onRow` prop to add event handlers to table rows:

```tsx
<DataTable
  onRow={(record) => ({
    onClick: () => console.log('Clicked:', record),
    onDoubleClick: () => handleEdit(record)
  })}
/>
``` 