import { fireEvent, render, screen } from "@testing-library/react-native"
import { rgbaRegex } from "@utils/hexToRgba"

import { PressableTrashIcon } from "./PressableTrashIcon"

describe("Components: Pressable Plus Icon", () => {
  it("should be able to render", () => {
    render(<PressableTrashIcon />)

    const pressable = screen.getByTestId('anim-pressable-trash')

    expect(pressable).toBeTruthy()
  })

  it("should trigger an animation when pressed in", () => {
    jest.useFakeTimers()
    render(<PressableTrashIcon />)

    const pressable = screen.getByTestId('anim-pressable-trash')
    const grayTrash = screen.getByTestId('gray-trash')
    const redTrash = screen.getByTestId('red-trash')

    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({
        backgroundColor: 'transparent'
      })
    )
    expect(redTrash).toHaveAnimatedStyle({ opacity: 0 })
    expect(grayTrash).toHaveAnimatedStyle({ opacity: 1 })

    fireEvent(pressable, 'pressIn')
    jest.advanceTimersByTime(120)
    jest.useRealTimers()

    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({ backgroundColor: expect.stringMatching(rgbaRegex) })
    )
    expect(redTrash).toHaveAnimatedStyle({ opacity: 1 })
    expect(grayTrash).toHaveAnimatedStyle({ opacity: 0 })
  })
})