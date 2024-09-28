import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter"

import Home from '@screens/Home';

import { Loading } from '@components/Loading';
import { TasksProvider } from '@state/TasksContext';
import { getStorageTasks, TasksStorageProps } from '@storage/tasksStorage';

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });
  const [storageTasks, setStorageTasks] = useState<TasksStorageProps | undefined>()

  useEffect(() => {
    getStorageTasks().then(data => setStorageTasks(data))
  }, [])

  if (!(fontsLoaded && storageTasks)) return <Loading/>

  return (
    <SafeAreaProvider>
      <StatusBar
        style='light'
        backgroundColor='transparent'
        translucent
      />
      <TasksProvider initialTasks={storageTasks}>
        <Home />
      </TasksProvider>
    </SafeAreaProvider>
  );
}