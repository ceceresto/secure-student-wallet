import type { ProfileData } from '@/business/profileStorage';
import { validateProfile } from '@/business/validation';

export type ScanResult =
  | { ok: true; profile: ProfileData }
  | { ok: false; error: string };

// Expected QR content: {"name":"Juan Dela Cruz","course":"BSIT","year":"3"}
export function parseStudentQr(raw: string): ScanResult {
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'This is not a student QR code.' };
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: 'This is not a student QR code.' };
  }

  const candidate = {
    name: String(data.name ?? '').trim(),
    course: String(data.course ?? '').trim(),
    year: String(data.year ?? '').trim(),
  };

  const result = validateProfile(candidate);
  if (!result.valid) {
    return { ok: false, error: Object.values(result.errors)[0] as string };
  }
  return { ok: true, profile: candidate };
}