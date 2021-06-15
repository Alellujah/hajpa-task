import _ from "lodash";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { normalizeString } from "../../helper/helper";
import { TableFilter } from "../TableFilter/TableFilter";
import { TablePagination } from "../TablePagination/TablePagination";
import { TableSearch } from "../TableSearch/TableSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TableDropdownList } from "../TableDropdownList/TableDropdownList";

export interface TableAction<T> {
  fn: (e: React.MouseEvent<any, MouseEvent>, r: T) => void;
  name: string;
  icon?: IconProp;
}
export interface SortByEnum {
  keys: string[];
}

type Mode = "dark" | "light";

export interface TableProps<T> {
  /**
   * Data array passed to the table
   */
  data: Array<T>;
  mode?: Mode;
  resultsPerPage: number;
  tableActions: TableAction<T>[];
  sortByEnum?: SortByEnum;
  style?: CSSProperties;
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
  const {
    data,
    tableActions,
    resultsPerPage,
    mode,
    sortByEnum,
    style,
    onSort,
    onSearch,
  } = props;
  const [ActiveFilters, setActiveFilters] = useState<string[]>([]);
  const [OpenSearch, setOpenSearch] = useState<{
    open: boolean;
    key: string;
  }>();
  const [OpenDropdown, setOpenDropdown] = useState<{
    open: boolean;
    key: string;
  }>();
  const [SearchText, setSearchText] = useState<string>("");
  const [OriginalData] = useState(data);
  const [PageNumber, setPageNumber] = useState(1);
  const [ShowRecordsFrom, setShowRecordsFrom] = useState(0);
  const [useDisplayBlock, setDisplayBlock] = useState<boolean>();
  const containerRef = useRef<HTMLDivElement>(null);
  const tableHeadRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    function handleResize() {
      tableHeadRef.current &&
        containerRef.current &&
        setDisplayBlock(
          tableHeadRef.current.clientWidth > containerRef.current.clientWidth
            ? true
            : false
        );
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filterData = (
    data: any,
    key: string,
    searchString: string,
    select?: boolean
  ) => {
    const filteredData: any[] = [];
    data.forEach((c: any) => {
      !select &&
        normalizeString(c[key]).includes(normalizeString(searchString)) &&
        filteredData.push(c);
      select && c[key] === searchString && filteredData.push(c);
    });
    return filteredData;
  };

  const sortBy = (key: string, type: SortByType) => {
    return type ? (
      type === "string" && !sortByEnum?.keys.includes(key) ? (
        <button
          className="table-header-icon"
          onClick={(e) => {
            setOpenSearch({
              open: OpenSearch?.open ? !OpenSearch.open : true,
              key: key,
            });
          }}
        >
          <FontAwesomeIcon color={"#0683f9"} icon={faSearch} />
        </button>
      ) : type === "number" ? (
        <button
          className="table-header-icon"
          onClick={() => {
            onSort(key);
            setPageNumber(1); //maybe we should sort only visible results...
            setShowRecordsFrom(0);
          }}
        >
          <FontAwesomeIcon color={"#0683f9"} icon={faSort} />
        </button>
      ) : sortByEnum?.keys.includes(key) ? (
        <button
          className="table-header-icon"
          onClick={() => {
            setOpenDropdown({ open: true, key });
            console.log("click open", OpenDropdown);
          }}
        >
          <FontAwesomeIcon color={"#0683f9"} icon={faCaretDown} />
        </button>
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
                {_.startCase(String(k))} {sortBy(k, typeOfAttribute(i))}
                {OpenSearch && OpenSearch.key === k && (
                  <TableSearch
                    key={k}
                    text={SearchText}
                    onBlurOut={() => {
                      setOpenSearch({
                        key: "",
                        open: false,
                      });
                      setSearchText("");
                    }}
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
                {OpenDropdown && OpenDropdown.key === k && (
                  <TableDropdownList
                    key={k}
                    list={_.uniqBy(OriginalData, k).map(
                      (v: any) => v[OpenDropdown.key]
                    )}
                    onBlurOut={() => {
                      setOpenDropdown({
                        key: "",
                        open: false,
                      });
                      setSearchText("");
                    }}
                    onPickValue={(string) => {
                      setSearchText(string);
                      onSearch(
                        filterData(OriginalData, OpenDropdown.key, string, true)
                      );
                      setPageNumber(1);
                      setShowRecordsFrom(0);
                    }}
                  />
                )}
              </th>
            )
        )}
        {tableActions.length > 0 && (
          <th className={"actions"} key={"actions"}>
            Actions
          </th>
        )}
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
          <td className={"actions"} key={`actions ${i}`}>
            {tableActions.map((action, i) => {
              return (
                <button
                  key={`action btn ${i}`}
                  onClick={(e) => action.fn(e, v)}
                >
                  {action.icon && (
                    <FontAwesomeIcon
                      style={{ marginRight: ".5rem" }}
                      icon={action.icon}
                      color={"#0683f9"}
                    />
                  )}
                  {action.name}
                </button>
              );
            })}
          </td>
        )}
      </tr>
    );
  });

  return (
    <>
      {OriginalData.length > 0 ? (
        <div className="container" style={style} ref={containerRef}>
          <TableFilter
            ObjectKeys={objectKeys}
            ActiveFilters={ActiveFilters}
            setNewFilters={setActiveFilters}
          />
          {/* {SearchText.length > 0 && (
            <span>
              Active filter: {OpenSearch?.key} - {SearchText}
            </span>
          )} */}
          <table
            style={useDisplayBlock ? { display: "inline-block" } : undefined}
            className={`table ${mode === "dark" ? "dark" : "light"}`}
          >
            <thead ref={tableHeadRef}>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                tableBody
              ) : (
                <tr>
                  <td align="center" colSpan={objectKeys.length}>
                    <span>Nothing found - </span>
                    <span
                      className="clear-filters"
                      onClick={() => onSearch(OriginalData)}
                    >
                      Clear filters
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <TablePagination
            dataSize={data.length}
            resultsPerPage={resultsPerPage}
            newPage={setPageNumber}
            actualPage={PageNumber}
            showRecordsFrom={setShowRecordsFrom}
          />
          <div className="total-results">
            Showing{" "}
            {
              data.slice(ShowRecordsFrom, ShowRecordsFrom + resultsPerPage)
                .length
            }{" "}
            out of {OriginalData.length}
          </div>
        </div>
      ) : (
        <div>No data!</div>
      )}
    </>
  );
};
