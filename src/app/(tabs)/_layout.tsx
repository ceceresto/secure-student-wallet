import { Tabs, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { getProfile } from '@/business/profileStorage';
import { UserHeader } from '@/components/user-header';
import { useAppColors } from '@/hooks/use-app-colors';
import { useTheme } from '@/hooks/use-theme';

const DEFAULT_NAME = 'Student';

// Shows the name saved on the Profile tab. It reloads whenever the user
// switches tabs, so a newly saved name appears on the next tab change.
function TabHeader({ title }: { title?: string }) {
  const pathname = usePathname();
  const [name, setName] = useState(DEFAULT_NAME);

  useEffect(() => {
    getProfile()
      .then((profile) => setName(profile?.name || DEFAULT_NAME))
      .catch(() => setName(DEFAULT_NAME));
  }, [pathname]);

  return <UserHeader name={name} subtitle={title} withSafeArea />;
}

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
        header: ({ options }) => <TabHeader title={options.title} />,
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