export const boardData = {
  tasks: {
    "t1": { id: "t1", title: "Setup project" },
    "t2": { id: "t2", title: "Design Kanban UI" },
    "t3": { id: "t3", title: "Implement drag logic" },
    "t4": { id: "t4", title: "Polish UX" },
    "t5": { id: "t5", title: "Ship 🚀" },
  },

  columns: [
    {
      id: "todo",
      title: "Todo",
      taskIds: ["t1", "t2"],
    },
    {
      id: "doing",
      title: "Doing",
      taskIds: ["t3"],
    },
    {
      id: "done",
      title: "Done",
      taskIds: ["t4", "t5"],
    },
  ],
} as const
