import _ from "lodash";
import React from "react";
import "./TableSearch.css";

export interface TableSearchProps {
  text: string;
  onUpdateText: (text: string) => any;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  text,
  onUpdateText,
}) => {
  return (
    <input
      type="text"
      value={text}
      onChange={
        (e) => onUpdateText(e.target.value) //debounce
      }
    />
  );
};
