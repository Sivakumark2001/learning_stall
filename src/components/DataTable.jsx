import React, { useState } from "react";
import "./DataTable.css";

const defaultClassNames = {
  table: "datatable-table",
  th: "datatable-th",
  td: "datatable-td",
  tr: "datatable-tr",
  actionTh: "datatable-action-th",
  actionTd: "datatable-action-td",
  deleteButton: "datatable-delete-btn",
  sortButton: "datatable-sort-btn",
  searchInput: "datatable-search-input",
  filterButton: "datatable-filter-btn",
  modalOverlay: "datatable-modal-overlay",
  modalContent: "datatable-modal-content",
};

const DataTable = ({
  columns,
  data,
  renderers = {},
  onDeleteRow,
  classNames = {},
  onSort,
  sortState: externalSortState = {},
  search,
  onSearch,
  filterButton = false,
  filterComponent = null,
  onFilterSubmit = null,
}) => {
  const [internalSortState, setInternalSortState] = useState({ accessor: null, direction: null });
  const [internalData, setInternalData] = useState(data);
  const [showFilter, setShowFilter] = useState(false);

  React.useEffect(() => {
    if (!onSort) setInternalData(data);
  }, [data, onSort]);

  const isExternalSort = typeof onSort === "function";
  const sortState = isExternalSort ? externalSortState : internalSortState;
  const tableData = isExternalSort ? data : internalData;

  const handleSort = (accessor, direction) => {
    if (isExternalSort) {
      onSort(accessor, direction);
    } else {
      setInternalSortState({ accessor, direction });
      setInternalData((prev) => {
        const sorted = [...prev].sort((a, b) => {
          if (a[accessor] < b[accessor]) return direction === "asc" ? -1 : 1;
          if (a[accessor] > b[accessor]) return direction === "asc" ? 1 : -1;
          return 0;
        });
        return sorted;
      });
    }
  };

  const getClass = (key) => classNames[key] || defaultClassNames[key] || "";

  const renderSortButtons = (col) => (
    <span style={{ marginLeft: 8, display: "inline-flex", flexDirection: "column" }}>
      <button
        type="button"
        className={getClass("sortButton")}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          fontSize: "0.9em",
          lineHeight: "1em",
          color: sortState.accessor === col.accessor && sortState.direction === "asc" ? "#213547" : "#aaa"
        }}
        aria-label={`Sort ${col.header} ascending`}
        onClick={() => handleSort(col.accessor, "asc")}
      >
        ▲
      </button>
      <button
        type="button"
        className={getClass("sortButton")}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          fontSize: "0.9em",
          lineHeight: "1em",
          color: sortState.accessor === col.accessor && sortState.direction === "desc" ? "#213547" : "#aaa"
        }}
        aria-label={`Sort ${col.header} descending`}
        onClick={() => handleSort(col.accessor, "desc")}
      >
        ▼
      </button>
    </span>
  );

  // Modal for filter
  const renderFilterModal = () => (
    showFilter && (
      <div className={getClass("modalOverlay")} onClick={() => setShowFilter(false)}>
        <div
          className={getClass("modalContent")}
          onClick={e => e.stopPropagation()}
        >
          {filterComponent &&
            React.cloneElement(filterComponent, {
              onSubmit: (data) => {
                if (onFilterSubmit) onFilterSubmit(data);
                setShowFilter(false);
              },
              onClose: () => setShowFilter(false),
            })}
        </div>
      </div>
    )
  );

  return (
    <div>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {filterButton && (
          <button
            className={getClass("filterButton")}
            onClick={() => setShowFilter(true)}
            style={{
              marginRight: "auto",
              padding: "0.7em 1.2em",
              borderRadius: "8px",
              border: "1px solid #e0e6ed",
              background: "#f5f7fa",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Filter
          </button>
        )}
        {onSearch && (
          <input
            className={getClass("searchInput")}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            style={{
              padding: "0.7em 1.2em",
              borderRadius: "8px",
              border: "1px solid #e0e6ed",
              fontSize: "1em",
              minWidth: "220px",
              boxShadow: "0 1px 4px rgba(60,72,88,0.07)"
            }}
          />
        )}
      </div>
      {renderFilterModal()}
      <div style={{ overflowX: "auto" }}>
        <table className={getClass("table")}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className={getClass("th")}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {col.header}
                    {renderSortButtons(col)}
                  </span>
                </th>
              ))}
              {onDeleteRow && (
                <th className={getClass("actionTh")}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className={getClass("tr")}>
                {columns.map((col) => (
                  <td key={col.accessor} className={getClass("td")}>
                    {renderers[col.accessor]
                      ? renderers[col.accessor](row[col.accessor], row)
                      : row[col.accessor]}
                  </td>
                ))}
                {onDeleteRow && (
                  <td className={getClass("actionTd")}>
                    <button
                      className={getClass("deleteButton")}
                      onClick={() => onDeleteRow(row, idx)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;