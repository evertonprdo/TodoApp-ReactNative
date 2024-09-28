import { renderHook, waitFor } from "@testing-library/react-native"

import { TasksProvider } from "./TasksContext"
import { useTasks } from "./useTasks"

const provider = ({ children }: any) => (
  <TasksProvider initialTasks={{
    tasks: [],
    lastId: 0
  }} >
    {children}
  </TasksProvider>
)

describe("Context: Tasks Context", () => {
  it("should not have any initial tasks", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    expect(result.current.tasks).toHaveLength(0)
    expect(result.current.lastId.state).toEqual(0)
  })

  it("should be able to add a new task", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.dispatch({
      type: 'added',
      params: {
        id: 1,
        text: 'new-task'
      }
    }))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks).toEqual([{ id: 1, text: 'new-task', done: false }])
  })

  it("should be able to update last id", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.lastId.setState(1))

    expect(result.current.tasks).toHaveLength(0)
    expect(result.current.lastId.state).toEqual(1)
  })
})