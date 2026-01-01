"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Todo } from "./Todo";
import { queryClient } from "@/components/providers";
import { Loader } from "lucide-react";

export interface TodoType {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://api.freeapi.app/api/v1/todos").then((res) => res.json()),
  });

  const { mutate: addMutate, isPending: addPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://api.freeapi.app/api/v1/todos", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          description,
          title,
        }),
      });
      const data = await res.json();
      setTitle("");
      setDescription("");
      // setTodoData([...todoData, data.data]);
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: [...old.data, data.data],
      }));
    },
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
          {addPending && <Loader className="w-4 h-4 animate-spin" />}
          ADD
        </Button>
      </div>

      <div>
        {data &&
          data.data.map((todo: TodoType) => (
            <Todo key={todo._id} todo={todo} />
          ))}
      </div>
    </div>
  );
}
