import {
   Image,
   StyleProp,
   StyleSheet,
   Text,
   TextStyle,
   View,
} from 'react-native'

import Colors from '@styles/Colors'
import { FontFamily, FontSize } from '@styles/Fonts'

import ClipboardPng from '@assets/Clipboard.png'

export function EmptyComponent() {
   return (
      <View
         testID="empty-component"
         style={styles.container}
      >
         <Image source={ClipboardPng} />

         <Text style={styles.headline}>
            You do not have any registered tasks yet{'\n'}
            <Text style={styles.subHeadline}>
               Create tasks and organize your todo items
            </Text>
         </Text>
      </View>
   )
}

const text: StyleProp<TextStyle> = {
   color: Colors.gray[300],
   fontSize: FontSize.md,
   textAlign: 'center',
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',

      paddingHorizontal: 20,
      paddingVertical: 48,
      gap: 16,

      borderTopWidth: 1,
      borderTopColor: Colors.gray[400],
   },

   headline: {
      ...text,
      fontFamily: FontFamily.bold,
      lineHeight: FontSize.md * 1.5,
   },

   subHeadline: {
      ...text,
      fontFamily: FontFamily.regular,
   },
})
