import { Pressable, PressableProps, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated"

import Trash from "@assets/Trash"
import Colors from "@styles/Colors"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const AnimationConfig = {
  duration: 120, easing: Easing.out(Easing.circle)
}

export function PressableTrashIcon({ ...props }: PressableProps) {
  const svIsPressedIn = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: svIsPressedIn.value
      ? withTiming(Colors.gray[400], AnimationConfig)
      : withTiming("transparent")
  }))

  const onPressInStyle = useAnimatedStyle(() => ({
    opacity: svIsPressedIn.value
      ? withTiming(1, AnimationConfig)
      : withTiming(0)
  }))

  const onPressOutStyle = useAnimatedStyle(() => ({
    opacity: svIsPressedIn.value
      ? withTiming(0, AnimationConfig)
      : withTiming(1)
  }))

  function handlePressedIn() {
    svIsPressedIn.value = true
  }

  function handlePressedOut() {
    svIsPressedIn.value = false
  }

  return (
    <AnimatedPressable
      testID='anim-pressable-trash'
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressedIn}
      onPressOut={handlePressedOut}
      hitSlop={4}
      {...props}
    >
      <Animated.View testID='red-trash' style={[styles.icon, onPressInStyle]}>
        <Trash fill={Colors.feedback.danger} />
      </Animated.View>

      <Animated.View testID='gray-trash' style={[styles.icon, onPressOutStyle]}>
        <Trash fill={Colors.gray[300]} />
      </Animated.View>
    </AnimatedPressable>
  )
} // Directly animating the fill property isn't working

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,

    borderRadius: 4,
  },

  icon: {
    position: "absolute",
    top: 16,
    left: 16,

    transform: [
      { translateX: -8 },
      { translateY: -8 }
    ]
  }
})