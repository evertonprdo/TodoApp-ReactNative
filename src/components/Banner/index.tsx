import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import Logo from "@assets/Logo";
import Animated, { SlideInUp } from "react-native-reanimated";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

export function Banner() {
  const Insets = useSafeAreaInsets();

  return (
    <AnimatedSafeAreaView
      style={[styles.container, { height: Insets.top + 150 }]}
      entering={SlideInUp.duration(730)}
    >
      <Logo style={styles.logo} />
    </AnimatedSafeAreaView>
  )
}