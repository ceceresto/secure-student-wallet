import { createContext, useContext, useEffect, useState } from 'react';
import {
    DEFAULT_PREFERENCES,
    loadPreferences,
    savePreferences,
} from '../services/preferencesStorage';

// TYPES: tells TypeScript what the context contains
/**
 * @typedef {{
 *   biometricEnabled: boolean,
 *   notificationsEnabled: boolean,
 *   hideBalance: boolean,
 *   darkMode: boolean
 * }} Preferences
 *
 * @typedef {{
 *   prefs: Preferences,
 *   setPref: (key: keyof Preferences, value: boolean) => void
 * }} PreferencesContextType
 */

// TYPES
/** @type {import('react').Context<PreferencesContextType>} */
const PreferencesContext = createContext({
  prefs: DEFAULT_PREFERENCES,
  setPref: () => {},
});

// TYPES
/** @param {{ children: import('react').ReactNode }} props */
export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  // Load saved preferences once when the app starts
  useEffect(() => {
    loadPreferences().then((saved) => {
      setPrefs(saved);
      setLoaded(true);
    });
  }, []);

  // Save whenever preferences change (only after the first load finishes)
  useEffect(() => {
    if (loaded) savePreferences(prefs);
  }, [prefs, loaded]);

  const setPref = (key, value) =>
    setPrefs((prev) => ({ ...prev, [key]: value }));

  return (
    <PreferencesContext.Provider value={{ prefs, setPref }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);