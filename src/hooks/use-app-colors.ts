import { usePreferences } from './use-preferences';

export function useAppColors() {
  const { prefs } = usePreferences();
  const dark = prefs.darkMode;

  return {
    dark,
    screen: dark ? '#111827' : '#ffffff',
    card: dark ? '#1f2937' : '#f1f5f9',
    text: dark ? '#f3f4f6' : '#0f172a',
    muted: dark ? '#9ca3af' : '#64748b',
    background: dark ? '#111827' : 'transparent',
    title: dark ? '#ffffff' : '#000000',
    label: dark ? '#e5e7eb' : '#333333',
    inputBorder: dark ? '#4b5563' : '#555555',
    inputBackground: dark ? '#1f2937' : 'transparent',
    inputText: dark ? '#ffffff' : '#333333',
    placeholder: dark ? '#9ca3af' : '#999999',
  };
}