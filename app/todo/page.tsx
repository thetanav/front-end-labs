"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://api.freeapi.app/api/v1/todos").then((res) => res.json()),
  });

  const { mutate: getTodo } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("https://api.freeapi.app/api/v1/todos/" + id);
      const data = await res.json();
      setTitle(data.data.title as string);
      setDescription(data.data.description as string);
    },
  });

  const { mutate: toggleStatus, isPending: togglePending } = useMutation({
    mutationFn: (id: string) =>
      fetch("https://api.freeapi.app/api/v1/todos/toggle/status/" + id, {
        method: "PATCH",
      }).then((res) => {
        res.json();
        refetch();
      }),
  });

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: (id) =>
      fetch("https://api.freeapi.app/api/v1/todos/" + id, {
        method: "DELETE",
      }).then((res) => {
        res.json();
        refetch();
      }),
  });

  const { mutate: addMutate, isPending: addPending } = useMutation({
    mutationFn: () =>
      fetch("https://api.freeapi.app/api/v1/todos", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          description,
          title,
        }),
      }).then((res) => {
        res.json();
        setTitle("");
        setDescription("");
        refetch();
      }),
  });

  const { mutate: editMutate, isPending: editPending } = useMutation({
    mutationFn: (id) =>
      fetch("https://api.freeapi.app/api/v1/todos/" + id, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          description,
          title,
        }),
      }).then((res) => {
        res.json();
        setTitle("");
        setDescription("");
        refetch();
      }),
  });

  return (
    <div className="container mx-auto">
      <div>
        <Input
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Add a new todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={() => addMutate()} disabled={addPending}>
          ADD
        </Button>
      </div>

      <div>
        {data &&
          data.data.map((todo: any, i: number) => (
            <div key={i} className="flex gap-6 items-center my-2">
              <Checkbox
                checked={todo.isComplete}
                onCheckedChange={() => toggleStatus(todo._id)}
                disabled={togglePending}
              />
              <div className="flex flex-col gap-1">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <Button
                onClick={() => deleteMutate(todo._id)}
                disabled={deletePending}>
                DEL
              </Button>
              <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setTitle(todo.title);
                      setDescription(todo.description);
                    }}>
                    EDIT
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit the todo!</DialogTitle>
                    <DialogDescription asChild>
                      <div>
                        <Input
                          placeholder="Add a new todo"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                          placeholder="Add a new todo"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            editMutate(todo._id);
                            setOpen(false);
                            refetch();
                          }}
                          disabled={editPending}>
                          SAVE
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))}
      </div>
    </div>
  );
}
