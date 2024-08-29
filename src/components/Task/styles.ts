import Colors from "@styles/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 8,
    gap: 8,

    backgroundColor: Colors.gray[500],
    borderColor: Colors.gray[400],
    borderRadius: 8,
    borderWidth: 1,
  },
  content: {
    flex: 1
  }
})

export default styles