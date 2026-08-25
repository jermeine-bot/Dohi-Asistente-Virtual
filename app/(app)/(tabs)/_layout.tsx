import React from 'react';
import { Tabs } from 'expo-router';
import { CustomTabBar } from '../../../src/components/navigation/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Citas',
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Salud',
        }}
      />
      <Tabs.Screen
        name="dohi"
        options={{
          title: 'Dohi',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
        }}
      />
    </Tabs>
  );
}
