import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Bearish from './components/Bearish';
import Highest from './components/Highest';
import Volumes from './components/Volumes';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bearish" component={Bearish} />
        <Stack.Screen name="Highest" component={Highest} />
        <Stack.Screen name="Volume" component={Volumes} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
});
