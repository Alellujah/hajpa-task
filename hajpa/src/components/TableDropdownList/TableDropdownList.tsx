import React from "react";
import "./TableDropdownList.css";

export interface TableDropdownListProps {
  text: string;
  onUpdateText: (text: string) => void;
  onBlurOut: () => void;
}

export const TableDropdownList: React.FC<TableDropdownListProps> = ({
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
