import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Bearish from './components/Bearish';
import Highest from './components/Highest';
import Volumes from './components/Volumes';

//initializing the navigator
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#11549c',
            color: '#fff'
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center'
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Home'
        }}/>
        <Stack.Screen 
          name="Bearish" 
          component={Bearish} 
          options={{
            title: 'Longest bearish'
          }}/>
        <Stack.Screen 
          name="Highest" 
          component={Highest} 
          options={{
            title: 'Best days to sell & buy'
          }}/>
        <Stack.Screen 
        name="Volume" 
        component={Volumes} 
          options={{
            title: 'Highest selling volume'
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
});
