import { queryClient } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import { toast } from "sonner";

export const AddTodo = memo(function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    <div className="flex items-center gap-2">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1"
      />
      <Button onClick={() => addMutate()} size="sm">
        Add
      </Button>
    </div>
  );
});
