import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { FontFamily, FontSize } from "@styles/Fonts";
import Colors from "@styles/Colors";
import { forwardRef } from "react";

type Props = TextInputProps & {
  isConcluded?: boolean
}

export const InputTask = forwardRef<TextInput, Props>(
  ({ isConcluded, ...props }, ref) => {

    return (
      <TextInput
        ref={ref}
        cursorColor={Colors.gray[100]}
        style={[
          styles.container,
          isConcluded ? styles.done : styles.notDone
        ]}
        spellCheck={false}
        autoCorrect={false}
        multiline
        enterKeyHint="done"
        blurOnSubmit
        {...props}
      />
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    textAlign: "justify",
  },

  done: {
    color: Colors.gray[300],
    textDecorationLine: "line-through"
  },
  notDone: {
    color: Colors.gray[100],
  },
})