# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-------------------------------------------------------------------------------

## Route Handling & Authentication

This project uses **React Router v7** for client-side routing and **Firebase Authentication** to protect sensitive routes.

### Route Structure

- `/login`  
  Public route for user login. Redirects to `/` if already authenticated.
- `/register`  
  Public route for user registration. Redirects to `/` if already authenticated.
- `/`  
  **Protected route**. Displays the main student grid. Only accessible to authenticated users.
- `*`  
  Any unknown route redirects to `/`.

### Protected Routes

Protected routes are implemented using a `ProtectedRoute` component. This component checks authentication status using the authentication context:

- If the user is **not authenticated**, they are redirected to `/login`.
- If the authentication state is **loading**, a loading indicator is shown.
- If the user is **authenticated**, the protected content is rendered.

**Example usage:**
```jsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <StudentGridPage />
    </ProtectedRoute>
  }
/>
```

### Layout

The main layout component wraps all routes, providing a consistent header and footer. The header is hidden on `/login` and `/register` routes.

### Adding New Protected Routes

To add a new protected page:

1. Create your page component (e.g., `MyPage.jsx`).
2. Add a route in your main route file wrapped with `ProtectedRoute`:
   ```jsx
   <Route
     path="/my-page"
     element={
       <ProtectedRoute>
         <MyPage />
       </ProtectedRoute>
     }
   />
   ```

### Redirects

- Authenticated users are redirected away from `/login` and `/register` to `/`.
- Unauthenticated users are redirected to `/login` when accessing protected routes.


-------------------------------------------------------------------------

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

----------------------------------------------------
## Reusable DataTable Handling

This project includes a flexible, reusable [`DataTable`](src/components/DataTable.jsx) component for displaying and managing tabular data. The DataTable supports sorting, searching, filtering, custom cell rendering, and row deletion.

### Usage

To use the DataTable in your component:

1. **Define your columns:**  
   Each column should have a `header` (display name) and an `accessor` (key in your data object).

   ```js
   const columns = [
     { header: "ID", accessor: "id" },
     { header: "Name", accessor: "name" },
     { header: "Age", accessor: "age" },
     { header: "Grade", accessor: "grade" },
   ];
   ```

2. **Prepare your data:**  
   Data should be an array of objects matching the column accessors.

   ```js
   const data = [
     { id: 1, name: "Alice", age: 20, grade: "A" },
     { id: 2, name: "Bob", age: 21, grade: "B" },
   ];
   ```

3. **(Optional) Define custom renderers:**  
   You can customize how specific columns are rendered.

   ```js
   const renderers = {
     age: (value) => <b>{value}</b>,
     grade: (value) => value === "A" ? <span style={{ color: "green" }}>{value}</span> : value,
   };
   ```

4. **Use the DataTable component:**  
   Pass the columns, data, and any handlers for sorting, searching, filtering, or row deletion.

   ```jsx
   import DataTable from './components/DataTable';

   function MyPage() {
     const [tableData, setTableData] = useState(data);
     const [sortState, setSortState] = useState({ accessor: null, direction: null });
     const [search, setSearch] = useState("");

     const handleDeleteRow = (row, idx) => {
       setTableData(prev => prev.filter((_, i) => i !== idx));
     };

     const handleSort = (accessor, direction) => {
       setSortState({ accessor, direction });
       setTableData(prev => {
         const sorted = [...prev].sort((a, b) => {
           if (a[accessor] < b[accessor]) return direction === "asc" ? -1 : 1;
           if (a[accessor] > b[accessor]) return direction === "asc" ? 1 : -1;
           return 0;
         });
         return sorted;
       });
     };

     const filteredData = tableData.filter(row =>
       Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
     );

     return (
       <DataTable
         columns={columns}
         data={filteredData}
         renderers={renderers}
         onDeleteRow={handleDeleteRow}
         onSort={handleSort}
         sortState={sortState}
         search={search}
         onSearch={setSearch}
       />
     );
   }
   ```

### Features

- **Sorting:** Click column headers to sort ascending/descending.
- **Searching:** Built-in search input for filtering rows.
- **Filtering:** Optional filter modal/component support.
- **Custom Rendering:** Pass a `renderers` object to customize cell output.
- **Row Deletion:** Provide `onDeleteRow` to enable row deletion.

For a full example, see [`StudentGridPage`](src/Pages/StudentGridPage.jsx).

-------------------------------------------------------------------------

## Problem 1: File Manager

**Description:**  
An interactive file explorer that allows users to create folders and files in a hierarchical tree structure, mimicking a real-world file system. Users can add new folders or files at any level, expand/collapse folders, and view file contents. This component demonstrates dynamic tree data handling and recursive UI rendering in React.

**Features:**
- Add folders and files at any level
- Expand/collapse folders to navigate the hierarchy
- View file contents
- Uses immutable state updates for reliable React rendering

**Implementation:**  
See [`FileExplorer`](src/problems/problem1/FileExplorer.jsx) and [`Folder`](src/problems/problem1/components/Folder.jsx).

**Demo:**  
Navigate to `/problem/1` after login.

-------------------------------------------------------------------------

## Problem 2: Pagination

**Description:**  
A product list with pagination, demonstrating both frontend pagination logic and integration with a backend API. Users can navigate through large datasets by breaking them into smaller, manageable pages. Features include page size selection, next/previous navigation, and dynamic data loading based on the current page.

**Features:**
- Fetches product data from an external API
- Pagination controls with page numbers and next/previous buttons
- Animated product cards using Framer Motion
- Loading indicator while fetching data

**Implementation:**  
See [`Product`](src/problems/problem2/components/Product.jsx).

**Demo:**  
Navigate to `/problem/2` after login.

-------------------------------------------------------------------------
