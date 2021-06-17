import { Story, Meta } from "@storybook/react";
import { Table, TableProps } from "./Table";

interface Person {
  id: number;
  name: string;
  age: number;
}

interface Persons {
  persons: Person[];
  totalResults: number;
}

const dummyResults: Persons = {
  totalResults: 20,
  persons: [
    { id: 1, age: 24, name: "Sérgio" },
    { id: 2, age: 30, name: "Fábio" },
    { id: 3, age: 40, name: "José" },
    { id: 4, age: 52, name: "João" },
    { id: 5, age: 25, name: "Hugo" },
    { id: 6, age: 18, name: "Afonso" },
  ],
};

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    data: { control: "array" },
  },
} as Meta;

const Template: Story<TableProps<Person>> = (args) => (
  <Table<Person> {...args} />
);

export const WithData = Template.bind({});
WithData.args = {
  data: dummyResults.persons,
  resultsPerPage: dummyResults.totalResults,
  tableActions: [
    {
      fn: (e, r) => console.log(`event ${e.currentTarget} row ${r.name} `),
      name: "Edit",
    },
    {
      fn: (e, r) => alert(`event ${e.currentTarget} row ${r.name} `),
      name: "Alert",
    },
  ],
  onSort: (key) => console.log("sort by", key),
  onSearch: (key) => console.log("search by", key),
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  resultsPerPage: 0,
  tableActions: [],
};
