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
    const btn = (
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
    index === 0 && elements.push(btn);
    index === actualPage - 1 && index !== 0 && elements.push(btn);
    index === actualPage && elements.push(btn);
    index === actualPage + 1 && elements.push(btn);
    index === numberOfPages - 1 && index !== 0 && elements.push(btn);
  }
  return numberOfPages === 1 ? null : (
    <span className={"pagination"}>{elements}</span>
  );
};
