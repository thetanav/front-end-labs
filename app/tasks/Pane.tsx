"use client";

import { GripVertical } from "lucide-react"
import { useState } from "react";

interface BoardItem {
  title: string,
  tasks: string[]
}

const data = [{ title: "Todo", tasks: ["1hello", "2hello", "3hello"] },
{ title: "Doing", tasks: ["4hello", "5hello", "6hello"] },
{ title: "Planned", tasks: ["7hello", "8hello", "9hello"] }]

export default function Board() {
  const [board, setBoard] = useState<BoardItem[]>(data)
  const [meta, setMeta] = useState({
    task: "",
    from: "",
    to: ""
  })

  return (
    <div className="flex gap-2 mt-10">
      {board.map(i => (
        <Pane title={i.title} tasks={i.tasks} mutate={setBoard} setMeta={setMeta} meta={meta} setBoard={setBoard} board={board} />
      ))}
    </div>
  )
}

function Pane({ title, tasks, mutate, setMeta, meta, setBoard, board }: any) {
  return (
    <div
      className="rounded-md border min-h-72 w-56 p-2"
      onDragOver={(e) => {
        e.preventDefault();
        setMeta({ ...meta, to: title });
      }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="space-y-2">
        {tasks.map((t: string) => (
          <Card key={t} text={t} setMeta={setMeta} meta={meta} setBoard={setBoard} board={board} />
        ))}
        <div className="opacity-30">
          {meta.to == title && <Card text={meta.task} />}
        </div>
      </div>
    </ div >
  )
}

function Card({ text, setMeta, meta, setBoard, board }: any) {
  return (
    <div
      className="rounded-md border p-2 flex items-center bg-background active:cursor-grabbing cursor-grab hover:shadow-sm"
      draggable
      onDragStart={() => {
        // Find which pane this card belongs to
        const sourcePane = board.find((b: BoardItem) => b.tasks.includes(text));
        if (sourcePane) {
          setMeta({ ...meta, task: text, from: sourcePane.title });
        }
      }}
      onDragEnd={() => {
        // move the card
        if (meta.from && meta.to && meta.task && meta.from != meta.to) {
          setBoard((prevBoard: BoardItem[]) => {
            return prevBoard.map((item) => {
              if (item.title === meta.from) {
                // Remove task from source pane
                return {
                  ...item,
                  tasks: item.tasks.filter((t) => t !== meta.task),
                };
              }
              if (item.title === meta.to) {
                // Add task to destination pane
                return {
                  ...item,
                  tasks: [...item.tasks, meta.task],
                };
              }
              return item;
            });
          });
        }
        // clear meta data
        setMeta({
          task: "",
          from: "",
          to: "",
        });
      }}
    >
      <GripVertical className="opacity-40 h-4" />
      <h3 className="font-semibold text-lg">{text}</h3>
    </div >
  )
}