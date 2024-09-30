import { fireEvent, render, screen } from "@testing-library/react-native"

import { Checkbox } from "./Checkbox"

describe("Components: Checkbox", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("should be able to render", () => {
    render(<Checkbox onChangeValue={() => {}}/>)

    expect(screen.getByTestId('animated-checkbox')).toBeTruthy()
    expect(screen.queryByTestId('animated-check-icon')).toBeFalsy()
  })

  it("should not render check icon when value false", () => {
    render(
      <Checkbox
        value={false}
        onChangeValue={() => { }}
      />
    )

    expect(screen.queryByTestId('animated-check-icon')).toBeNull()
  })

  it("should render icon when value is true", () => {
    render(
      <Checkbox
        value={true}
        onChangeValue={() => { }}
      />
    )

    expect(screen.queryByTestId('animated-check-icon')).toBeTruthy()
  })

  it("should call onChangeValue with the opposite value when pressed", async () => {
    const value = true
    const onPress = jest.fn()

    render(
      <Checkbox
        value={value}
        onChangeValue={onPress}
      />
    )

    const animCheckbox = await screen.getByTestId('animated-checkbox')
    fireEvent.press(animCheckbox)
    
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith(!value)
  })
})