import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import Animated, { LinearTransition, SlideInDown } from "react-native-reanimated";

import styles from "./styles";
import { Task } from "@components/Task";
import { EmptyComponent } from "@components/EmptyComponent";
import { TasksInfo } from "@components/TasksInfo";

import Colors from "@styles/Colors";
import { useTasks } from "@state/useTasks";

export function TaskList() {
  const { tasks, dispatch } = useTasks();
  const [refreshing, setRefreshing] = useState(false);

  const createdCount = tasks.length
  const doneCount = tasks.filter(task => task.done).length

  useEffect(() => {
    if (refreshing) {
      dispatch({ type: "refresh" })
      setRefreshing(false);
    }
  }, [refreshing]);

  function handleRefresh() {
    setRefreshing(true);
  };

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.delay(555).duration(730)}
    >
      <TasksInfo
        createdCount={createdCount}
        doneCount={doneCount}
      />

      <Animated.FlatList
        testID="task-list"
        data={tasks}
        keyExtractor={item => `Key_${item.id}`}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition.springify()}

        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            tintColor={Colors.gray[200]}
            colors={[Colors.gray[200]]}
            progressBackgroundColor={Colors.gray[400]}
          />
        }

        ListEmptyComponent={() => <EmptyComponent />}

        renderItem={({ item }) => (
          <Task
            task={item}
          />
        )}
      />
    </Animated.View>
  )
}