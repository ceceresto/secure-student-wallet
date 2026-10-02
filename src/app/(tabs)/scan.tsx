import { CameraView } from 'expo-camera';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProfileData, saveProfile } from '@/business/profileStorage';
import { parseStudentQr } from '@/business/qrParser';
import ProfileCard from '@/components/ProfileCard';
import {
    CameraAccess,
    checkCameraAccess,
    openAppSettings,
    requestCameraAccess,
} from '@/services/cameraPermission';

export default function Scan() {
  const [access, setAccess] = useState<CameraAccess>('undetermined');
  const [focused, setFocused] = useState(false);
  const [scanned, setScanned] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const locked = useRef(false); // stops the scanner firing many times per second

  // Runs every time the tab is opened: re-check permission, and turn the
  // camera off again when leaving the tab.
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      checkCameraAccess().then(setAccess);
      return () => setFocused(false);
    }, [])
  );

  async function handleAllow() {
    setAccess(await requestCameraAccess());
  }

  function handleScan({ data }: { data: string }) {
    if (locked.current) return;
    locked.current = true;
    const result = parseStudentQr(data); // business layer decides if it's valid
    if (result.ok) setScanned(result.profile);
    else setError(result.error);
  }

  async function handleSave() {
    if (!scanned) return;
    await saveProfile(scanned); // data layer
    setSaved(true);
  }

  function reset() {
    locked.current = false;
    setScanned(null);
    setError(null);
    setSaved(false);
  }

  // FALLBACK: kung permission is not granted
  if (access !== 'granted') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera access needed</Text>
        <Text style={styles.body}>
          {access === 'blocked'
            ? 'Camera access was turned off. Enable it in your phone Settings to scan.'
            : 'We use the camera only to scan student QR codes.'}
        </Text>
        {access === 'blocked' ? (
          <Pressable style={styles.button} onPress={openAppSettings}>
            <Text style={styles.buttonText}>Open Settings</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleAllow}>
            <Text style={styles.buttonText}>Allow camera</Text>
          </Pressable>
        )}
        <Text style={styles.hint}>
          No camera? You can still enter your details manually in the Profile tab.
        </Text>
      </View>
    );
  }

  // Permission granted
  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.result}>
          <Text style={styles.title}>Student found</Text>
          <ProfileCard name={scanned.name} course={scanned.course} year={scanned.year} />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save to my profile</Text>
          </Pressable>
          {saved && <Text style={styles.success}>Saved to your profile ✅</Text>}
          <Pressable style={styles.buttonAlt} onPress={reset}>
            <Text style={styles.buttonAltText}>Scan another</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {focused && (
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={handleScan}
            />
          )}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
              <Pressable style={styles.buttonAlt} onPress={reset}>
                <Text style={styles.buttonAltText}>Try again</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.hint}>Point the camera at a student QR code</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 14 },
  camera: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  result: { gap: 14 },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  body: { textAlign: 'center', color: '#475569' },
  hint: { textAlign: 'center', color: '#64748b', fontSize: 13 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignSelf: 'stretch' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  buttonAlt: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#2563eb', alignSelf: 'stretch' },
  buttonAltText: { color: '#2563eb', textAlign: 'center', fontWeight: '600' },
  success: { color: '#16a34a', textAlign: 'center', fontWeight: '600' },
  errorBox: { gap: 10 },
  errorText: { color: '#c0392b', textAlign: 'center' },
});