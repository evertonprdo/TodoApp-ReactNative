import { tasksReducer } from "./tasksReducer"

describe("State: Tasks Reducer", () => {
  it("should add new task with the 'added' action type", () => {
    const task = { id: 1, text: 'new-task' }
    const tasks = tasksReducer([], {
      type: 'added',
      params: task
    })

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([{ ...task, done: false }])
  })

  it("should change text with the 'text_changed' action type", () => {
    const task = { id: 1, text: 'task', done: false }

    const tasks = tasksReducer([task], {
      type: 'text_changed',
      params: { id: 1, text: 'edited-task' },
    })

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([{ ...task, text: 'edited-task' }])
  })

  it("should updated done with the 'updated' action type", () => {
    const task = { id: 1, text: 'task', done: false }

    const tasks = tasksReducer([task], {
      type: 'updated',
      params: { id: 1 },
    })

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([{ ...task, done: true }])
  })

  it("should delete task with the 'deleted' action type", () => {
    const task = { id: 1, text: 'task', done: false }

    const tasks = tasksReducer([task], {
      type: 'deleted',
      params: { id: 1 },
    })

    expect(tasks).toHaveLength(0)
  })

  it("should sort done items at the end with the 'refresh' action type", () => {
    const initalTasks = [
      { id: 1, text: 'task', done: true },
      { id: 2, text: 'task', done: false },
      { id: 3, text: 'task', done: true },
      { id: 4, text: 'task', done: false },
    ]

    const orderedTasks = tasksReducer(initalTasks, { type: 'refresh' })

    expect(orderedTasks).toHaveLength(4)

    expect(orderedTasks.slice(0, 2)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ done: false }),
        expect.objectContaining({ done: false }),
      ])
    )

    expect(orderedTasks.slice(2)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ done: true }),
        expect.objectContaining({ done: true }),
      ])
    )
  })
})