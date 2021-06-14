import React, { useState } from "react";
import { Table, TableAction } from "../components/Table/Table";
import { DummyData2 } from "./DummyData2";
import { DummyDataPerson } from "./DummyData";
import _ from "lodash";
import { faExclamation, faTerminal } from "@fortawesome/free-solid-svg-icons";
interface Person {
  id: number;
  name: string;
  age: number;
}

interface DummyData2I {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  age: number;
}

type Direction = "ASC" | "DESC";

export const DummyFeature: React.FC<{}> = ({ ...props }) => {
  const [DummyData, setDummyData] = useState<DummyData2I[]>(DummyData2);
  const [Persons, setPersons] = useState<Person[]>(DummyDataPerson);

  const [SortByDirection, setSortByDirection] = useState<{
    key: string;
    direction: Direction;
  }>();

  const onSortDummyData = (key: string) => {
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
      ? setDummyData([..._.sortBy(DummyData, [key])])
      : setDummyData([..._.reverse(DummyData)]);
  };

  const onSortPersonData = (key: string) => {
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

  const onSearchDummyData = (filteredData: DummyData2I[]) => {
    setDummyData(filteredData);
  };
  const onSearchPerson = (filteredData: Person[]) => {
    setPersons(filteredData);
  };
  const tableActionsDummyData: TableAction<DummyData2I>[] = [
    {
      icon: faTerminal,
      fn: (e, r) => console.log(`event ${e} row id ${r.id} `),
      name: "Console.log",
    },
    {
      icon: faExclamation,
      fn: (e, r) => alert(`event ${e} row id ${r.id} `),
      name: "Alert",
    },
  ];
  const tableActionsPersonData: TableAction<Person>[] = [
    {
      icon: faTerminal,
      fn: (e, r) => console.log(`event ${e} row id ${r.id} `),
      name: "Console.log",
    },
    {
      icon: faExclamation,
      fn: (e, r) => alert(`event ${e} row id ${r.id} `),
      name: "Alert",
    },
  ];
  return (
    <>
      <h1>1st Table</h1>
      <Table<DummyData2I>
        onSearch={onSearchDummyData}
        onSort={onSortDummyData}
        data={DummyData}
        resultsPerPage={15}
        tableActions={tableActionsDummyData}
        mode={"light"}
      />
      <h1>2nd Table</h1>
      <Table<Person>
        onSearch={onSearchPerson}
        onSort={onSortPersonData}
        data={Persons}
        resultsPerPage={15}
        tableActions={tableActionsPersonData}
        mode={"dark"}
      />
    </>
  );
};
