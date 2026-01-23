'use client'

import Board from "./Pane";
import Pane from "./Pane";
import { useState } from "react";

export default function Page() {
  const [board, setBoard] = useState()
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">kanban board</h1>
      <Board />
    </main>
  )
}