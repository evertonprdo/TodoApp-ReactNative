import { Fragment, useEffect, useRef, useState } from "react";
import Animated, { Easing, SlideInRight, SlideOutLeft, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import Colors from "@styles/Colors";

import Pencil from "@assets/Pencil";
import Check from "@assets/Check";
import XCircle from "@assets/XCircle";

import styles from "./styles";
import { Checkbox } from "@components/Checkbox";
import { PressableTrashIcon } from "@components/PressableTrashIcon";
import { PressableIcon } from "@components/PressableIcon";
import { InputTask } from "@components/InputTask";
import { TextInput, View } from "react-native";

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
  const { dispatches } = useTasks()

  const [isEditing, setIsEditing] = useState(false)
  const [localText, setLocalText] = useState(task.text)

  const svIsOnBlur = useSharedValue(true)

  const animatedStyles = useAnimatedStyle(() => ({
    borderColor: svIsOnBlur.value
      ? withTiming(Colors.gray[400])
      : withSequence(
        withTiming(Colors.brand.purple, AnimationConfig),
        withRepeat(withTiming(Colors.brand.purpleDark, AnimationConfig), -1, true)
      )
  }));

  const inputTaskRef = useRef<TextInput>(null)

  function handleOnFocus() {
    const cursorPosition = task.text.length
    inputTaskRef.current?.setSelection(cursorPosition, cursorPosition)

    svIsOnBlur.value = false
  }

  function handleOnPressEdit() {
    if (task.done) return

    if (isEditing)
      return setIsEditing(false)

    setIsEditing(true);
  }

  function handleSubmit() {
    setIsEditing(false)

    svIsOnBlur.value = true

    dispatches.textChanged(task.id, localText)
  }

  function handleCancelEdit() {
    setIsEditing(false)

    svIsOnBlur.value = true
    setLocalText(task.text)
  }

  function handleUpdateTask() {
    dispatches.updated(task.id)
  }

  function handleDeleteTask() {
    dispatches.deleted(task.id)
  }

  useEffect(() => {
    if (isEditing)
      inputTaskRef.current?.focus();

  }, [isEditing])

  return (
    <Animated.View
      testID="task-component"
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
        value={localText}
        isCompleted={task.done}
        editable={isEditing}
        onChangeText={setLocalText}
        onSubmitEditing={handleSubmit}
        onFocus={handleOnFocus}
      />

      <View style={styles.btnContainer}>
        {isEditing ? (
          <Fragment>
            <PressableIcon
              icon={Check}
              onPress={handleSubmit}
            />
            <PressableIcon
              icon={XCircle}
              onPress={handleCancelEdit}
            />
          </Fragment>
        ) : (
          <Fragment>
            <PressableIcon
              icon={Pencil}
              onPress={handleOnPressEdit}
            />
            <PressableTrashIcon
              onPress={handleDeleteTask}
            />
          </Fragment>
        )}
      </View>
    </Animated.View >
  )
}