import React, { useState } from "react";
import DataTable from "../components/DataTable";
import "../components/DataTable.css";

const studentColumns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Grade", accessor: "grade" },
];

const initialStudentData = [
  { id: 1, name: "Alice", age: 20, grade: "A" },
  { id: 2, name: "Bob", age: 21, grade: "B" },
  { id: 3, name: "Charlie", age: 19, grade: "A" },
];

function StudentGridPage() {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [sortState, setSortState] = useState({ accessor: null, direction: null });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});

  const handleDeleteRow = (row, idx) => {
    setStudentData((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSort = (accessor, direction) => {
    setSortState({ accessor, direction });
    setStudentData((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (a[accessor] < b[accessor]) return direction === "asc" ? -1 : 1;
        if (a[accessor] > b[accessor]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      return sorted;
    });
  };

  const handleFilterSubmit = (filterData) => {
    setFilter(filterData);
  };

  const filteredData = studentData.filter((row) =>
    (!filter.grade || row.grade === filter.grade) &&
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Student Details</h2>
      <DataTable
        columns={studentColumns}
        data={filteredData}
        renderers={{
          age: (value) => <b>{value}</b>,
          grade: (value) => value === "A" ? <span style={{ color: "green" }}>{value}</span> : value
        }}
        onDeleteRow={handleDeleteRow}
        onSort={handleSort}
        sortState={sortState}
        search={search}
        onSearch={setSearch}
        filterButton={true}
        filterComponent={
          <StudentFilterForm
            onSubmit={handleFilterSubmit}
            onClose={() => setFilter({})}
          />
        }
        onFilterSubmit={handleFilterSubmit}
      />
    </div>
  );
}

// Example filter form component
function StudentFilterForm({ onSubmit, onClose }) {
  const [grade, setGrade] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ grade });
      }}
    >
      <div style={{ marginBottom: "1em" }}>
        <label>
          Grade:
          <select value={grade} onChange={e => setGrade(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: "1em" }}>
        <button type="submit" style={{ padding: "0.5em 1.2em" }}>Apply</button>
        <button type="button" onClick={onClose} style={{ padding: "0.5em 1.2em" }}>Cancel</button>
      </div>
    </form>
  );
}

export default StudentGridPage;