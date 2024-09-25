import React, { useMemo, useState, useCallback } from "react";
import styles from "./styles/issue-list-table.module.scss";
import { useRouter } from "next/router";
import { CustomSortLabel } from "./custom-sort-label";
import { Issue, TableProps } from "./types";

const GenericIssuesTable: React.FC<TableProps> = ({ columns, rows }) => {
  const [sortBy, setSortBy] = useState<keyof Issue>(columns[0]?.key);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSort = useCallback((columnKey: keyof Issue) => {
    setSortBy((prevSortBy) => {
      if (columnKey === prevSortBy) {
        setSortDirection((prevDirection) =>
          prevDirection === "asc" ? "desc" : "asc"
        );
      } else {
        setSortDirection("asc");
      }
      return columnKey;
    });
  }, []);

  const handleRowClick = useCallback(
    (id: number) => {
      router.push(`/issues/${id}`);
    },
    [router]
  );

  const handleKeyPressOnRow = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>, id: number) => {
      if (e.key === "Enter" || e.key === " ") {
        handleRowClick(id);
      }
    },
    [handleRowClick]
  );

  const handleFilterChange = useCallback(
    (columnKey: keyof Issue, value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [columnKey]: value,
      }));
    },
    []
  );

  const handleKeyPressOnHeader = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>, columnKey: keyof Issue) => {
      if (e.key === "Enter" || e.key === " ") {
        handleSort(columnKey);
      }
    },
    [handleSort]
  );

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      columns.every((column) => {
        const filterValue = filters[column.key];
        if (!filterValue) return true;

        const rowValue = String(row[column.key] ?? "");
        return rowValue.toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  }, [filters, rows, columns]);

  const sortedRows = useMemo(() => {
    return filteredRows.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [filteredRows, sortBy, sortDirection]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table} role="grid">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                aria-sort={
                  sortBy === column.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className={
                  sortBy === column.key ? styles.sortLabelSelected : ""
                }
                onClick={() => handleSort(column.key)}
              >
                {column.isSortable ? (
                  <span
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => handleKeyPressOnHeader(e, column.key)}
                    aria-label={`Sort by ${column.header}`}
                  >
                    <CustomSortLabel
                      active={sortBy === column.key}
                      direction={sortDirection}
                    >
                      {column.header}
                    </CustomSortLabel>
                  </span>
                ) : (
                  column.header
                )}
                {column.isFilterable && (
                  <input
                    type={column.filterType === "number" ? "number" : "text"}
                    className={styles.filterInput}
                    value={filters[column.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.key, e.target.value)
                    }
                    placeholder={`Filter by ${column.header}`}
                    aria-label={`Filter by ${column.header}`}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              onKeyDown={(e) => handleKeyPressOnRow(e, row.id)}
              className={styles.row}
              role="row"
              tabIndex={0}
              aria-label={`Row ${row.id}`}
            >
              {columns.map((column) => (
                <td key={column.key} role="cell">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericIssuesTable;
