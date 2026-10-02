import { usePreferences } from './use-preferences';

export function useColorScheme(): 'light' | 'dark' {
  const { prefs } = usePreferences();
  return prefs.darkMode ? 'dark' : 'light';
}