import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import type { TasksStorageProps } from "@storage/tasksStorage";

import { render, RenderOptions } from "@testing-library/react-native"
import { TasksProvider } from "@state/TasksContext";

const mockInitialStorage: TasksStorageProps = {
  tasks: [],
  lastId: 0
}

function Providers({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <TasksProvider initialTasks={mockInitialStorage}>
        {children}
      </TasksProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native';
export { customRender as render, Providers }