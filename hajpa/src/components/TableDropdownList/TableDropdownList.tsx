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
    <option key={i} value={s}>
      {s}
    </option>
  ));

  return (
    <>
      <select
        key={"select"}
        autoFocus={true}
        placeholder="Select"
        onBlur={() => onBlurOut()}
        className="table-search"
        onChange={
          (e) => onPickValue(e.target.value) //debounce
        }
      >
        <option disabled selected defaultValue={""}>
          Select
        </option>
        {options}
      </select>
    </>
  );
};
