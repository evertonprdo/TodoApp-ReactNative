import { PropsWithChildren, ReactElement } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { render, RenderOptions } from "@testing-library/react-native"
import { TasksProvider } from "@state/TasksContext";
import { mockInitialStorage } from "@__tests__/mocks/mockInitialTasks";

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
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native';
export { customRender as render, Providers }