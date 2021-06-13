import React from "react";
import "./TablePagination.css";

export interface TablePaginationProps {
  dataSize: number;
  resultsPerPage: number;
  actualPage: (pageNumber: number) => void;
  showRecordsFrom: (number: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  dataSize,
  resultsPerPage,
  actualPage,
  showRecordsFrom,
}) => {
  const numberOfPages = Math.ceil(dataSize / resultsPerPage);
  const elements = [];
  for (let index = 0; index < numberOfPages; index++) {
    elements.push(
      <button
        key={`footer ${index}`}
        onClick={() => {
          actualPage(index + 1);
          showRecordsFrom(index * resultsPerPage);
        }}
      >
        {index + 1}
      </button>
    );
  }
  return <>{elements}</>;
};
