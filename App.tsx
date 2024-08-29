import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter"

import Home from '@screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <StatusBar
        style='light'
        backgroundColor='transparent'
        translucent
      />

      <Home />

    </SafeAreaProvider>
  );
}