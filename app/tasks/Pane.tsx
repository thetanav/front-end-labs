"use client";

import { GripVertical, Pencil, Plus } from "lucide-react"
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { boardData } from "./data";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const data = localStorage.getItem("kanban")
    if (data) {
      setBoard(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(board))
  }, [board])

  const addNewTask = (columnId: string) => {
    const newTaskId = nanoid();
    setBoard(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTaskId]: { id: newTaskId, title: "New task" }
      },
      columns: prev.columns.map(col =>
        col.id === columnId
          ? { ...col, taskIds: [...col.taskIds, newTaskId] }
          : col
      )
    }));
  };

  return (
    <div className="flex gap-1 mt-10 select-none">
      {board.columns.map(i => (
        <div
          key={i.id}
          className="rounded-lg border bg-card min-h-72 w-64 overflow-hidden px-4 py-2"
          onDragOver={(e) => {
            e.preventDefault();
            if (meta.from !== i.id) {
              setMeta({ ...meta, to: i.id, dropIndex: i.taskIds.length });
            }
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">{i.title}</h2>
            <Button
              onClick={() => addNewTask(i.id)}
              variant={"ghost"}
              size={"icon"}
            >
              <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          <div className="space-y-2 min-h-[200px]">
            {i.taskIds.map((t, index) => {
              const isDragging = meta.task === t && meta.from === i.id;
              const showGhostBefore = meta.to === i.id && meta.dropIndex === index && meta.task && (meta.from !== meta.to || !isDragging);
              return (
                <div key={t}>
                  {showGhostBefore && (
                    <div className="rounded-lg border-2 border-dashed border-primary/50 p-3 flex items-center bg-primary/5 mb-2 transition-all duration-200">
                      <GripVertical className="opacity-0 h-4 w-4 mr-2" />
                      <h3 className="text-sm text-muted-foreground">{board.tasks[meta.task]?.title}</h3>
                    </div>
                  )}
                  <div
                    className={`group rounded-lg border bg-background p-3 flex items-center transition-all duration-200 hover:border-primary/50 active:cursor-grabbing cursor-grab ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'
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
                    <Card setBoard={setBoard} text={board.tasks[t].title} taskId={t} />
                  </div>
                </div>
              );
            })}
            {/* Ghost card preview at the end of the list */}
            {meta.to === i.id && meta.dropIndex === i.taskIds.length && meta.task && (
              <div className="rounded-lg border-2 border-dashed border-primary/50 p-3 flex items-center bg-primary/5 mt-2 transition-all duration-200">
                <GripVertical className="opacity-0 h-4 w-4 mr-2" />
                <h3 className="text-sm text-muted-foreground">{board.tasks[meta.task]?.title}</h3>
              </div>
            )}
            {/* Large drop zone at the bottom for easier dropping */}
            <div
              className="min-h-16"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (meta.from && meta.task) {
                  setMeta({ ...meta, to: i.id, dropIndex: i.taskIds.length });
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function Card({ text, setBoard, taskId }: { text: string; setBoard: any; taskId: string }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleSave = () => {
    if (value.trim() && value !== text) {
      setBoard((prev: Board) => {
        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: { id: taskId, title: value.trim() }
          }
        }
      });
    } else if (!value.trim()) {
      setValue(text); // Reset to original if empty
    }
    setEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setValue(text);
      setEdit(false);
    }
  };

  return (
    <div className="flex items-center gap-2 w-fit group/item overflow-hidden">
      {edit ? (
        <>
          <Pencil className="opacity-40 h-3 w-3 shrink-0" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="Enter task title..."
            autoFocus
            className="outline-none text-sm flex-1 bg-transparent border-b border-primary focus:border-primary/50 transition-colors w-inherit"
          />
        </>
      ) : (
        <>
          <GripVertical className="opacity-30 h-4 w-4 shrink-0 transition-opacity" />
          <h3
            className="text-sm flex-1 cursor-text hover:text-primary transition-colors"
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
          >
            {text}
          </h3>
        </>
      )}
    </div>
  )
}