import { useState } from "react";
import { View } from "react-native";

import styles from "./styles";
import { Checkbox } from "@components/Checkbox";
import { PressableTrashIcon } from "@components/PressableTrashIcon";
import { PressablePencilIcon } from "@components/PressablePencilIcon";
import { InputTask } from "@components/InputTask";

export function Task() {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false)

  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        onChangeValue={setIsChecked}
      />

      <InputTask
        isConcluded={true}
        editable={true}
        value="Teste de TODO com maior numero de palavras para validar a dispo"
      />

      <PressablePencilIcon
        isOnFocus={isEditing}
        onPress={() => setIsEditing(!isEditing)}
      />
      <PressableTrashIcon />
    </View>
  )
}