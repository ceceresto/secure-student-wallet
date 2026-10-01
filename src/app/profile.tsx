import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { ProfileData, deleteProfile, getProfile, saveProfile } from '../business/profileStorage';

export default function Dashboard() {
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

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Year" value={year} onChangeText={setYear} />

      <Button title="Save" onPress={handleSave} />
      <View style={{ height: 8 }} />
      <Button title="Delete" onPress={handleDelete} color="#c0392b" /> 
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#fff',
  },
});