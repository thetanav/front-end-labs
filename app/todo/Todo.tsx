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
import { Loader } from "lucide-react";

export function Todo({ todo }: { todo: TodoType }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: toggleStatus, isPending: togglePending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/todos/toggle/status/" + id,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.map((todo: any) =>
          todo._id === data.data._id ? data.data : todo
        ),
      }));
      toast("Todo status toggled!");
    },
  });

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => {
      await fetch("https://api.freeapi.app/api/v1/todos/" + id, {
        method: "DELETE",
      });
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.filter((todo: any) => todo._id !== id),
      }));
      toast.success("Todo deleted!");
    },
  });

  const { mutate: editMutate, isPending: editPending } = useMutation({
    mutationFn: async (id: string) => {
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
      queryClient.setQueryData(["todo"], (old: any) => ({
        ...old,
        data: old.data.map((todo: any) =>
          todo._id === data.data._id ? data.data : todo
        ),
      }));
      setOpen(false);
      setTitle("");
      setDescription("");
      toast.success("Todo edit successful!");
    },
  });

  return (
    <div
      key={todo._id}
      className="flex gap-6 items-center my-2"
      aria-disabled={deletePending}>
      {togglePending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Checkbox
          checked={todo.isComplete}
          onCheckedChange={() => toggleStatus(todo._id)}
          disabled={togglePending}
        />
      )}
      <div className="flex flex-col gap-1">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <Button onClick={() => deleteMutate(todo._id)} disabled={deletePending}>
        {deletePending && <Loader className="w-4 h-4 animate-spin" />}
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
                  onClick={() => editMutate(todo._id)}
                  disabled={editPending}>
                  {editPending && <Loader className="w-4 h-4 animate-spin" />}
                  SAVE
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
