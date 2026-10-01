import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type UserHeaderProps = {
  /** Name shown in the greeting. */
  name: string;
  /** Optional label on the right, e.g. the current screen title. */
  subtitle?: string;
  /** Adds padding for the status bar / notch. Use it when the header sits at the very top. */
  withSafeArea?: boolean;
};

export function UserHeader({ name, subtitle, withSafeArea = false }: UserHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
          paddingTop: Spacing.three + (withSafeArea ? insets.top : 0),
        },
      ]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      <View style={styles.texts}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>

      {subtitle ? (
        <View style={styles.pill}>
          <Text style={styles.pillText}>{subtitle}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  texts: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  name: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: Spacing.one + Spacing.half,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
  },
  pillText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});