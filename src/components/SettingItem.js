import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingItem({
  label,
  description,
  value,
  onValueChange,
  dark = false,
}) {
  return (
    <View style={[styles.row, dark && styles.rowDark]}>
      <View style={styles.textWrap}>
        <Text style={[styles.label, dark && styles.labelDark]}>{label}</Text>
        {!!description && (
          <Text style={[styles.desc, dark && styles.descDark]}>
            {description}
          </Text>
        )}
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
  rowDark: { borderColor: '#374151' },
  textWrap: { flex: 1, paddingRight: 12 },
  label: { fontSize: 16, fontWeight: '500' },
  labelDark: { color: '#fff' },
  desc: { fontSize: 13, color: '#666', marginTop: 2 },
  descDark: { color: '#9ca3af' },
});