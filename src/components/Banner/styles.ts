import Colors from "@styles/Colors";
import { StyleSheet } from "react-native";

const SetbackMargin = -32

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    width: "100%",
    marginBottom: SetbackMargin,

    backgroundColor: Colors.gray[700]
  },
  logo: { marginTop: SetbackMargin }
})

export default styles