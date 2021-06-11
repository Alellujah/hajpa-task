import React, { useState } from "react";
import { Table } from "../components/Table/Table";
import { DummyData } from "./DummyData";
import _ from "lodash";
import { TableSearch } from "../components/TableSearch/TableSearch";
interface Person {
  id: number;
  name: string;
  age: number;
}

type Direction = "ASC" | "DESC";

export const DummyFeature: React.FC<{}> = ({ ...props }) => {
  const [Persons, setPersons] = useState<Person[]>(DummyData);
  const [OpenSearch, setOpenSearch] = useState<{
    open: boolean;
    key: string;
  }>();
  const [SearchText, setSearchText] = useState<string>("");
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

  const onSearch = (key: string) => {
    setOpenSearch({ open: true, key });
    console.log(_.filter(Persons, [OpenSearch?.key, SearchText]));
    console.log("search key", key);
  };

  return (
    <>
      {OpenSearch && (
        <TableSearch
          text={SearchText}
          onUpdateText={(string) => {
            setSearchText(string);
            console.log("key", OpenSearch?.key);
            console.log("string", string);
            console.log(
              "filter",
              Object.values(Persons).filter((p) => p.name.includes(string))
            );
            setPersons(
              Object.values(DummyData).filter((p) =>
                p.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .includes(
                    string
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                  )
              )
            );
            // setPersons(_.filter(Persons, [OpenSearch?.key, string]));
          }}
        />
      )}
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
