import { Checkbox } from "@/components/ui/checkbox";
import { TodoType } from "./page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, memo } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/components/providers";
import { Trash2, Edit } from "lucide-react";

export const Todo = memo(function Todo({ todo }: { todo: TodoType }) {
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
    <div>
      <div className="flex items-center gap-4">
        <Checkbox
          checked={todo.isComplete}
          onCheckedChange={() => toggleStatus(todo._id)}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`text-md font-medium truncate ${
                todo.isComplete ? "line-through text-muted-foreground" : ""
              }`}>
              {todo.title}
            </h3>
          </div>
          <p
            className={`text-xs truncate text-muted-foreground ${
              todo.isComplete ? "line-through" : ""
            }`}>
            {todo.description}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => deleteMutate(todo._id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  setTitle(todo.title);
                  setDescription(todo.description);
                }}>
                <Edit className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => editMutate(todo._id)} size="sm">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
});
