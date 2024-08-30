import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Check from "@assets/Check";
import Colors from "@styles/Colors";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type Props = {
  value?: boolean
  onChangeValue: (value: boolean) => void
}

export function Checkbox({ value, onChangeValue }: Props) {
  const svIsChecked = useSharedValue(value);
  svIsChecked.value = value ?? false

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: svIsChecked.value
      ? withTiming(Colors.brand.purpleDark)
      : withTiming(Colors.brand.blue),

    backgroundColor: svIsChecked.value
      ? withTiming(Colors.brand.purpleDark)
      : withTiming("transparent")
  }))

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: svIsChecked.value
        ? withTiming(1, { duration: 555, easing: Easing.bounce })
        : withTiming(0, { duration: 333 })
    }]
  }))

  useEffect(() => {
    svIsChecked.value = value
  }, [value])

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={() => onChangeValue(!value)}
      hitSlop={12}
    >

      <Animated.View style={checkAnimatedStyle}>
        <Check fill={Colors.gray[100]}/>
      </Animated.View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand.purpleDark,

    padding: 2,
    borderWidth: 2,
    borderRadius: 999,
  }
})