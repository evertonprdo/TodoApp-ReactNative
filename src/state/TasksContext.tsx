import { createContext, useEffect, useReducer, useState } from "react";

import { tasksReducer } from "./tasksReducer";
import { TasksContextProps } from "./types";
import { percistStorageTasks, TasksStorageProps } from "@storage/tasksStorage";

export const TasksContext = createContext<TasksContextProps>({} as TasksContextProps)

export type Props = {
  initialTasks: TasksStorageProps
  children: React.ReactNode
}

export function TasksProvider({ initialTasks, children }: Props) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks.tasks)
  const [lastId, setLastId] = useState(initialTasks.lastId)

  useEffect(() => {
    percistStorageTasks({ tasks: tasks, lastId })
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        dispatch,
        lastId: {
          state: lastId,
          setState: setLastId
        }
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}