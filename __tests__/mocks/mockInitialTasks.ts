import { TaskProps } from "@state/types";
import { TasksStorageProps } from "@storage/taksStorage";

export const mockInitialTasks: TaskProps[] = [
  { id: 1, text: 'Task 1', done: true },
  { id: 2, text: 'Task 2', done: false },
  { id: 3, text: 'Task 3', done: true },
  { id: 4, text: 'Task 4', done: false },
];

export const mockInitialStorage: TasksStorageProps = {
  tasks: mockInitialTasks,
  lastId: 4
}