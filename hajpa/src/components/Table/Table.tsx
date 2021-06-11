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
  onFilterByKey: (key: string) => void;
}

/**
 * Primary UI component for user interaction
 */
type SortByType = "string" | "number" | null;

export const Table: <T>(
  props: TableProps<T>
) => React.ReactElement<TableProps<T>> = ({ ...props }) => {
  const { data, tableActions, onSort, onSearch, onFilterByKey } = props;

  //   const isDataAllEqual = () => {
  //     return data.every((d) => data[0] === d);
  //   };

  //   const handleErrors = () => {
  //     if (!isDataAllEqual()) {
  //       setError(true);
  //       throw new Error("Data objects are different!");
  //     }
  //   };

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
        {objectKeys.map((k, i) => (
          <th>
            {String(k)} {sortBy(k, typeOfAttribute(i))}
          </th>
        ))}
        {tableActions.length > 0 && <th>Actions</th>}
      </>
    ) : null;

  const tableBody = Object.values(data).map((v) => {
    return (
      <tr>
        {Object.values(v).map((kv) => (
          <td>{String(kv)}</td>
        ))}
        {tableActions.length > 0 && (
          <td>
            {tableActions.map((action) => {
              return (
                <button onClick={(e) => action.fn(e, v)}>{action.name}</button>
              );
            })}
          </td>
        )}
      </tr>
    );
  });

  //   const keyToApplyFilter = (
  //     event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ) => {
  //     return event.currentTarget.innerHTML.replace(/(<([^>]+)>)/gi, "");
  //   };

  const filters =
    objectKeys &&
    objectKeys.map((h) => (
      <button onClick={() => onFilterByKey(h)}>{h}</button>
    ));

  return (
    <>
      {/* {hasError && <span>Error: {handleErrors()}</span>} */}
      {data.length > 0 ? (
        <>
          <div>Filters by {filters}</div>
          <table>
            {tableHeaders}
            <tbody>{tableBody}</tbody>
          </table>
        </>
      ) : (
        <div>No data!</div>
      )}
    </>
  );
};
