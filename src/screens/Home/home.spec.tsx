import { fireEvent, render, screen } from "@__tests__/utils/customRender"
import Home from "."

describe("Screen: Home", () => {
  it("should render with empty list", () => {
    render(<Home />)

    expect(screen.getByPlaceholderText('Adicione uma nova tarefa')).toBeTruthy()
    expect(screen.getByTestId('empty-component')).toBeTruthy()
  })

  it("should be able to add a new task", async () => {
    render(<Home />)

    const input = screen.getByPlaceholderText('Adicione uma nova tarefa')

    fireEvent(input, 'changeText', 'new-task')
    fireEvent(input, 'submitEditing')

    expect(screen.getByDisplayValue('new-task')).toBeTruthy()
  })

  it("should be able to complete task", async () => {
    jest.useFakeTimers()
    render(<Home />)

    const addTodoInput = screen.getByPlaceholderText('Adicione uma nova tarefa')

    fireEvent(addTodoInput, 'changeText', 'new-task')
    fireEvent(addTodoInput, 'submitEditing')

    const checkbox = screen.getByTestId('animated-checkbox')
    const checkIcon = screen.getByTestId('animated-check-icon')

    fireEvent.press(checkbox)
    jest.advanceTimersByTime(555)

    expect(checkIcon).toHaveAnimatedStyle({ transform: [{ scale: 1 }] })
    jest.useRealTimers()
  })

  it("should be able to edit task", async () => {
    render(<Home />)

    const addTodoInput = screen.getByPlaceholderText('Adicione uma nova tarefa')

    fireEvent(addTodoInput, 'changeText', 'new-task')
    fireEvent(addTodoInput, 'submitEditing')

    const taskInput = screen.getByDisplayValue('new-task')
    const editBtn = screen.getByTestId('anim-pressable-pencil')
    
    fireEvent.press(editBtn)
    fireEvent(taskInput, 'changeText', 'edited-task')
    fireEvent(taskInput, 'submitEditing')

    expect(screen.getByDisplayValue('edited-task')).toBeTruthy()
  })

  it("should be able to remove task", async () => {
    render(<Home />)

    const addTodoInput = screen.getByPlaceholderText('Adicione uma nova tarefa')

    fireEvent(addTodoInput, 'changeText', 'new-task')
    fireEvent(addTodoInput, 'submitEditing')

    const trashBtn = screen.getByTestId('anim-pressable-trash')

    fireEvent.press(trashBtn)

    expect(screen.queryByText('new-task')).toBeNull()
  })
})