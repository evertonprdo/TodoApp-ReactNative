import { Pressable, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import PlusCircle from "@assets/PlusCircle";

import Colors from "@styles/Colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function PressablePlusIcon() {
  const svIsPressedIn = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: svIsPressedIn.value
      ? withTiming(Colors.brand.blue, { easing: Easing.out(Easing.circle) })
      : withTiming(Colors.brand.blueDark),
  }))

  return (
    <AnimatedPressable
      onPressIn={() => svIsPressedIn.value = true}
      onPressOut={() => svIsPressedIn.value = false}
      style={[styles.container, animatedStyles]}
    >
      <PlusCircle />
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    padding: 18,
    borderRadius: 8,
  }
})