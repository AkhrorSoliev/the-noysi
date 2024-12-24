export function validateSignupOrLoginData(actionData, isSignup = false) {
  if (!actionData) {
    return { valid: false, errors: ["No data provided."] };
  }

  const { displayName, email, password } = actionData;
  const errors = [];

  if (isSignup && (!displayName || displayName.trim().length < 3)) {
    errors.push("Display name must be at least 3 characters long.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email address.");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (errors.length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}
