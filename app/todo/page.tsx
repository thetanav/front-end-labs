"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Todo } from "./Todo";
import { queryClient } from "@/components/providers";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export interface TodoType {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://api.freeapi.app/api/v1/todos").then((res) => res.json()),
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: async () => {
      if (title.trim() === "" || description.trim() === "") {
        toast.error("Please fill in all fields");
        return;
      }

      const tempTodo = {
        _id: `temp-${Date.now()}`,
        title,
        description,
        isComplete: false,
      };

      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: [...old.data, tempTodo],
      }));

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
      toast.success("Todo added!");

      if (data.statusCode === 201) {
        queryClient.setQueryData(["todo"], (old: any) => ({
          ...old,
          data: old.data.map((todo: any) =>
            todo._id === tempTodo._id ? data.data : todo
          ),
        }));
      } else {
        queryClient.invalidateQueries({ queryKey: ["todo"] });
        toast.error("An error occurred");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <div>
        <Input
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={() => addMutate()}>ADD</Button>
      </div>

      <div>
        {isLoading && <Loader className="w-4 h-4 animate-spin" />}
        {data &&
          data.data.map((todo: TodoType) => (
            <Todo key={todo._id} todo={todo} />
          ))}
      </div>
    </div>
  );
}
