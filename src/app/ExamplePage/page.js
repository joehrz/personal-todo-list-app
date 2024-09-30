"use client";

import { Chip, Select, Button } from "@mantine/core";
import React from "react";
import { useState } from "react";

// This is the main component for the example page. The main component has "export default" in front of it.
export default function ExamplePage() {
  const [listItems, setListItems] = useState([]);

  return (
    <div className="w-lvw h-lvh flex flex-col items-center justify-center space-y-4 bg-slate-400">
      <div className="p-8 text-slate-600">This is an example page for {"Joe's"} to-do list.</div>

      <ListItem listItems={listItems} setListItems={setListItems} />
      <Button
        className="p-2"
        color="blue"
        onClick={() => {
          setListItems((prev) => [...prev, { id: prev.length, type: "Task" }]);
        }}
      >
        Add Task
      </Button>
    </div>
  );
}

// ListItem is a react component that the main component uses
function ListItem({ listItems, setListItems }) {
  return (
    <div className="flex flex-col space-y-2">
      {listItems.map((item) => (
        <div key={item.id} className="flex flex-row space-x-1 p-1 items-center">
          <Chip>Completed</Chip>
          <Select
            placeholder="Task Type"
            data={["Task", "Event", "Note"]}
            value={item?.type}
            onChange={(value) => {
              setListItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, type: value } : i)));
            }}
          />

          <Button
            color="red"
            onClick={() => {
              setListItems((prev) => prev.filter((i) => i.id !== item.id));
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
