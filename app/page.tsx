import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChartHorizontalBigIcon, Cat, ListTodo, ShoppingBag, WavesIcon, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <main className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Random UIs</h1>
          <p className="text-sm text-muted-foreground">
            A small playground where I build UI ideas end-to-end: layout experiments,
            motion studies, component patterns, and tiny product-ish flows. Nothing is
            precious here, the goal is reps.
          </p>
          <p className="text-sm text-muted-foreground">
            Each link is a self-contained mini project. Some are intentionally minimal,
            some are over-designed, and most are an excuse to explore one specific thing
            (state, interactions, spacing, typography, accessibility, performance) without
            turning it into a full app.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <Link href="/cat">
              <Button className="w-full gap-2">
                <Cat className="h-4 w-4" />
                Cats
              </Button>
            </Link>
            <Link href="/todo">
              <Button className="w-full gap-2">
                <ListTodo className="h-4 w-4" />
                Todo
              </Button>
            </Link>
            <Link href="/ecom">
              <Button className="w-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                Ecommerce
              </Button>
            </Link>
            <Link href="/tasks">
              <Button className="w-full gap-2">
                <BarChartHorizontalBigIcon className="h-4 w-4" />
                Kanban Board
              </Button>
            </Link>
            <Link href="/thinking">
              <Button className="w-full gap-2">
                <WavesIcon className="h-4 w-4" />
                LLM Thinking Wave
              </Button>
            </Link>
            <Link href="/mbutton">
              <Button className="w-full gap-2">
                <Zap className="h-4 w-4" />
                Mutation Button
              </Button>
            </Link>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          If you are here for a specific pattern, open one page and skim the markup.
          This repo is meant to be readable and easy to remix.
        </p>
      </main>
    </div>
  );
}
