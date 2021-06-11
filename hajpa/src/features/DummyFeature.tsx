import React, { useState } from "react";
import { Table } from "../components/Table/Table";
import { DummyData } from "./DummyData";
import _ from "lodash";
interface Person {
  id: number;
  name: string;
  age: number;
}

type Direction = "ASC" | "DESC";

export const DummyFeature: React.FC<{}> = ({ ...props }) => {
  const [Persons, setPersons] = useState<Person[]>(DummyData);
  const [SortByDirection, setSortByDirection] = useState<{
    key: string;
    direction: Direction;
  }>();

  const onSort = (key: string) => {
    const sortBy: { key: string; direction: Direction } = {
      key,
      direction:
        SortByDirection?.direction === "ASC" && key === SortByDirection.key
          ? "DESC"
          : SortByDirection?.direction === "DESC" && key === SortByDirection.key
          ? "ASC"
          : "ASC",
    };
    setSortByDirection(sortBy);
    sortBy.direction === "ASC"
      ? setPersons([..._.sortBy(Persons, [key])])
      : setPersons([..._.reverse(Persons)]);
  };

  const onSearch = () => {};
  const onFilterByKey = () => {};
  return (
    <Table<Person>
      onFilterByKey={onFilterByKey}
      onSearch={onSearch}
      onSort={onSort}
      data={Persons}
      resultsPerPage={15}
      tableActions={[]}
    />
  );
};
