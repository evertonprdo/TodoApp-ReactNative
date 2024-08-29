import { Pressable, PressableProps, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, FadeOut } from "react-native-reanimated"

import Pencil from "@assets/Pencil"
import Colors from "@styles/Colors"
import Check from "@assets/Check"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const IconSize = 16

const AnimationConfig = {
  duration: 240, easing: Easing.out(Easing.circle)
}

type Props = PressableProps & {
  isOnFocus?: boolean
}

export function PressablePencilIcon({ isOnFocus, ...props }: Props) {
  const svIsPressedIn = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: svIsPressedIn.value
      ? withTiming(Colors.gray[400], AnimationConfig)
      : withTiming("transparent")
  }))

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPressIn={() => svIsPressedIn.value = true}
      onPressOut={() => svIsPressedIn.value = false}
      hitSlop={4}
      {...props}
    >
      {isOnFocus
        ? (
          <Animated.View
            key={"onFocus"}
            entering={FadeIn.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
            exiting={FadeOut.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
          >
            <Check width={IconSize} height={IconSize} fill={Colors.brand.blue} />
          </Animated.View>
        ) : (
          <Animated.View
            key={"onBluer"}
            entering={FadeIn.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
            exiting={FadeOut.duration(AnimationConfig.duration).easing(AnimationConfig.easing)}
          >
            <Pencil width={IconSize} height={IconSize} fill={Colors.gray[300]} />
          </Animated.View>
        )
      }
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