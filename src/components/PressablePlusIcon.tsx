import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import PlusCircle from "@assets/PlusCircle";

import Colors from "@styles/Colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function PressablePlusIcon({ ...props }: PressableProps) {
  const svIsPressedIn = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: svIsPressedIn.value
      ? withTiming(Colors.brand.blue, { duration: 120, easing: Easing.out(Easing.circle) })
      : withTiming(Colors.brand.blueDark),
  }))

  return (
    <AnimatedPressable
      onPressIn={() => svIsPressedIn.value = true}
      onPressOut={() => svIsPressedIn.value = false}
      style={[styles.container, animatedStyles]}
      hitSlop={8}
      {...props}
    >
      <PlusCircle />
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderRadius: 8,
  }
})