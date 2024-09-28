import { fireEvent, render, screen } from "@__tests__/utils/customRender"
import { useTasks } from "@state/useTasks"

import { Task } from "."

jest.mock('@state/useTasks', () => ({
  useTasks: jest.fn()
}))

describe("Components: Task", () => {
  const task = { id: 1, text: 'test-todo', done: false }

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
    })
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

    expect(useTasks().dispatch).toHaveBeenCalledWith({
      type: 'updated',
      params: { id: task.id },
    })
  })

  it('should be able to dispatch deleted on hit pressable trash icon', () => {
    render(<Task task={task} />)
    const trashIcon = screen.getByTestId('anim-pressable-trash')

    fireEvent.press(trashIcon);

    expect(useTasks().dispatch).toHaveBeenCalledWith({
      type: 'deleted',
      params: { id: task.id },
    })
  })

  it('should enter edit mode when pencil icon is pressed', () => {
    render(<Task task={task} />)
    const pencilIcon = screen.getByTestId('anim-pressable-pencil')

    fireEvent.press(pencilIcon);

    const inputTask = screen.getByTestId('input-task')
    expect(inputTask.props.editable).toBe(true)
  })

  it('should be able to dispatch text_changed on change text input', () => {
    render(<Task task={task} />)
    const taskInput = screen.getByDisplayValue('test-todo')
    const editbtn = screen.getByTestId('anim-pressable-pencil')

    fireEvent.press(editbtn)
    fireEvent(taskInput, 'changeText', 'edited-todo');

    expect(useTasks().dispatch).toHaveBeenCalledWith({
      type: 'text_changed',
      params: {
        id: task.id,
        text: 'edited-todo'
      },
    })
  })
})