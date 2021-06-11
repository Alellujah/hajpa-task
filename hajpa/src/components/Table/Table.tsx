import React, { useEffect, useState } from "react";
import "./Table.css";

interface TableAction<T> {
  fn: (e: React.MouseEvent<any, MouseEvent>, r: T) => void;
  name: string;
  icon?: string;
}

export interface TableProps<T> {
  /**
   * Data array passed to the table
   */
  data: Array<T>;
  resultsPerPage: number;
  sortable?: boolean;
  tableActions: TableAction<T>[];
  onSort: (key: string) => void;
  onSearch: (key: string) => void;
}

/**
 * Primary UI component for user interaction
 */
type SortByType = "string" | "number" | null;

export const Table: <T>(
  props: TableProps<T>
) => React.ReactElement<TableProps<T>> = ({ ...props }) => {
  const { data, tableActions, onSort, onSearch } = props;
  const [ActiveFilters, setActiveFilters] = useState<string[]>([]);

  const sortBy = (key: string, type: SortByType) => {
    return type ? (
      type === "string" ? (
        <button onClick={() => onSearch(key)}>Search</button>
      ) : type === "number" ? (
        <button onClick={() => onSort(key)}>Sort</button>
      ) : null
    ) : null;
  };

  const typeOfAttribute = (index: number) => {
    const attribute = Object.entries(Object.values(data)[0])[index][1];
    return typeof attribute === "number"
      ? "number"
      : typeof attribute === "string"
      ? "string"
      : null;
  };

  const objectKeys =
    data.length > 0 ? Object.keys(data[0]).map((k) => String(k)) : [];

  const tableHeaders =
    data.length > 0 ? (
      <>
        {objectKeys.map(
          (k, i) =>
            !ActiveFilters.includes(k) && (
              <th key={i}>
                {String(k)} {sortBy(k, typeOfAttribute(i))}
              </th>
            )
        )}
        {tableActions.length > 0 && <th key={"actions"}>Actions</th>}
      </>
    ) : null;

  const tableBody = Object.values(data).map((v, i) => {
    return (
      <tr key={i}>
        {Object.values(v).map((kv, i) => {
          return (
            !ActiveFilters.includes(Object.keys(v)[i]) && (
              <td key={i}>{String(kv)}</td>
            )
          );
        })}
        {tableActions.length > 0 && (
          <td key={i + 1}>
            {tableActions.map((action, index) => {
              return (
                <button key={i + 2} onClick={(e) => action.fn(e, v)}>
                  {action.name}
                </button>
              );
            })}
          </td>
        )}
      </tr>
    );
  });

  const filters =
    objectKeys &&
    objectKeys.map((h, i) => (
      <>
        <input
          type="checkbox"
          name={h}
          key={i}
          onChange={() => {
            setActiveFilters(
              ActiveFilters.includes(h)
                ? [...ActiveFilters.filter((a) => a !== h)]
                : [...ActiveFilters, h]
            );
          }}
        />

        <label htmlFor={h}>{h}</label>
      </>
    ));

  return (
    <>
      {/* {hasError && <span>Error: {handleErrors()}</span>} */}
      {data.length > 0 ? (
        <>
          <div>Filters by {filters}</div>
          <table>
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </>
      ) : (
        <div>No data!</div>
      )}
    </>
  );
};
