import { StyleSheet, Text, View } from 'react-native';

type ProfileCardProps = {
  name: string;
  course: string;
  year: string;
};

export default function ProfileCard({ name, course, year }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>{course}</Text>
      <Text style={styles.detail}>{year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detail: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
});
