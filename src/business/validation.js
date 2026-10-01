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