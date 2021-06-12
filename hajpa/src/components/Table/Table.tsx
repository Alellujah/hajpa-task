import _ from "lodash";
import React, { useState } from "react";
import { normalizeString } from "../../helper/helper";
import { TableSearch } from "../TableSearch/TableSearch";
import "./Table.css";

export interface TableAction<T> {
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
  tableActions: TableAction<T>[];
  onSort: (key: string) => void;
  onSearch: (filteredData: Array<T>) => void;
}

/**
 * Primary UI component for user interaction
 */
type SortByType = "string" | "number" | null;

export const Table: <T>(
  props: TableProps<T>
) => React.ReactElement<TableProps<T>> = ({ ...props }) => {
  const { data, tableActions, resultsPerPage, onSort, onSearch } = props;
  const [ActiveFilters, setActiveFilters] = useState<string[]>([]);
  const [OpenSearch, setOpenSearch] = useState<{
    open: boolean;
    key: string;
  }>();
  const [SearchText, setSearchText] = useState<string>("");
  const [OriginalData] = useState(data);
  const [PageNumber, setPageNumber] = useState(0);
  const [ShowRecordsFrom, setShowRecordsFrom] = useState(0);

  const filterData = (data: any, key: string, searchString: string) => {
    const filteredData: any[] = [];
    data.forEach((c: any) => {
      normalizeString(c[key]).includes(normalizeString(searchString)) &&
        filteredData.push(c);
    });
    return filteredData;
  };

  const sortBy = (key: string, type: SortByType) => {
    return type ? (
      type === "string" ? (
        <button
          onClick={(e) => {
            setOpenSearch({
              open: true,
              key: key,
            });
          }}
        >
          Search
        </button>
      ) : type === "number" ? (
        <button onClick={() => onSort(key)}>Sort</button>
      ) : null
    ) : null;
  };

  const typeOfAttribute = (index: number) => {
    const attribute = Object.entries(Object.values(OriginalData)[0])[index][1];
    return typeof attribute === "number"
      ? "number"
      : typeof attribute === "string"
      ? "string"
      : null;
  };

  const objectKeys =
    OriginalData.length > 0
      ? Object.keys(OriginalData[0]).map((k) => String(k))
      : [];

  const tableHeaders =
    OriginalData.length > 0 ? (
      <>
        {objectKeys.map(
          (k, i) =>
            !ActiveFilters.includes(k) && (
              <th key={i}>
                {String(k)} {sortBy(k, typeOfAttribute(i))}
                {OpenSearch && OpenSearch.key === k && (
                  <TableSearch
                    key={k}
                    text={SearchText}
                    onUpdateText={(string) => {
                      setSearchText(string);
                      onSearch(
                        filterData(OriginalData, OpenSearch.key, string)
                      );
                      setPageNumber(1);
                      setShowRecordsFrom(0);
                    }}
                  />
                )}
              </th>
            )
        )}
        {tableActions.length > 0 && <th key={"actions"}>Actions</th>}
      </>
    ) : null;

  const tableBody = Object.values(
    data.slice(ShowRecordsFrom, ShowRecordsFrom + resultsPerPage)
  ).map((v, i) => {
    return (
      <tr key={`row ${i}`}>
        {Object.values(v).map((kv, i) => {
          return (
            !ActiveFilters.includes(Object.keys(v)[i]) && (
              <td key={`row value ${i}`}>{String(kv)}</td>
            )
          );
        })}
        {tableActions.length > 0 && (
          <td key={`actions ${i}`}>
            {tableActions.map((action, i) => {
              return (
                <button
                  key={`action btn ${i}`}
                  onClick={(e) => action.fn(e, v)}
                >
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
          // fixed checked
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

  const pagination = () => {
    const elements = [];
    const numberOfPages = Math.ceil(data.length / resultsPerPage);
    for (let index = 0; index < numberOfPages; index++) {
      elements.push(
        <button
          onClick={() => {
            setPageNumber(index + 1);
            setShowRecordsFrom(index * resultsPerPage);
          }}
        >
          {index + 1}
        </button>
      );
    }
    return elements;
  };

  return (
    <>
      {/* {hasError && <span>Error: {handleErrors()}</span>} */}

      {OriginalData.length > 0 ? (
        <>
          <div>Filters by {filters}</div>
          <table className="table">
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{data.length > 0 ? tableBody : "Nothing found"}</tbody>
            <tfoot>
              Pagination - Showing {resultsPerPage} of {OriginalData.length}
              <br />
              actual page {PageNumber}
              {pagination().map((b) => b)}
            </tfoot>
          </table>
        </>
      ) : (
        <div>No data!</div>
      )}
    </>
  );
};
