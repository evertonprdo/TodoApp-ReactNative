import { render, screen } from "@testing-library/react-native"

import { InputTask } from "./InputTask"

describe("Componets: InputTask", () => {
  it("should be able to render", () => {
    render(<InputTask placeholder="tasks-render-test" />)

    expect(screen.getByPlaceholderText('tasks-render-test')).toBeTruthy()
  })

  it("should display with a line-through when completed", () => {
    render(<InputTask isCompleted />)

    expect(screen.getByTestId('input-task').props.style[1].textDecorationLine).toEqual('line-through')
  })

  it("should not display with a line-through when not completed", () => {
    render(<InputTask value="task" />)

    expect(screen.getByTestId('input-task').props.style[1].textDecorationLine).toBeFalsy()
  })
})