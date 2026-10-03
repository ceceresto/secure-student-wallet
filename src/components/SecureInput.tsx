import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type SecureInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  label?: string;
  error?: string | null;
  placeholder?: string;
};

export function SecureInput({
  value,
  onChangeText,
  maxLength = 6,
  label,
  error,
  placeholder = '••••',
}: SecureInputProps) {
  const [visible, setVisible] = useState(false); // local UI state

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/\D/g, ''))} // digits only
          keyboardType="number-pad"
          secureTextEntry={!visible}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        <Pressable onPress={() => setVisible((v) => !v)} style={styles.toggle}>
          <Text style={styles.toggleText}>{visible ? 'Hide' : 'Show'}</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%', gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, textAlign: 'center', fontSize: 18, letterSpacing: 4,
  },
  inputError: { borderColor: '#c0392b' },
  toggle: { paddingHorizontal: 8, paddingVertical: 12 },
  toggleText: { color: '#2563eb', fontWeight: '600' },
  error: { color: '#c0392b', fontSize: 12 },
});





/*
OLD CODEEEE WAAAAAAHHHH

import { StyleSheet, TextInput } from 'react-native';

type SecureInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
};

export function SecureInput({ value, onChangeText, maxLength = 6 }: SecureInputProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="number-pad"
      secureTextEntry
      maxLength={maxLength}
      placeholder="••••"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, width: '100%', textAlign: 'center', fontSize: 18, letterSpacing: 4,
  },
});
*/