import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.miffySeconday,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: { position: 'absolute', backgroundColor: '#FFEBEF' },
      }}>
      <Tabs.Screen
        name="daily"
        options={{
          title: 'Daily Puzzle',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="gamecontroller.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
