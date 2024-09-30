import { Pressable, PressableProps, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, FadeOut } from "react-native-reanimated"
import { SvgProps } from "react-native-svg"

import Colors from "@styles/Colors"

type Props = PressableProps & {
  icon: (props: SvgProps) => React.JSX.Element
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const IconSize = 16
const AnimationConfig = {
  duration: 240, easing: Easing.out(Easing.circle)
}

export function PressableIcon({ icon: Icon, ...props }: Props) {
  const svIsPressedIn = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: svIsPressedIn.value
      ? withTiming(Colors.gray[400], AnimationConfig)
      : withTiming("transparent")
  }))

  return (
    <AnimatedPressable
      testID='anim-pressable'
      style={[styles.container, animatedStyle]}
      onPressIn={() => svIsPressedIn.value = true}
      onPressOut={() => svIsPressedIn.value = false}
      hitSlop={4}
      {...props}
    >
      <Animated.View
        key={"onBlur"}
        entering={FadeIn.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
        exiting={FadeOut.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
      >
        <Icon
          testID='pressable-icon'
          width={IconSize}
          height={IconSize}
          fill={Colors.gray[300]}
        />
      </Animated.View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
  }
})