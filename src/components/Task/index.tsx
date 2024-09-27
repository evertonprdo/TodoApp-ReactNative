import { useEffect, useRef, useState } from "react";
import Animated, { Easing, SlideInRight, SlideOutLeft, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import Colors from "@styles/Colors";

import styles from "./styles";
import { Checkbox } from "@components/Checkbox";
import { PressableTrashIcon } from "@components/PressableTrashIcon";
import { PressablePencilIcon } from "@components/PressablePencilIcon";
import { InputTask } from "@components/InputTask";
import { TextInput } from "react-native";

import { TaskProps } from "@state/types";
import { useTasks } from "@state/useTasks";

const AnimationConfig = {
  duration: 730,
  easing: Easing.out(Easing.ease)
}

type Props = {
  task: TaskProps
}

export function Task({ task }: Props) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const svIsOnBluer = useSharedValue(true);

  const animatedStyles = useAnimatedStyle(() => ({
    borderColor: svIsOnBluer.value
      ? withTiming(Colors.gray[400])
      : withSequence(
        withTiming(Colors.brand.purple, AnimationConfig),
        withRepeat(withTiming(Colors.brand.purpleDark, AnimationConfig), -1, true)
      )
  }));

  const inputTaskRef = useRef<TextInput>(null)

  function handleOnFocus() {
    const cursorPostion = task.text.length
    inputTaskRef.current?.setSelection(cursorPostion, cursorPostion)

    svIsOnBluer.value = false
  }

  function handleOnPressEdit() {
    if (task.done) return

    if (isEditing)
      return setIsEditing(false)

    setIsEditing(true);
  }

  function handleOnSubmit() {
    setIsEditing(false)

    svIsOnBluer.value = true
  }

  function handleUpdateTask() {
    dispatch({
      type: 'updated',
      params: { id: task.id }
    })
  }

  function handleDeleteTask() {
    dispatch({
      type: 'deleted',
      params: { id: task.id }
    });
  }

  function handleChangeTask(text: string) {
    dispatch({
      type: 'text_changed',
      params: { id: task.id, text }
    });
  }

  useEffect(() => {
    if (isEditing)
      inputTaskRef.current?.focus();

  }, [isEditing])

  return (
    <Animated.View
      style={[styles.container, animatedStyles]}
      entering={SlideInRight}
      exiting={SlideOutLeft}
    >
      <Checkbox
        value={task.done}
        onChangeValue={handleUpdateTask}
      />

      <InputTask
        ref={inputTaskRef}
        value={task.text}
        isCompleted={task.done}
        editable={isEditing}
        onChangeText={handleChangeTask}
        onSubmitEditing={handleOnSubmit}
        onFocus={handleOnFocus}
        onBlur={handleOnSubmit}
      />

      <PressablePencilIcon
        isOnFocus={isEditing}
        onPress={handleOnPressEdit}
      />
      <PressableTrashIcon
        onPress={handleDeleteTask}
      />
    </Animated.View>
  )
}