import { ScrollView, StyleSheet, Text } from 'react-native';
import { usePreferences } from '../hooks/use-preferences';
import SettingItem from './SettingItem';

export default function PreferencesScreen() {
  const { prefs, setPref } = usePreferences();
  const dark = prefs.darkMode;
  const toggle = (key) => (value) => setPref(key, value);

  return (
    <ScrollView style={[styles.container, dark && styles.containerDark]}>
      <Text style={[styles.section, dark && styles.sectionDark]}>Security</Text>
      <SettingItem
        label="Biometric login"
        description="Use fingerprint or Face ID"
        value={prefs.biometricEnabled}
        onValueChange={toggle('biometricEnabled')}
        dark={dark}
      />
      <SettingItem
        label="Hide balance"
        description="Mask your balance on the dashboard"
        value={prefs.hideBalance}
        onValueChange={toggle('hideBalance')}
        dark={dark}
      />

      <Text style={[styles.section, dark && styles.sectionDark]}>General</Text>
      <SettingItem
        label="Notifications"
        value={prefs.notificationsEnabled}
        onValueChange={toggle('notificationsEnabled')}
        dark={dark}
      />
      <SettingItem
        label="Dark mode"
        value={prefs.darkMode}
        onValueChange={toggle('darkMode')}
        dark={dark}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  containerDark: { backgroundColor: '#111827' },
  section: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 6,
  },
  sectionDark: { color: '#9ca3af' },
});