import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cat, ListTodo } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <main className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Random UIs</h1>
          <p className="text-sm text-muted-foreground">
            Testing my frontend skills out
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <Link href="/cat">
              <Button className="w-full gap-2">
                <Cat className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
            <Link href="/todo">
              <Button className="w-full gap-2">
                <ListTodo className="h-4 w-4" />
                Todo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
