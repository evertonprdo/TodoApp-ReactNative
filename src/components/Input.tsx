import { StyleSheet, TextInput, TextInputProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import Colors from "@styles/Colors";
import { FontFamily, FontSize } from "@styles/Fonts";
import { forwardRef } from "react";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const AnimationConfig = {
  duration: 730,
  easing: Easing.out(Easing.ease)
}

export const Input = forwardRef<TextInput, TextInputProps>(
  ({ ...props }, ref) => {
    const svIsOnBluer = useSharedValue(true);

    const animatedStyles = useAnimatedStyle(() => ({
      borderColor: svIsOnBluer.value
        ? withTiming(Colors.gray[700])
        : withSequence(
          withTiming(Colors.brand.purple, AnimationConfig),
          withRepeat(withTiming(Colors.brand.purpleDark, AnimationConfig), -1, true)
        )
    }));

    return (
      <AnimatedTextInput
        ref={ref}
        placeholderTextColor={Colors.gray[300]}
        cursorColor={Colors.gray[100]}
        onFocus={() => svIsOnBluer.value = false}
        onBlur={() => svIsOnBluer.value = true}
        style={[styles.container, animatedStyles]}
        returnKeyType={"done"}
        {...props}
      />
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,

    backgroundColor: Colors.gray[500],

    color: Colors.gray[100],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.lg,

    borderWidth: 1,
    borderRadius: 8,
  },
})