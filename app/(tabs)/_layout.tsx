import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../lib/theme';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.card,
        borderTopColor: theme.cardBorder,
        paddingBottom: 8,
        height: 60,
      },
      tabBarActiveTintColor: theme.accent,
      tabBarInactiveTintColor: theme.textMuted,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) =>
            <Ionicons name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Classement',
          tabBarIcon: ({ color }) =>
            <Ionicons name="trophy" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) =>
            <Ionicons name="person" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rh"
        options={{
          title: 'RH',
          tabBarIcon: ({ color }) =>
            <Ionicons name="bar-chart" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}