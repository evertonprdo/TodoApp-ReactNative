import { createContext, useEffect, useReducer, useState } from "react";

import { tasksReducer } from "./tasksReducer";
import { TasksContextProps } from "./types";
import { persistStorageTasks, TasksStorageProps } from "@storage/tasksStorage";

export const TasksContext = createContext<TasksContextProps>({} as TasksContextProps)

export type Props = {
  initialTasks: TasksStorageProps
  children: React.ReactNode
}

export function TasksProvider({ initialTasks, children }: Props) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks.tasks)
  const [lastId, setLastId] = useState(initialTasks.lastId)

  function added(text: string) {
    const nextId = lastId + 1
    dispatch({
      type: "added",
      params: {
        id: nextId,
        text: text
      }
    })
    setLastId(nextId)
  }

  function updated(id: number) {
    dispatch({
      type: "updated",
      params: { id }
    })
  }

  function textChanged(id: number, text: string) {
    dispatch({
      type: "text_changed",
      params: { id, text }
    })
  }

  function deleted(id: number) {
    dispatch({
      type: "deleted",
      params: { id }
    })
  }

  function refresh() {
    dispatch({ type: "refresh" })
  }

  useEffect(() => {
    persistStorageTasks({ tasks: tasks, lastId })
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        dispatches: {
          added,
          updated,
          textChanged,
          deleted,
          refresh,
        },
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}