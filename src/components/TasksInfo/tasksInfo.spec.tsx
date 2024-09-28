import { render, screen } from "@testing-library/react-native"
import { TasksInfo } from "."

describe("Components: Tasks Info", () => {
  it("should render with current properties", () => {
    const createdCount = 7
    const doneCount = 5
    render(<TasksInfo createdCount={createdCount} doneCount={doneCount}/>)

    expect(screen.getByTestId('create-count').props.children).toEqual(createdCount)
    expect(screen.getByTestId('done-count').props.children).toEqual(doneCount)
  })
})