import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Check from "@assets/Check";
import Colors from "@styles/Colors";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type Props = {
  value?: boolean
  onChangeValue: (value: boolean) => void
}

export function Checkbox({ value, onChangeValue }: Props) {
  const svIsChecked = useSharedValue(value);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: svIsChecked.value
      ? withTiming(Colors.brand.purpleDark)
      : withTiming(Colors.brand.blue),

    backgroundColor: svIsChecked.value
      ? withTiming(Colors.brand.purpleDark)
      : withTiming("transparent")
  }))

  useEffect(() => {
    svIsChecked.value = value ?? false
  }, [value])

  return (
    <AnimatedPressable
      testID={'animated-checkbox'}
      style={[styles.container, animatedStyle]}
      onPress={() => onChangeValue(!value)}
      hitSlop={12}
    >
      {value &&
        <Animated.View
          testID={'animated-check-icon'}
          style={styles.animContainer}
          entering={ZoomIn.duration(500).easing(Easing.bounce)}
          exiting={ZoomOut}
        >
          <Check fill={Colors.gray[100]} />
        </Animated.View>
      }
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand.purpleDark,

    width: 18,
    height: 18,

    borderWidth: 2,
    borderRadius: 999,
  },

  animContainer: {
    flex: 1,
    paddingLeft: 1,

    justifyContent: 'center',
    alignContent: 'center',
  }
})