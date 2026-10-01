import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProfileData, deleteProfile, getProfile, saveProfile } from '../business/profileStorage';
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getProfile();
    if (data) {
      setProfile(data);
      setName(data.name);
      setCourse(data.course);
      setYear(data.year);
    }
  }

  async function handleSave() {
    if (!name || !course || !year) return; // simple validation
    const data = { name, course, year };
    await saveProfile(data);
    setProfile(data);
  }

  async function handleDelete() {
    await deleteProfile();
    setProfile(null);
    setName('');
    setCourse('');
    setYear('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {profile && <ProfileCard name={profile.name} course={profile.course} year={profile.year} />}

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Course</Text>
      <TextInput style={styles.input} placeholder="Enter your course" value={course} onChangeText={setCourse} />

      <Text style={styles.label}>Year</Text>
      <TextInput style={styles.input} placeholder="Enter your year level" value={year} onChangeText={setYear} />

      <Button title="Save" onPress={handleSave} />
      <View style={{ height: 8 }} />
      <Button title="Delete" onPress={handleDelete} color="#c0392b" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#333',
  },
});