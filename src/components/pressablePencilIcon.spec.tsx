import { fireEvent, render, screen } from "@testing-library/react-native"
import { PressablePencilIcon } from "./PressablePencilIcon"
import { rgbaRegex } from "@utils/hexToRgba"

describe("Components: Pressable Pencil Icon", () => {
  it("should be able to render", () => {
    render(<PressablePencilIcon />)

    const pressable = screen.getByTestId('anim-pressable-pencil')

    expect(pressable).toBeTruthy()
  })

  it("should be able to have pencil icon when not focused", () => {
    render(
      <PressablePencilIcon isOnFocus={false} />
    )

    expect(screen.getByTestId('pencil-icon')).toBeTruthy()
  })

  it("should be able to have check icon when focused", () => {
    render(
      <PressablePencilIcon isOnFocus={true} />
    )

    expect(screen.getByTestId('check-icon')).toBeTruthy()
  })

  it("should trigger an animation when pressed in", () => {
    jest.useFakeTimers()
    render(<PressablePencilIcon />)

    const pressable = screen.getByTestId('anim-pressable-pencil')
    expect(pressable).toHaveAnimatedStyle({ backgroundColor: 'transparent' })

    fireEvent(pressable, 'pressIn')
    jest.advanceTimersByTime(240)
    jest.useRealTimers()

    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({ backgroundColor: expect.stringMatching(rgbaRegex) })
    )
  })
})