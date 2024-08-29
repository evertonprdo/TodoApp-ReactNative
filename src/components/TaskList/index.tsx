import { EmptyComponent } from "@components/EmptyComponent";
import { TasksInfo } from "@components/TasksInfo";
import { FlatList } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import styles from "./styles";
import { Task } from "@components/Task";

export function TaskList() {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.delay(555).duration(730)}
    >
      <TasksInfo />

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={() => (
          <Task/>
        )}
        contentContainerStyle={styles.contentList}
        ListEmptyComponent={() => <EmptyComponent />}
      />
    </Animated.View>
  )
}