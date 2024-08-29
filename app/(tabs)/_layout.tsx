import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Quotes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'book' : 'book-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Adding',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
