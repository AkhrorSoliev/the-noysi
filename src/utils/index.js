// utils.js
export function validateSignupOrLoginData(actionData, isSignup = false) {
  if (!actionData) {
    return { valid: false, errors: { general: "No data provided." } };
  }

  const { displayName, email, password, confirmPassword } = actionData;
  const errors = {};

  // Signup-specific validation
  if (isSignup) {
    if (!displayName || displayName.trim().length < 3) {
      errors.displayName = "Display name must be at least 3 characters long.";
    }

    if (!confirmPassword || password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}
