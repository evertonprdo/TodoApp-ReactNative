import { ReducerActionProps, ReducerActionsWithId, ReducerActionsWithIdText, TaskProps } from "./types";

export function tasksReducer(tasks: TaskProps[], action: ReducerActionProps) {
  switch (action.type) {
    case 'added':
      return addedDispach(tasks, action);

    case 'text_changed':
      return textChangedDispach(tasks, action)

    case 'updated':
      return updatedDispach(tasks, action)

    case 'deleted':
      return deletedDispach(tasks, action)

    case 'refresh':
      return refreshDispach(tasks)
    default:
      throw Error('Unknown action: ' + action);

  }
}

function addedDispach(tasks: TaskProps[], action: ReducerActionsWithIdText) {
  return [
    {
      id: action.params.id,
      text: action.params.text,
      done: false,
    },
    ...tasks,
  ];
}

function textChangedDispach(tasks: TaskProps[], action: ReducerActionsWithIdText) {
  const rowIndex = tasks.findIndex(task => task.id === action.params.id)
  let newTasks = [...tasks]

  newTasks[rowIndex].text = action.params.text

  return newTasks
}


function updatedDispach(tasks: TaskProps[], action: ReducerActionsWithId) {
  const rowIndex = tasks.findIndex(task => task.id === action.params.id)
  let newTasks = [...tasks]

  newTasks[rowIndex].done = !tasks[rowIndex].done

  return newTasks
}

function deletedDispach(tasks: TaskProps[], action: ReducerActionsWithId) {
  const newTasks = tasks.filter((task) => task.id !== action.params.id);
  return newTasks
}

function refreshDispach(tasks: TaskProps[]) {
  return tasks.sort((a, b) => {
    return Number(a.done) - Number(b.done)
  })
}