import { useEffect, useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native'; // VALIDATION (added Alert, Platform)
import { ProfileData, deleteProfile, getProfile, saveProfile } from '../../business/profileStorage';
import { validateProfile } from '../../business/validation'; // VALIDATION
import ProfileCard from '../../components/ProfileCard';
import { useAppColors } from '../../hooks/use-app-colors'; // DARK MODE

// VALIDATION: Alert.alert does nothing on web, so use window.alert there
function showMessage(title: string, message: string) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const colors = useAppColors(); // DARK MODE

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
    // VALIDATION: stricter profile rules from the business layer
    const result = validateProfile({ name, course, year });
    if (!result.valid) {
      showMessage('Check your info', Object.values(result.errors).join('\n'));
      return;
    }

    const data = { name: name.trim(), course: course.trim(), year: year.trim() }; // VALIDATION (trimmed)
    await saveProfile(data);
    setProfile(data);
  }

  async function handleDelete() {
    // DELETE CHECK: nothing saved, so there is nothing to delete
    if (!profile) {
      showMessage('Nothing to delete', 'There is no saved profile to delete.');
      return;
    }

    await deleteProfile();
    setProfile(null);
    setName('');
    setCourse('');
    setYear('');
  }

  const inputStyle = [
    styles.input,
    { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground, color: colors.inputText },
  ]; // DARK MODE

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>{/* DARK MODE */}
      <Text style={[styles.title, { color: colors.title }]}>Profile</Text>{/* DARK MODE */}

      {profile && <ProfileCard name={profile.name} course={profile.course} year={profile.year} />}

      <Text style={[styles.label, { color: colors.label }]}>Name</Text>{/* DARK MODE */}
      <TextInput
        style={inputStyle} // DARK MODE
        placeholder="Enter your name"
        placeholderTextColor={colors.placeholder} // DARK MODE
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, { color: colors.label }]}>Course</Text>{/* DARK MODE */}
      <TextInput
        style={inputStyle} // DARK MODE
        placeholder="Enter your course"
        placeholderTextColor={colors.placeholder} // DARK MODE
        value={course}
        onChangeText={setCourse}
      />

      <Text style={[styles.label, { color: colors.label }]}>Year</Text>{/* DARK MODE */}
      <TextInput
        style={inputStyle} // DARK MODE
        placeholder="Enter your year level"
        placeholderTextColor={colors.placeholder} // DARK MODE
        value={year}
        onChangeText={setYear}
      />

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
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});