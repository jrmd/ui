"use client";
import {
  KanbanBoard,
  KanbanBoardComposer,
  KanbanBoardColumns,
  KanbanBoardFooter,
  KanbanBoardStatus,
} from "../../registry/blocks/kanban-board";

export default function Example() {
  return (
    <KanbanBoard>
      <KanbanBoardComposer />
      <KanbanBoardColumns />
      <KanbanBoardFooter />
      <KanbanBoardStatus />
    </KanbanBoard>
  );
}
