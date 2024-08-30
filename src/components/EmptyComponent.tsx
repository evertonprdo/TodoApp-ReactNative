import { Image, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

import Colors from "@styles/Colors";
import { FontFamily, FontSize } from "@styles/Fonts";

import ClipboardPng from "@assets/Clipboard.png"

export function EmptyComponent() {
  return (
    <View style={styles.container}>
      <Image source={ClipboardPng}/>

      <Text style={styles.headline}>
        Você ainda não tem tarefas cadastradas{'\n'}
        
        <Text style={styles.subHeadline}>
          Crie tarefas e organize seus itens a fazer
        </Text>
      </Text>
    </View>
  )
}

const text: StyleProp<TextStyle> = {
  color: Colors.gray[300],
  fontSize: FontSize.md,
  textAlign: "center",
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    
    paddingHorizontal: 20,
    paddingVertical: 48,
    gap: 16,

    borderTopWidth: 1,
    borderTopColor: Colors.gray[400]
  },

  headline: {
    ...text,
    fontFamily: FontFamily.bold,
  },

  subHeadline: {
    ...text,
    fontFamily: FontFamily.regular,
  }
})