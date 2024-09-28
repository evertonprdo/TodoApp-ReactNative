import { render, screen, fireEvent } from "@testing-library/react-native"
import { hexToRgb, rgbaRegex } from "@utils/hexToRgba"

import { Input } from "./Input"

describe("Componets: Input", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("should be able to render", () => {
    render(<Input placeholder="animated-input-test"/>)

    expect(screen.getByPlaceholderText('animated-input-test')).toBeTruthy()
  })

  it("should have animated default border color on bluer", async () => {
    jest.useFakeTimers()

    render(<Input />)

    const animInput = screen.getByTestId('anim-input')
    const initialAnimBorderColor = hexToRgb(animInput.props.jestAnimatedStyle.value.borderColor)

    fireEvent(animInput, 'focus')
    jest.advanceTimersByTime(730)

    fireEvent(animInput, 'blur')
    jest.advanceTimersByTime(300)

    expect(animInput).toHaveAnimatedStyle({ borderColor: initialAnimBorderColor })
  })

  it("should have animated border color on focus", async () => {
    jest.useFakeTimers()

    render(<Input />)

    const animInput = screen.getByTestId('anim-input')
    const initialAnimBorderColor = hexToRgb(animInput.props.jestAnimatedStyle.value.borderColor)

    fireEvent(animInput, 'focus')
    jest.advanceTimersByTime(730)

    expect(animInput)
      .not
      .toHaveAnimatedStyle({ borderColor: initialAnimBorderColor })

    expect(animInput.props.jestAnimatedStyle.value)
      .toEqual(expect.objectContaining({
        borderColor: expect.stringMatching(rgbaRegex)
      }))
  })
})