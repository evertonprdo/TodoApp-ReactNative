import { View } from "react-native";

import styles from "./styles";

import { Banner } from "@components/Banner";
import { TodoInput } from "@components/TodoInput";
import { TaskList } from "@components/TaskList";

export default function Home() {
  return (
    <View style={styles.container}>
      <Banner />

      <View style={styles.content}>

        <TodoInput/>

        <TaskList/>
      </View>
    </View>
  )
}