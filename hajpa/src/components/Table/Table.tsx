import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { normalizeString, usePrevious } from "../../helper/helper";
import { TableSearch } from "../TableSearch/TableSearch";
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
  onSearch: (resetData: boolean, filteredData: Array<T>) => void;
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
  const [OpenSearch, setOpenSearch] = useState<{
    open: boolean;
    key: string;
    coordenates: {
      x: number;
      y: number;
    };
  }>();
  const [SearchText, setSearchText] = useState<string>("");
  const filteredData: any[] = [];

  const filterData = (data: any, key: string, searchString: string) => {
    const filteredData: any[] = [];
    data.forEach((c: any) => {
      console.log("c", c);
      console.log("search", normalizeString(searchString));
      normalizeString(c[key]).includes(normalizeString(searchString)) &&
        filteredData.push(c);
    });
    console.log("filter", filteredData);
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
              coordenates: {
                x: 0,
                y: 0,
              },
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
  const prevCount = usePrevious(data);

  return (
    <>
      {/* {hasError && <span>Error: {handleErrors()}</span>} */}
      {OpenSearch && (
        <TableSearch
          text={SearchText}
          onUpdateText={(string) => {
            setSearchText(string);
            const resetData = string.length < SearchText.length;
            console.log("previous ", prevCount);
            onSearch(resetData, filterData(data, OpenSearch.key, string));
            // setPersons(
            //   Object.values(DummyData).filter((p) =>
            //     normalizeString(p.name).includes(normalizeString(string))
            //   )
            // );
            // const castAny = DummyData as any[];
            // const filteredPerson: Person[] = [];
            // castAny.forEach((c) => {
            //   normalizeString(c[OpenSearch.key]).includes(
            //     normalizeString(string)
            //   ) && filteredPerson.push(c[OpenSearch.key]);
            // });
            // console.log("filter", filteredPerson);
            // const result = _.pickBy(
            //   Object.values(DummyData),
            //   function (value, key) {
            //     console.log("key", key);
            //     console.log("value", value);
            //   }
            // );
            // console.log("lodash pick", result);
            // setPersons(_.filter(Persons, [OpenSearch?.key, string]));
          }}
        />
      )}
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
