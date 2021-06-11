import React from "react";
import { Table } from "../components/Table/Table";

interface Person {
  id: number;
  name: string;
  age: number;
}
export const DummyFeature: React.FC<{}> = ({ ...props }) => {
  const Persons: Person[] = [
    {
      age: 10,
      id: 1,
      name: "Tomás",
    },
  ];
  return <Table<Person> data={Persons} resultsPerPage={15} tableActions={[]} />;
};
