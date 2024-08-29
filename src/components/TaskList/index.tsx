import { EmptyComponent } from "@components/EmptyComponent";
import { TasksInfo } from "@components/TasksInfo";
import { FlatList } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import styles from "./styles";

export function TaskList() {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.delay(555).duration(730)}
    >
      <TasksInfo />

      <FlatList
        data={[]}
        renderItem={() => null}
        contentContainerStyle={styles.contentList}
        ListEmptyComponent={() => <EmptyComponent />}
      />
    </Animated.View>
  )
}