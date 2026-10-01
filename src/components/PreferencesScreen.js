import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  savePreferences,
} from '../services/preferencesStorage';
import SettingItem from './SettingItem';

export default function PreferencesScreen() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPreferences().then((saved) => {
      setPrefs(saved);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      savePreferences(prefs);
    }
  }, [prefs, loaded]);

  const toggle = (key) => (value) => {
    console.log('toggled', key, value);
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.section}>Security</Text>
      <SettingItem
        label="Biometric login"
        description="Use fingerprint or Face ID"
        value={prefs.biometricEnabled}
        onValueChange={toggle('biometricEnabled')}
      />
      <SettingItem
        label="Hide balance"
        description="Mask your balance on the dashboard"
        value={prefs.hideBalance}
        onValueChange={toggle('hideBalance')}
      />

      <Text style={styles.section}>General</Text>
      <SettingItem
        label="Notifications"
        value={prefs.notificationsEnabled}
        onValueChange={toggle('notificationsEnabled')}
      />
      <SettingItem
        label="Dark mode"
        value={prefs.darkMode}
        onValueChange={toggle('darkMode')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  section: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 6,
  },
});