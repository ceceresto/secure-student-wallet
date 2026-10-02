export const PIN_MIN_LENGTH = 4;
export const PIN_MAX_LENGTH = 6;

export const isRequired = (value) =>
  value !== null && value !== undefined && String(value).trim().length > 0;

export const isValidPin = (pin) =>
  new RegExp(`^\\d{${PIN_MIN_LENGTH},${PIN_MAX_LENGTH}}$`).test(String(pin));

export const validatePin = (pin) => {
  if (!isRequired(pin)) return { valid: false, error: 'PIN is required' };
  if (!isValidPin(pin)) {
    return {
      valid: false,
      error: `PIN must be ${PIN_MIN_LENGTH}-${PIN_MAX_LENGTH} digits`,
    };
  }
  return { valid: true, error: null };
};

export const validatePinConfirm = (pin, confirm) =>
  pin === confirm
    ? { valid: true, error: null }
    : { valid: false, error: 'PINs do not match' };

export const validateRequiredFields = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (!isRequired(value)) errors[key] = `${key} is required`;
  });
  return { valid: Object.keys(errors).length === 0, errors };
};

// ---- PROFILE VALIDATION ----
export const validateName = (value) => {
  const s = String(value ?? '').trim();
  if (!s) return 'Name is required';
  if (s.length < 2) return 'Name must be at least 2 characters';
  if (s.length > 50) return 'Name must be 50 characters or less';
  if (!/^[A-Za-z\u00C0-\u024F.' -]+$/.test(s))
    return 'Name can only contain letters, spaces, apostrophes, hyphens and periods';
  return null;
};

export const validateCourse = (value) => {
  const s = String(value ?? '').trim();
  if (!s) return 'Course is required';
  if (s.length < 2) return 'Course must be at least 2 characters';
  if (s.length > 60) return 'Course must be 60 characters or less';
  if (!/[A-Za-z]/.test(s)) return 'Course must contain letters';
  return null;
};

export const validateYear = (value) => {
  const s = String(value ?? '').trim();
  if (!s) return 'Year level is required';
  if (!/^[1-6]$/.test(s)) return 'Year level must be a number from 1 to 6';
  return null;
};

export const validateProfile = ({ name, course, year }) => {
  const errors = {};
  const nameError = validateName(name);
  const courseError = validateCourse(course);
  const yearError = validateYear(year);
  if (nameError) errors.name = nameError;
  if (courseError) errors.course = courseError;
  if (yearError) errors.year = yearError;
  return { valid: Object.keys(errors).length === 0, errors };
};