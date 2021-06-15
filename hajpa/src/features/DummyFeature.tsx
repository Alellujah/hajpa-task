import React, { useState } from "react";
import { Table, TableAction } from "../components/Table/Table";
import { DummyData2 } from "./DummyData/DummyData2";
import { DummyAnimalData } from "./DummyData/DummyAnimalData";
import _ from "lodash";
import { faExclamation, faTerminal } from "@fortawesome/free-solid-svg-icons";
import "./DummyFeature.css";
interface IDummyAnimal {
  id: number;
  animal_scientific_name: string;
  color: string;
  bitcoin_address: string;
  phone_number: string;
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
  const [DummyAnimal, setDummyAnimal] = useState<IDummyAnimal[]>(
    DummyAnimalData
  );

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

  const onSortAnimalData = (key: string) => {
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
      ? setDummyAnimal([..._.sortBy(DummyAnimal, [key])])
      : setDummyAnimal([..._.reverse(DummyAnimal)]);
  };

  const onSearchDummyData = (filteredData: DummyData2I[]) => {
    setDummyData(filteredData);
  };

  const onSearchAnimal = (filteredData: IDummyAnimal[]) => {
    setDummyAnimal(filteredData);
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

  return (
    <div className="main-container">
      <div>
        <h1>Table w/ light mode and actions</h1>
        <Table<DummyData2I>
          onSearch={onSearchDummyData}
          onSort={onSortDummyData}
          data={DummyData}
          resultsPerPage={15}
          tableActions={tableActionsDummyData}
          mode={"light"}
          sortByEnum={{ keys: ["gender"] }}
        />
      </div>
      <div>
        <h1>Table w/ dark mode and no actions</h1>
        <Table<IDummyAnimal>
          onSearch={onSearchAnimal}
          onSort={onSortAnimalData}
          data={DummyAnimal}
          resultsPerPage={15}
          tableActions={[]}
          mode={"dark"}
          sortByEnum={{ keys: ["color"] }}
        />
      </div>
    </div>
  );
};
