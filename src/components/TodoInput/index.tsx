import { useRef, useState } from "react";
import { TextInput } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";

import styles from "./styles";
import { Input } from "@components/Input";
import { PressablePlusIcon } from "@components/PressablePlusIcon";
import { useTasks } from "@state/useTasks";

export function TodoInput() {
  const { dispatches } = useTasks();
  const [newTask, setNewTask] = useState("")

  const inputTaskRef = useRef<TextInput>(null)

  function handleOnAddTask() {
    dispatches.added(newTask)
    
    inputTaskRef.current?.blur();
    setNewTask("");
  }

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInRight.delay(333).duration(730)}
    >
      <Input
        ref={inputTaskRef}
        placeholder="Add a new task"
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={handleOnAddTask}
      />

      <PressablePlusIcon
        onPress={handleOnAddTask}
      />
    </Animated.View>
  )
}
