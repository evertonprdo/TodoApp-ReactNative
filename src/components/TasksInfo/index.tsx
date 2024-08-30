import { Text, View } from "react-native";

import styles from "./styles";

type Props = {
  createdCount: number
  doneCount: number
}

export function TasksInfo({ createdCount, doneCount }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.created}>
          Criadas
        </Text>

        <Text style={styles.counter}>
          {createdCount}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.done}>
          Concluídas
        </Text>

        <Text style={styles.counter}>
          {doneCount}
        </Text>
      </View>
    </View>
  )
}