import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFS_KEY = 'wallet:preferences';

export const DEFAULT_PREFERENCES = {
  biometricEnabled: false,
  notificationsEnabled: true,
  hideBalance: false,
  darkMode: false,
};

export const loadPreferences = async () => {
  try {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    return raw
      ? { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) }
      : DEFAULT_PREFERENCES;
  } catch (e) {
    console.warn('Failed to load preferences', e);
    return DEFAULT_PREFERENCES;
  }
};

export const savePreferences = async (prefs) => {
  try {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Failed to save preferences', e);
  }
};