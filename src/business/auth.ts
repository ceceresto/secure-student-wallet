import { clearSensitiveInfo } from '@/services/secureStorage';
import { router } from 'expo-router';

export async function handleLogout() {
  await clearSensitiveInfo();
  router.replace('/login');
}