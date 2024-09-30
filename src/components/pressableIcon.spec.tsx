import { fireEvent, render, screen } from "@testing-library/react-native"
import Svg, { SvgProps } from "react-native-svg"
import { rgbaRegex } from "@utils/hexToRgba"

import { PressableIcon } from "./PressableIcon"

const MockIcon = (props: SvgProps) => (<Svg {...props} />)

describe("Components: Pressable Icon", () => {
  it("should render", () => {
    render(<PressableIcon icon={MockIcon} />)

    expect(screen.getByTestId('anim-pressable')).toBeTruthy()
    expect(screen.getByTestId('pressable-icon'))
  })

  it("should trigger an animation when pressed in", () => {
    jest.useFakeTimers()
    render(<PressableIcon icon={MockIcon} />)

    const pressable = screen.getByTestId('anim-pressable')
    expect(pressable).toHaveAnimatedStyle({ backgroundColor: 'transparent' })

    fireEvent(pressable, 'pressIn')
    jest.advanceTimersByTime(240)
    jest.useRealTimers()

    expect(pressable.props.jestAnimatedStyle.value).toEqual(
      expect.objectContaining({ backgroundColor: expect.stringMatching(rgbaRegex) })
    )
  })
})