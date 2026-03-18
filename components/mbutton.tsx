"use client";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

type MutationLike = {
  mutate: () => void;
  isPending: boolean;
};

type MButtonProps = {
  mutation: MutationLike;
  children: ReactNode;
  className?: string;
  variant?: VariantProps<typeof Button>["variant"];
};

export function MButton({
  mutation,
  children,
  className,
  variant,
}: MButtonProps) {
  const { mutate, isPending } = mutation;
  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      variant={variant}
      className={
        (className ?? "") +
        " relative disabled:opacity-100 overflow-hidden cursor-pointer select-none"
      }
    >
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${isPending ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} transition-all duration-100 ease-out`}
      >
        <Loader className="animate-spin" />
      </div>

      <p
        className={
          (isPending
            ? "opacity-0 -translate-y-1"
            : "opacity-100 translate-y-0") +
          " transition-all duration-100 ease-out"
        }
      >
        {children}
      </p>
    </Button>
  );
}
