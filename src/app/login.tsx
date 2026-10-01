import { getPin, saveAuthToken, savePin } from '@/services/secureStorage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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

  function isValidPin(value: string) {
    return /^\d{4,6}$/.test(value);
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
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        placeholder="••••"
      />
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
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, width: '100%', textAlign: 'center', fontSize: 18, letterSpacing: 4,
  },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, width: '100%' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});