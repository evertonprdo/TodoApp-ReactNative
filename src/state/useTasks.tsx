import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export function useTasks() {
  const value = useContext(TasksContext)

  if (!value) {
    throw new Error('The useTasks() must be wrapped with <Task Provider />')
  }

  return value
}