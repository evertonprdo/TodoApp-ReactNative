import { act, renderHook, waitFor } from "@testing-library/react-native"

import { TasksProvider } from "./TasksContext"
import { useTasks } from "./useTasks"
import { getStorageTasks } from "@storage/tasksStorage"

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
  })

  it("should be able to add a new task", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.dispatches.added('new-task'))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks).toEqual([{ id: 1, text: 'new-task', done: false }])
  })

  it("should be able to updated a task", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.dispatches.added('new-task'))
    await waitFor(() => result.current.dispatches.updated(1))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks).toEqual([expect.objectContaining({ done: true })])
  })

  it("should be able to change task text", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.dispatches.added('new-task'))
    await waitFor(() => result.current.dispatches.textChanged(1, 'edited-task'))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks).toEqual([expect.objectContaining({ text: 'edited-task' })])
  })

  it("should be able to remove task", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => result.current.dispatches.added('new-task'))
    await waitFor(() => result.current.dispatches.deleted(1))

    expect(result.current.tasks).toHaveLength(0)
  })

  it("should persisted changes on storage", async () => {
    const expectedTask = { id: 1, text: 'new-task', done: false }
    const { result } = renderHook(() => useTasks(), {
      wrapper: provider
    })

    await waitFor(() => act(() => result.current.dispatches.added('new-task')))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks).toEqual([expectedTask])

    const storage = await getStorageTasks()

    expect(storage?.lastId).toEqual(1)
    expect(storage?.tasks).toEqual([expectedTask])
  })
})