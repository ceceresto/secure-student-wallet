import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingItem({
  label,
  description,
  value,
  onValueChange,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{label}</Text>
        {!!description && <Text style={styles.desc}>{description}</Text>}
      </View>
      <Switch
        value={!!value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ccc', true: '#2563eb' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  textWrap: { flex: 1, paddingRight: 12 },
  label: { fontSize: 16, fontWeight: '500' },
  desc: { fontSize: 13, color: '#666', marginTop: 2 },
});