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