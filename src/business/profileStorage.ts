import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'profile_data';

export type ProfileData = {
  name: string;
  course: string;
  year: string;
};

export async function saveProfile(data: ProfileData): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

export async function getProfile(): Promise<ProfileData | null> {
  const json = await AsyncStorage.getItem(PROFILE_KEY);
  return json ? JSON.parse(json) : null;
}

export async function deleteProfile(): Promise<void> {
  await AsyncStorage.removeItem(PROFILE_KEY);
}