"use client";

import { MButton } from "@/components/mbutton";
import { useMutation } from "@tanstack/react-query";

export default function Page() {
  const mutation = useMutation({
    mutationFn: async () => {
      return await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Query Mutation Button
          </h1>
          <p className="text-sm text-muted-foreground">
            `MButton` is a drop-in button wrapper for mutation actions. It keeps
            the button disabled while pending and shows a loading indicator with
            a subtle slide animation.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Example</h2>
              <p className="text-sm text-muted-foreground">
                Click the button below to simulate a mutation action.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MButton mutation={mutation}>Run mutation</MButton>
              <MButton mutation={mutation} variant="secondary">
                Secondary
              </MButton>
              <MButton mutation={mutation} variant="destructive">
                Delete
              </MButton>
              <MButton mutation={mutation} variant="outline">
                Outline
              </MButton>
              <MButton mutation={mutation} variant="ghost">
                Ghost
              </MButton>
              <MButton mutation={mutation} variant="link">
                Link
              </MButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
