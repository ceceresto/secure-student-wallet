import { createContext, useContext, useEffect, useState } from 'react';
import {
    DEFAULT_PREFERENCES,
    loadPreferences,
    savePreferences,
} from '../services/preferencesStorage';

const PreferencesContext = createContext({
  prefs: DEFAULT_PREFERENCES,
  setPref: () => {},
});

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPreferences().then((saved) => {
      setPrefs(saved);
      setLoaded(true);
    });
  }, []);

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