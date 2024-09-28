import AsyncStorage from "@react-native-async-storage/async-storage"
import { getStorageTasks, percistStorageTasks } from "./tasksStorage"

describe("Storage: Tasks Storage", () => {
  beforeEach(async () => {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
  })

  it("should not return any task and the last id has to be 0", async () => {
    const response = await getStorageTasks()

    expect(response?.tasks).toHaveLength(0)
    expect(response?.lastId).toEqual(0)
  })

  it("should be return task storaged", async () => {
    const task = { id: 1, text: 'new-task', done: false }
    await percistStorageTasks({
      tasks: [task],
      lastId: 1
    })

    const data = await getStorageTasks()

    expect(data?.tasks).toHaveLength(1)
    expect(data?.tasks).toEqual([task])
    expect(data?.lastId).toEqual(1)
  })
})