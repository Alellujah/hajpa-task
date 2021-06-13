import _ from "lodash";
import React, { useState } from "react";
import "./TableFilter.css";

export interface TableFilterProps {
  ObjectKeys: string[];
  ActiveFilters: string[];
  setNewFilters: (newFilters: string[]) => void;
}

export const TableFilter: React.FC<TableFilterProps> = ({
  ObjectKeys,
  ActiveFilters,
  setNewFilters,
}) => {
  const filters = ObjectKeys.map((h, i) => (
    <>
      <input
        type="checkbox"
        name={h}
        key={h + i}
        // fixed checked
        onChange={() => {
          setNewFilters(
            ActiveFilters.includes(h)
              ? [...ActiveFilters.filter((a) => a !== h)]
              : [...ActiveFilters, h]
          );
        }}
      />
      <label htmlFor={h}>{_.startCase(h)}</label>
    </>
  ));
  return <>{filters}</>;
};
