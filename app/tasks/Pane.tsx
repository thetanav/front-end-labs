"use client";

import { GripVertical } from "lucide-react"
import { useState } from "react";
// import nanoid from nanoid;
import { boardData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Board = {
  columns: {
    id: string
    title: string
    taskIds: string[]
  }[]
  tasks: Record<string, { id: string; title: string }>
}

export default function Board() {
  // @ts-ignore
  const [board, setBoard] = useState<Board>(boardData)
  const [meta, setMeta] = useState({
    task: "",
    from: "",
    to: "",
    dropIndex: -1
  })

  return (
    <div className="flex gap-2 mt-10 select-none">
      {board.columns.map(i => (
        <div
          key={i.id}
          className="rounded-md border min-h-72 w-56 p-2"
          onDragOver={(e) => {
            e.preventDefault();
            if (meta.from !== i.id) {
              // Only update if moving to different column
              setMeta({ ...meta, to: i.id, dropIndex: i.taskIds.length });
            }
          }}
        >
          <h2 className="text-xl font-bold">{i.title}</h2>
          <div className="space-y-2">
            {i.taskIds.map((t, index) => {
              const isDragging = meta.task === t && meta.from === i.id;
              const showGhostBefore = meta.to === i.id && meta.dropIndex === index && meta.task && (meta.from !== meta.to || !isDragging);
              return (
                <div key={t}>
                  {/* Ghost card preview before this position */}
                  {showGhostBefore && (
                    <div className="rounded-md border p-2 flex items-center bg-background opacity-60 border-dashed mb-2">
                      <GripVertical className="opacity-40 h-4" />
                      <h3 className="text-sm">{board.tasks[meta.task]?.title}</h3>
                    </div>
                  )}
                  <div
                    className={`rounded-md border p-2 flex items-center bg-background active:cursor-grabbing cursor-grab hover:shadow-sm ${isDragging ? "opacity-50" : ""
                      }`}
                    draggable
                    onDragStart={() => {
                      setMeta({ ...meta, task: board.tasks[t].id, from: i.id, dropIndex: index })
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (i.id === meta.from) {
                        // Reordering within same column
                        setMeta({ ...meta, to: i.id, dropIndex: index });
                      } else {
                        // Moving to different column - insert at this position
                        setMeta({ ...meta, to: i.id, dropIndex: index });
                      }
                    }}
                    onDragEnd={() => {
                      if (meta.from && meta.to && meta.task && meta.dropIndex >= 0) {
                        setBoard(prev => {
                          return {
                            ...prev,
                            columns: prev.columns.map((item) => {
                              if (item.id === meta.from && item.id === meta.to) {
                                // Reordering within the same column
                                const taskIds = [...item.taskIds];
                                const currentIndex = taskIds.indexOf(meta.task);
                                taskIds.splice(currentIndex, 1);
                                // Adjust drop index if moving down
                                const adjustedIndex = currentIndex < meta.dropIndex ? meta.dropIndex - 1 : meta.dropIndex;
                                taskIds.splice(adjustedIndex, 0, meta.task);
                                return {
                                  ...item,
                                  taskIds,
                                };
                              } else if (item.id === meta.from) {
                                // Remove task from source column
                                return {
                                  ...item,
                                  taskIds: item.taskIds.filter((t) => t !== meta.task),
                                };
                              } else if (item.id === meta.to) {
                                // Add task to destination column at specific position
                                const taskIds = [...item.taskIds];
                                taskIds.splice(meta.dropIndex, 0, meta.task);
                                return {
                                  ...item,
                                  taskIds,
                                };
                              }
                              return item;
                            }),
                          };
                        });
                      }
                      setMeta({
                        task: "",
                        from: "",
                        to: "",
                        dropIndex: -1,
                      });
                    }}
                  >
                    <GripVertical className="opacity-40 h-4" />
                    <h3 className="text-sm">{board.tasks[t].title}</h3>
                  </div>
                </div>
              );
            })}
            {/* Ghost card preview at the end of the list */}
            {meta.to === i.id && meta.dropIndex === i.taskIds.length && meta.task && (
              <div className="rounded-md border p-2 flex items-center bg-background opacity-60 border-dashed mt-2">
                <GripVertical className="opacity-40 h-4" />
                <h3 className="text-sm">{board.tasks[meta.task]?.title}</h3>
              </div>
            )}
            {/* Large drop zone at the bottom for easier dropping */}
            <div
              className="min-h-16 -mx-2 -mb-2 rounded-b-md"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (meta.from && meta.task) {
                  setMeta({ ...meta, to: i.id, dropIndex: i.taskIds.length });
                }
              }}
            />
          </div>
        </ div >
      ))}
    </div>
  )
}