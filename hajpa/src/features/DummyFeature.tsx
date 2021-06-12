import React, { useEffect, useState } from "react";
import { Table } from "../components/Table/Table";
import { DummyData } from "./DummyData";
import _ from "lodash";
import { TableSearch } from "../components/TableSearch/TableSearch";
import { normalizeString } from "../helper/helper";
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

  useEffect(() => {
    console.log("person", Persons);
  }, [Persons]);

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

  const onSearch = (resetData: boolean, filteredData: Person[]) => {
    const previousState = Persons;
    console.log("prev", filteredData);
    console.log("new", filteredData);
    // resetData ? setPersons(DummyData) : setPersons(filteredData);
  };

  return (
    <>
      <Table<Person>
        onSearch={onSearch}
        onSort={onSort}
        data={Persons}
        resultsPerPage={15}
        tableActions={[]}
      />
    </>
  );
};
