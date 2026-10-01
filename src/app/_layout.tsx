import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      </Stack>
    </>
  );
}