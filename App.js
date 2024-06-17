import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/Screens/Home';
import Explorepage from './src/Screens/ExplorePage';
import Camera from './src/Screens/Camera';
import SignIn from './src/Screens/SignIn';
import SignUp from './src/Screens/SignUp';
import ProfileSetup from './src/Screens/ProfileSetup';
import Loading from './src/Components/Loading';
import CameraStyling from './src/Screens/CameraStyling';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f2f2f2',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explorepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AuthStack() { // Stack for auth screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialScreen, setInitialScreen] = useState('Loading');

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        setInitialScreen(userData ? 'Main' : 'AuthStack');
      } catch (error) {
        console.error('Error checking user session:', error);
        setInitialScreen('AuthStack'); // Default to Auth on error
      }
    };
    checkUserSession();
  }, []); 



  return (
    <NavigationContainer>
    {initialScreen === 'Loading' ? (
      <Loading /> 
    ) : (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="CameraStyling" component={CameraStyling}options={{ headerShown: false }} />
      </Stack.Navigator>
    )}
  </NavigationContainer>
  );
}