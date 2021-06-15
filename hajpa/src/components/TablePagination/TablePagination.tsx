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
  const span = <span>...</span>;
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
    if (index === 0) {
      //first page

      elements.push(btn);
    } else if (index === numberOfPages - 1) {
      //last page
      elements.push(btn);
    } else if (index === actualPage - 1) {
      //actual page selected
      elements.push(btn);
    } else if (
      index === actualPage - 2 &&
      index !== 0 &&
      index !== numberOfPages - 1
    ) {
      //previous page
      index === 1 ? elements.push(btn) : elements.push(span, btn);
    } else if (
      index === actualPage &&
      index !== 0 &&
      index !== numberOfPages - 1
    ) {
      //next page
      index === numberOfPages - 3
        ? elements.push(btn)
        : elements.push(btn, span);
    }
  }
  //   else if(index === actualPage + 2 )
  //   index === actualPage - 1 && index !== 0 && elements.push(btn);
  //   index === actualPage && elements.push(btn);
  //   // index === actualPage + 1 && index !== numberOfPages && elements.push(btn);
  //   index === numberOfPages - 1 &&
  //     actualPage !== numberOfPages - 1 &&
  //     elements.push(btn);
  // }
  //initial page - 0
  //actual page - 1 previous
  //actual page
  //actual page + 1 next
  //last page - numberOfPages

  return numberOfPages === 1 ? null : (
    <span className={"pagination"}>{elements}</span>
  );
};
