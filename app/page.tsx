import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <main className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <p className="text-sm text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Link href="/todo">
              <Button className="w-full gap-2">
                <ListTodo className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-semibold">Fast & Simple</h3>
                <p className="text-xs text-muted-foreground">Quick todo management</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-semibold">Track Progress</h3>
                <p className="text-xs text-muted-foreground">Mark tasks complete</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <ListTodo className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-semibold">Manage Tasks</h3>
                <p className="text-xs text-muted-foreground">Edit and delete easily</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
