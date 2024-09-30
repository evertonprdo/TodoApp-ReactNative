import { fireEvent, render, screen } from "@__tests__/utils/customRender"
import { useTasks } from "@state/useTasks"
import { TodoInput } from "."

jest.mock("@state/useTasks", () => ({
  useTasks: jest.fn(),
}))

describe("Components: TodoInput", () => {
  const mockAdded = jest.fn()

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      dispatches: {
        added: mockAdded
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render input and button", () => {
    render(<TodoInput />)

    expect(screen.getByPlaceholderText("Adicione uma nova tarefa")).toBeTruthy()
    expect(screen.getByTestId('anim-pressable-plus')).toBeTruthy()
  })

  it("should dispatch 'added' on submit editing and clear the input.", () => {
    render(<TodoInput />)
    const input = screen.getByPlaceholderText("Adicione uma nova tarefa")

    fireEvent(input, 'changeText', 'new-task')
    fireEvent(input, 'submitEditing')

    expect(useTasks().dispatches.added).toHaveBeenCalledWith('new-task')
    expect(input.props.value).toEqual('')
  })

  it("should dispatch 'added' on press button and clear the input.", () => {
    render(<TodoInput />)
    const input = screen.getByPlaceholderText("Adicione uma nova tarefa")
    const btn = screen.getByTestId('anim-pressable-plus')

    fireEvent(input, 'changeText', 'new-task')
    fireEvent.press(btn)

    expect(useTasks().dispatches.added).toHaveBeenCalledWith('new-task')
    expect(input.props.value).toEqual('')
  })
})