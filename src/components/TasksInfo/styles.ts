import { StyleSheet } from "react-native";

import Colors from "@styles/Colors";
import { FontFamily, FontSize } from "@styles/Fonts";

const text = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.md
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },

  content: {
    flexDirection: 'row',
    gap: 8
  },

  counter: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,

    backgroundColor: Colors.gray[400],

    color: Colors.gray[200],
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold
  },

  created: {
    ...text,
    color: Colors.brand.blue
  },

  done: {
    ...text,
    color: Colors.brand.purple
  }
})

export default styles