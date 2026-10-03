import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { UserHeader } from '@/components/user-header';
import { useAppColors } from '@/hooks/use-app-colors';
import { useTheme } from '@/hooks/use-theme';

// TODO: replace with the name saved in the Profile screen once it exists.
const USER_NAME = 'Student';

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{symbol}</Text>;
}

export default function TabsLayout() {
  const theme = useTheme();
  const colors = useAppColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
           tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
           backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
        sceneStyle: { backgroundColor: colors.screen },
        header: ({ options }) => (
          <UserHeader name={USER_NAME} subtitle={options.title} withSafeArea />
        ),
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon symbol="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon symbol="👤" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="preferences"
        options={{
          title: 'Preferences',
          tabBarIcon: ({ focused }) => <TabIcon symbol="⚙️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => <TabIcon symbol="📷" focused={focused} />,
        }}
      />
    </Tabs>
  );
}