import _ from "lodash";
import React from "react";
import "./TableDropdownList.css";

export interface TableDropdownListProps {
  defaultValue: string;
  list: string[];
  onPickValue: (text: string) => void;
  onBlurOut: () => void;
}

export const TableDropdownList: React.FC<TableDropdownListProps> = ({
  defaultValue,
  list,
  onPickValue,
  onBlurOut,
}) => {
  const options = list.map((s, i) => (
    <option key={i} value={s}>
      {s}
    </option>
  ));

  return (
    <>
      <select
        id="selectDropdown"
        key={"select"}
        autoFocus={true}
        placeholder="Select"
        onBlur={() => onBlurOut()}
        className="table-search-dropdown"
        onChange={
          (e) => onPickValue(e.target.value) //debounce
        }
      >
        <option disabled selected defaultValue={defaultValue}>
          {_.startCase(defaultValue)}
        </option>
        {options}
      </select>
    </>
  );
};
