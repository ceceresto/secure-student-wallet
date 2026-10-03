import { clearAuthToken, clearSensitiveInfo } from '@/services/secureStorage';
import { router } from 'expo-router';

export function isValidPin(value: string): boolean {
  return /^\d{4,6}$/.test(value);
}

export async function handleLogout() {
  await clearAuthToken();
  router.replace('/login');
}

export async function handleForgetPin() {
  await clearSensitiveInfo();
  router.replace('/login');
}