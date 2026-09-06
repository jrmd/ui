"use client";
import { useState } from "react";
import {
  TaskList,
  TaskListItem,
  TaskListCheckbox,
  TaskListTitle,
  TaskListStatus,
} from "../../registry/blocks/task-list";

export default function TaskListExample() {
  const [tasks, setTasks] = useState([
    { id: "review", title: "Review the draft", status: "To do" },
    { id: "publish", title: "Publish the story", status: "To do" },
  ]);
  return (
    <TaskList value={tasks} onValueChange={setTasks}>
      {tasks.map((task) => (
        <TaskListItem key={task.id} taskId={task.id}>
          <TaskListTitle />
          <a href={`#${task.id}`} className="text-xs">
            Open
          </a>
          <TaskListStatus />
          <TaskListCheckbox />
        </TaskListItem>
      ))}
    </TaskList>
  );
}
