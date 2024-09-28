import { fireEvent, render, screen } from "@testing-library/react-native"
import { hexRegex, rgbaRegex } from "@utils/hexToRgba"

import { PressablePlusIcon } from "./PressablePlusIcon"

describe("Components: Pressable Plus Icon", () => {
  it("should be able to render", () => {
    render(<PressablePlusIcon />)

    const pressable = screen.getByTestId('anim-pressable-plus')

    expect(pressable).toBeTruthy()
  })

  it("should trigger an animation when pressed in", () => {
    jest.useFakeTimers()
    render(<PressablePlusIcon />)

    const pressable = screen.getByTestId('anim-pressable-plus')
    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({
        backgroundColor: expect.stringMatching(hexRegex)
      })
    )

    fireEvent(pressable, 'pressIn')
    jest.advanceTimersByTime(240)
    jest.useRealTimers()

    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({ backgroundColor: expect.stringMatching(rgbaRegex) })
    )
  })
})