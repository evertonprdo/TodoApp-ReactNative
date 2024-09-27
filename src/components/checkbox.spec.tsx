import { fireEvent, render, screen } from "@testing-library/react-native"

import { Checkbox } from "./Checkbox"

const animatedScaleStyle = (value: number) => ({ transform: [{ scale: value }] })

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
    expect(screen.getByTestId('animated-check-icon')).toBeTruthy()
  })

  it("should be rendered with scale 0 when value is false", () => {
    render(
      <Checkbox
        value={false}
        onChangeValue={() => { }}
      />
    )

    const animCheckIcon = screen.getByTestId('animated-check-icon')
    expect(animCheckIcon).toHaveAnimatedStyle(animatedScaleStyle(0))
  })

  it("should be rendered with scale 1 when value is true", () => {
    render(
      <Checkbox
        value={true}
        onChangeValue={() => { }}
      />
    )

    const animCheckIcon = screen.getByTestId('animated-check-icon')
    expect(animCheckIcon).toHaveAnimatedStyle(animatedScaleStyle(1))
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