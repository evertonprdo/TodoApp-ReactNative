import AsyncStorage from "@react-native-async-storage/async-storage"
import { TaskProps } from "@state/types";

export type TasksStorageProps = {
  tasks: TaskProps[]
  lastId: number
}

const TASKS_COLLECTION = '@todoapp:tasks'

export async function getStorageTasks() {
  try {
    const storage = await AsyncStorage.getItem(TASKS_COLLECTION);
    let data: TasksStorageProps = storage
      ? JSON.parse(storage)
      : { tasks: [], lastId: 0 }

    data.tasks = data.tasks.sort((a, b) => {
      return Number(a.done) - Number(b.done)
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function percistStorageTasks(tasks: TasksStorageProps) {
  try {
    AsyncStorage.setItem(TASKS_COLLECTION, JSON.stringify(tasks))

  } catch (error) {
    console.log(error)
  }
}