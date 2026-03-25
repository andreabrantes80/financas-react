import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import AuthProvider from "./src/contexts/auth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <View>
          <StatusBar style="dark" />
        </View>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}