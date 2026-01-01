import { Checkbox } from "@/components/ui/checkbox";
import { TodoType } from "./page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/components/providers";

export function Todo({ todo }: { todo: TodoType }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: toggleStatus } = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.map((todo: any) =>
          todo._id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        ),
      }));
      const res = await fetch(
        "https://api.freeapi.app/api/v1/todos/toggle/status/" + id,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();
      if (data.statusCode == 200) {
        toast.success("Todo status toggled!");
      } else {
        toast.error("Todo toggle failed!");
        queryClient.invalidateQueries({ queryKey: ["todo"] });
      }
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.filter((todo: any) => todo._id !== id),
      }));
      const res = await fetch("https://api.freeapi.app/api/v1/todos/" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.statusCode == 200) {
        toast.success("Todo deleted!");
      } else {
        toast.error("Todo delete failed!");
        queryClient.invalidateQueries({ queryKey: ["todo"] });
      }
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: async (id: string) => {
      if (title.trim() === "" || description.trim() === "") {
        toast.error("Please fill in all fields");
        return;
      }
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.map((todo: any) =>
          todo._id === id ? { ...todo, title, description } : todo
        ),
      }));
      setOpen(false);
      setTitle("");
      setDescription("");
      const res = await fetch("https://api.freeapi.app/api/v1/todos/" + id, {
        method: "PATCH",
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
      if (data.statusCode == 200) {
        toast.success("Todo edited!");
      } else {
        toast.error(data.message);
        queryClient.invalidateQueries({ queryKey: ["todo"] });
      }
    },
  });

  return (
    <div key={todo._id} className="flex gap-6 items-center my-2">
      <Checkbox
        checked={todo.isComplete}
        onCheckedChange={() => toggleStatus(todo._id)}
      />
      <div className="flex flex-col gap-1">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <Button onClick={() => deleteMutate(todo._id)}>DEL</Button>
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
                  placeholder="Todo title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Todo description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={() => editMutate(todo._id)}>SAVE</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
