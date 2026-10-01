import { clearSensitiveInfo } from '@/services/secureStorage';
import { router } from 'expo-router';

export function isValidPin(value: string): boolean {
  return /^\d{4,6}$/.test(value);
}

export async function handleLogout() {
  await clearSensitiveInfo();
  router.replace('/login');
}