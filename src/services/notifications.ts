import { Alert, Platform } from 'react-native';

// Shows an in-app message only if the Notifications preference is ON.
export async function notify(enabled: boolean, title: string, body: string) {
  if (!enabled) return;
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${body}`);
  } else {
    Alert.alert(title, body);
  }
}