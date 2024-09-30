"use client";

import { Chip, Select, Button } from "@mantine/core";
import React from "react";
import { useState } from "react";

// This is the main component for the example page. The main component has "export default" in front of it.
export default function ExamplePage() {
  const [listItems, setListItems] = useState([]);

  return (
    <div className="flex flex-col w-lvw h-lvh">
      <TopBar />
      <div className="flex flex-row h-full">
        <SideBar listItems={listItems} setListItems={setListItems} />
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-slate-500">
          <div className="p-8 text-slate-600">This is an example page for {"Joe's"} to-do list.</div>

          <ListItems listItems={listItems} setListItems={setListItems} />
          <Button
            className="p-2"
            color="blue"
            onClick={() => {
              setListItems((prev) => [...prev, { id: prev.length, type: "Task", completed: false }]);
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return <div className="w-full h-10 bg-slate-300 shadow-xl z-10">This is the TopBar</div>;
}

function SideBar({ listItems, setlistItems }) {
  return (
    <div className="flex flex-col w-60 h-full gap-1 bg-slate-200 z-5">
      This is the sidebar
      {listItems?.map((item) => {
        let bg_color = "bg-yellow-100";
        if (item.completed) {
          bg_color = "bg-green-100";
        }
        return (
          <div key={item.id} className={`p-1 flex flex-col shadow shadow-lg bg-slate-100 rounded-sm ${bg_color}`}>
            <p>
              {item.type}{" "}
              {item.completed ? (
                <div className="text-green-600">complete</div>
              ) : (
                <div className="text-yellow-600">in progress</div>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
// ListItem is a react component that the main component uses
function ListItems({ listItems, setListItems }) {
  return (
    <div className="flex flex-col space-y-2">
      {listItems?.map((item) => (
        <div key={item.id} className="flex flex-row space-x-1 p-1 items-center">
          <Chip
            checked={item.completed}
            onChange={() => {
              setListItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, completed: !i.completed } : i)));
            }}
          >
            Completed
          </Chip>
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
