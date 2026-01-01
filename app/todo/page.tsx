"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Todo } from "./Todo";
import { queryClient } from "@/components/providers";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { AddTodo } from "./AddTodo";

export interface TodoType {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://api.freeapi.app/api/v1/todos").then((res) => res.json()),
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="pt-2 pb-3">
          <AddTodo />
        </div>

        <div className="space-y-2">
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
          {data && data.data.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No todos yet
            </div>
          )}
          {data &&
            data.data.map((todo: TodoType) => (
              <Todo key={todo._id} todo={todo} />
            ))}
        </div>
      </div>
    </div>
  );
}
