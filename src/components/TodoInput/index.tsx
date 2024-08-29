import styles from "./styles";
import { Input } from "@components/Input";
import { PressablePlusIcon } from "@components/PressablePlusIcon";
import Animated, { SlideInRight } from "react-native-reanimated";

export function TodoInput() {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInRight.delay(333).duration(730)}
    >
      <Input />
      <PressablePlusIcon />

    </Animated.View>
  )
}