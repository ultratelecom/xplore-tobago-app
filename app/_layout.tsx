import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Intro' }} />
      <Stack.Screen name="home" options={{ title: 'Home' }} />
    </Stack>
  );
} 