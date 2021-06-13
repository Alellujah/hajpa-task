import React from "react";
import "./TablePagination.css";

export interface TablePaginationProps {
  dataSize: number;
  resultsPerPage: number;
  actualPage: number;
  newPage: (pageNumber: number) => void;
  showRecordsFrom: (number: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  dataSize,
  resultsPerPage,
  actualPage,
  newPage,
  showRecordsFrom,
}) => {
  const numberOfPages = Math.ceil(dataSize / resultsPerPage);
  const elements = [];
  for (let index = 0; index < numberOfPages; index++) {
    elements.push(
      <button
        className={actualPage === index + 1 ? "active" : undefined}
        key={`footer ${index}`}
        onClick={() => {
          newPage(index + 1);
          showRecordsFrom(index * resultsPerPage);
        }}
      >
        {index + 1}
      </button>
    );
  }
  return numberOfPages === 1 ? null : (
    <span className={"pagination"}>{elements}</span>
  );
};
