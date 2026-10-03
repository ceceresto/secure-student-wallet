import { Camera } from 'expo-camera';
import { Linking } from 'react-native';

export type CameraAccess = 'undetermined' | 'granted' | 'denied' | 'blocked';

type PermissionLike = { granted: boolean; canAskAgain: boolean; status: string };

// Turns the raw OS response into one simple state the UI can use.
function toAccess(p: PermissionLike): CameraAccess {
  if (p.granted) return 'granted';
  if (!p.canAskAgain) return 'blocked'; // user denied permanently -> only Settings can fix it
  return p.status === 'denied' ? 'denied' : 'undetermined';
}

// 1) CHECK
export async function checkCameraAccess(): Promise<CameraAccess> {
  return toAccess(await Camera.getCameraPermissionsAsync());
}

// 2) REQUEST
export async function requestCameraAccess(): Promise<CameraAccess> {
  return toAccess(await Camera.requestCameraPermissionsAsync());
}

export function openAppSettings() {
  return Linking.openSettings();
}