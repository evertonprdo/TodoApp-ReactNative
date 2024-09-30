import { act, render, screen } from "@__tests__/utils/customRender";
import { useTasks } from "@state/useTasks";
import { TaskList } from ".";

jest.mock('@state/useTasks', () => ({
  useTasks: jest.fn(),
}))

describe("Components: TaskList", () => {
  const mockTasks = [
    { id: '1', text: 'Task 1', done: false },
    { id: '2', text: 'Task 2', done: true },
  ];

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      dispatches: {
        refresh: jest.fn()
      },
    })
  })

  it("should render task list with the correct tasks", () => {
    render(<TaskList />)

    expect(screen.getByDisplayValue('Task 1')).toBeTruthy()
    expect(screen.getByDisplayValue('Task 2')).toBeTruthy()
    expect(screen.queryByText('empty-component')).toBeNull()
  })

  it("should render the EmptyComponent when no tasks are available", () => {
    (useTasks as jest.Mock).mockReturnValueOnce({
      tasks: []
    })

    render(<TaskList />)
    expect(screen.getByTestId('empty-component')).toBeTruthy()
  })

  it("should dispatch refresh when refreshControl onRefresh trigger", async () => {
    render(<TaskList />)

    const flatList = screen.getByTestId('task-list')

    const { refreshControl } = flatList.props
    await act(() => {
      refreshControl.props.onRefresh()
    })

    expect(useTasks().dispatches.refresh).toHaveBeenCalledTimes(1)
  })

  it("should render the correct create count info", () => {
    render(<TaskList />)

    expect(screen.getByTestId('create-count').props.children).toEqual(2)
    expect(screen.getByTestId('done-count').props.children).toEqual(1)
  })
})