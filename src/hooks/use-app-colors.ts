import { usePreferences } from './use-preferences';

// One place for light and dark colors. Any screen can call useAppColors().
export function useAppColors() {
  const { prefs } = usePreferences();
  const dark = prefs.darkMode;

  return {
    dark,
    background: dark ? '#111827' : 'transparent',
    title: dark ? '#ffffff' : '#000000',
    label: dark ? '#e5e7eb' : '#333333',
    inputBorder: dark ? '#4b5563' : '#555555',
    inputBackground: dark ? '#1f2937' : 'transparent',
    inputText: dark ? '#ffffff' : '#333333',
    placeholder: dark ? '#9ca3af' : '#999999',
  };
}