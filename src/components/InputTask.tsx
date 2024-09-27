import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { FontFamily, FontSize } from "@styles/Fonts";
import Colors from "@styles/Colors";
import { forwardRef } from "react";

type Props = TextInputProps & {
  isCompleted?: boolean
}

export const InputTask = forwardRef<TextInput, Props>(
  ({ isCompleted, ...props }, ref) => {
    return (
      <TextInput
        testID="input-task"
        ref={ref}
        cursorColor={Colors.gray[100]}
        style={[
          styles.container,
          isCompleted ? styles.done : styles.notDone
        ]}
        spellCheck={false}
        autoCorrect={false}
        enterKeyHint="done"
        blurOnSubmit
        multiline
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