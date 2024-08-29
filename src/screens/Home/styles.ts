import Colors from "@styles/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[600],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32
  }
})

export default styles