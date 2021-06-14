import React from "react";
import "./TableDropdownList.css";

export interface TableDropdownListProps {
  list: string[];
  onPickValue: (text: string) => void;
  onBlurOut: () => void;
}

export const TableDropdownList: React.FC<TableDropdownListProps> = ({
  list,
  onPickValue,
  onBlurOut,
}) => {
  console.log("list", list);
  const options = list.map((s, i) => (
    <input
      key={i}
      autoFocus={true}
      onBlur={() => onBlurOut()}
      className="table-search"
      type="text"
      value={s}
      onChange={
        (e) => onPickValue(e.target.value) //debounce
      }
    />
  ));

  return <>{options}</>;
};
