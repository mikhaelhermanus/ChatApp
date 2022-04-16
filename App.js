import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './src/Styles/Color'
//screen
import Login from './src/screen/Auth/Login';
import ChatScreen from './src/screen/Chat/ChatSreen';
import Register from './src/screen/Auth/Register'
import DashboardUser from './src/screen/Chat/DashboardUser';
import { NativeBaseProvider } from 'native-base';
const Stack = createStackNavigator()

export default function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.white },
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatScreen" component={ChatScreen}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="DashboardUser" component={DashboardUser}/>
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  )
}