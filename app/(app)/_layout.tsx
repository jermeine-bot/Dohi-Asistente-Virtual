import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="medications/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="book-appointment/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="virtual-consultation/index" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="weight/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="scanner/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="documents/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="health-centers/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="wellness/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="wellness/emotional" options={{ presentation: 'card' }} />
      <Stack.Screen name="wellness/physical" options={{ presentation: 'card' }} />
      <Stack.Screen name="first-aid/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="appointment-assistant/index" options={{ presentation: 'card' }} />
    </Stack>
  );
}
