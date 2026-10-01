import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const PIN_KEY = 'user_pin';
const AUTH_TOKEN_KEY = 'auth_token';

async function setItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
}

async function deleteItem(key: string) {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function savePin(pin: string): Promise<void> {
  await setItem(PIN_KEY, pin);
}

export async function getPin(): Promise<string | null> {
  return await getItem(PIN_KEY);
}

export async function saveAuthToken(token: string): Promise<void> {
  await setItem(AUTH_TOKEN_KEY, token);
}

export async function getAuthToken(): Promise<string | null> {
  return await getItem(AUTH_TOKEN_KEY);
}

export async function clearSensitiveInfo(): Promise<void> {
  await deleteItem(PIN_KEY);
  await deleteItem(AUTH_TOKEN_KEY);
}