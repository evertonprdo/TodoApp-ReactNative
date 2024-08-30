import Colors from "@styles/Colors";
import { ActivityIndicator, StyleSheet } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator
      style={styles.container}
      color={Colors.brand.purple}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.gray[600]
  }
})