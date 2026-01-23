import { Suspense } from "react";
import Board from "./Pane";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto pt-8 px-7">
      <h1 className="text-xl font-bold">Kanban board</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Board />
      </Suspense>
    </main>
  )
}