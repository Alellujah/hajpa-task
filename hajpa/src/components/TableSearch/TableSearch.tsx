import React from "react";
import "./TableSearch.css";

export interface TableSearchProps {
  text: string;
  onUpdateText: (text: string) => void;
  onBlurOut: () => void;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  text,
  onUpdateText,
  onBlurOut,
}) => {
  return (
    <input
      autoFocus={true}
      onBlur={() => onBlurOut()}
      className="table-search"
      type="text"
      value={text}
      onChange={
        (e) => onUpdateText(e.target.value) //debounce
      }
    />
  );
};
