export type TaskProps = {
  id: number
  text: string
  done: boolean
}

export type ReducerActionsWithIdText = {
  type: "added" | "text_changed"
  params: {
    id: number
    text: string
  }
}

export type ReducerActionsWithId = {
  type: "deleted" | "updated"
  params: {
    id: number
  }
}

export type ReducerRefreshAction = {
  type: "refresh"
}

export type ReducerActionProps = ReducerActionsWithIdText | ReducerActionsWithId | ReducerRefreshAction

export type TasksContextProps = {
  tasks: TaskProps[]
  dispatches: {
    added: (text: string) => void
    updated: (id: number) => void
    textChanged: (id: number, text: string) => void
    deleted: (id: number) => void
    refresh: () => void
  }
}