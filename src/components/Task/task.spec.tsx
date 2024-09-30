import { fireEvent, render, screen } from "@__tests__/utils/customRender"
import { useTasks } from "@state/useTasks"

import { Task } from "."

jest.mock('@state/useTasks', () => ({
  useTasks: jest.fn()
}))

describe("Components: Task", () => {
  const task = { id: 1, text: 'test-todo', done: false }

  const mockAdded = jest.fn()
  const mockUpdated = jest.fn()
  const mockDeleted = jest.fn()
  const mockChangedText = jest.fn()

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      dispatches: {
        added: mockAdded,
        updated: mockUpdated,
        textChanged: mockChangedText,
        deleted: mockDeleted,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render task texts", () => {
    render(
      <Task task={task} />
    )

    expect(screen.getByTestId('task-component')).toBeTruthy()
    expect(screen.getByDisplayValue('test-todo')).toBeTruthy()
  })

  it("should be able to dispatch updated onPress checkbox", () => {
    render(<Task task={task} />)
    const checkbox = screen.getByTestId('animated-checkbox')

    fireEvent.press(checkbox)

    expect(useTasks().dispatches.updated).toHaveBeenCalledTimes(1)
    expect(useTasks().dispatches.updated).toHaveBeenCalledWith(task.id)
  })

  it('should be able to dispatch deleted on hit pressable trash icon', () => {
    render(<Task task={task} />)
    const trashIcon = screen.getByTestId('anim-pressable-trash')

    fireEvent.press(trashIcon);

    expect(useTasks().dispatches.deleted).toHaveBeenCalledTimes(1)
    expect(useTasks().dispatches.deleted).toHaveBeenCalledWith(task.id)
  })

  it('should enter edit mode when edit button is pressed', () => {
    render(<Task task={task} />)
    const pencilIcon = screen.getByTestId('anim-pressable')

    fireEvent.press(pencilIcon);

    const inputTask = screen.getByTestId('input-task')
    expect(inputTask.props.editable).toBe(true)
  })

  it('should be able to dispatch text_changed on submit text input', () => {
    render(<Task task={task} />)
    const taskInput = screen.getByDisplayValue('test-todo')
    const editBtn = screen.getByTestId('anim-pressable')

    fireEvent.press(editBtn)

    fireEvent(taskInput, 'changeText', 'edited-todo');
    fireEvent(taskInput, 'submitEditing')

    expect(useTasks().dispatches.textChanged).toHaveBeenCalledTimes(1)
    expect(useTasks().dispatches.textChanged).toHaveBeenCalledWith(task.id, 'edited-todo')
  })
})