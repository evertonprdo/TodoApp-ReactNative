import { Text, View } from "react-native";

import styles from "./styles";

export function TasksInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.created}>
          Criadas
        </Text>

        <Text style={styles.counter}>
          5
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.done}>
          Concluídas
        </Text>

        <Text style={styles.counter}>
          5
        </Text>
      </View>
    </View>
  )
}