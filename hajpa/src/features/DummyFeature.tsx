import React, { useEffect, useState } from "react";
import { Table, TableAction } from "../components/Table/Table";
import { DummyData2 } from "./DummyData2";
import _ from "lodash";
import { TableSearch } from "../components/TableSearch/TableSearch";
import { normalizeString } from "../helper/helper";
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
  const [Persons, setPersons] = useState<DummyData2I[]>(DummyData2);
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

  const onSearch = (filteredData: DummyData2I[]) => {
    setPersons(filteredData);
  };

  const tableActions: TableAction<DummyData2I>[] = [
    {
      fn: (e, r) => console.log(`event ${e} row ${r.id} `),
      name: "Edit",
    },
    {
      fn: (e, r) => alert(`event ${e} row ${r.id} `),
      name: "Alert",
    },
  ];

  return (
    <>
      <Table<DummyData2I>
        onSearch={onSearch}
        onSort={onSort}
        data={Persons}
        resultsPerPage={5}
        tableActions={tableActions}
      />
    </>
  );
};
