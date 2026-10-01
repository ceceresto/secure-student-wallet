import { isValidPin } from '@/business/auth';
import { SecureInput } from '@/components/SecureInput';
import { getPin, saveAuthToken, savePin } from '@/services/secureStorage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<'setup' | 'login'>('setup');
  const [existingPin, setExistingPin] = useState<string | null>(null);

  useEffect(() => {
    getPin().then((stored) => {
      if (stored) {
        setExistingPin(stored);
        setMode('login');
      }
    });
  }, []);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  title: { fontSize: 20, fontWeight: '600' },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, width: '100%' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});