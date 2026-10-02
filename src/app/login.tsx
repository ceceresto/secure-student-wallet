import { isValidPin } from '@/business/auth';
import { SecureInput } from '@/components/SecureInput';
import { usePreferences } from '@/hooks/use-preferences'; // BIOMETRIC 
import { notify } from '@/services/notifications'; // NOTIFICATIONS
import { getPin, saveAuthToken, savePin } from '@/services/secureStorage';
import * as LocalAuthentication from 'expo-local-authentication'; // BIOMETRIC
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native'; // BIOMETRIC

// BIOMETRIC
function showMessage(title: string, message: string) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export default function Login() {
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<'setup' | 'login'>('setup');
  const [existingPin, setExistingPin] = useState<string | null>(null);
  const { prefs } = usePreferences(); // BIOMETRIC + NOTIFICATIONS


  useEffect(() => {
    getPin().then((stored) => {
      if (stored) {
        setExistingPin(stored);
        setMode('login');
      }
    });
  }, []);
  
   // BIOMETRIC: fingerprint / Face ID unlock
  async function handleBiometric() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !enrolled) {
      showMessage('Not available', 'Biometrics are not set up on this device. Use your PIN.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock your wallet',
      fallbackLabel: 'Use PIN',
    });
    if (result.success) {
      await saveAuthToken('demo-token-' + Date.now());
      await notify(prefs.notificationsEnabled, 'Welcome back', 'You are signed in.'); // NOTIFICATIONS
      router.replace('/dashboard');
    }
  }

  async function handleSubmit() {
    if (!isValidPin(pin)) {
      Alert.alert('Invalid PIN', 'PIN must be 4–6 digits.');
      return;
    }

    if (mode === 'setup') {
      await savePin(pin);
      await saveAuthToken('demo-token-' + Date.now());
      router.replace('/dashboard');
      return;
    }

    if (pin === existingPin) {
      await saveAuthToken('demo-token-' + Date.now());
      router.replace('/dashboard');
    } else {
      Alert.alert('Incorrect PIN', 'Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'setup' ? 'Create your PIN' : 'Enter your PIN'}
      </Text>
      <SecureInput value={pin} onChangeText={setPin} maxLength={6} />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {mode === 'setup' ? 'Set PIN' : 'Login'}
        </Text>
      </Pressable>

       {/* NEW: only shows when Biometric login is ON in Preferences */}
      {mode === 'login' && prefs.biometricEnabled && (
        <Pressable style={styles.bioButton} onPress={handleBiometric}>
          <Text style={styles.bioText}>Use fingerprint / Face ID</Text>
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  title: { fontSize: 20, fontWeight: '600' },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, width: '100%' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  bioButton: { padding: 14, borderRadius: 8, width: '100%', borderWidth: 1, borderColor: '#2563eb' }, // BIOMETRIC
  bioText: { color: '#2563eb', textAlign: 'center', fontWeight: '600' }, // BIOMETRIC
});