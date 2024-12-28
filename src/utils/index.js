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

export function validateProjectData(projectData) {
  if (!projectData) {
    return {
      valid: false,
      errors: { general: "Please provide project data." },
    };
  }

  const { name, dueDate, details, category, assignedUsersList } = projectData;
  const errors = {};

  // Name validation
  if (!name || name.trim().length < 3) {
    errors.name = "Project name should be at least 3 characters long.";
  }

  // Due date validation
  if (!dueDate || isNaN(Date.parse(dueDate))) {
    errors.dueDate = "Please provide a valid due date.";
  }

  // Details validation
  if (!details || details.trim().length < 10) {
    errors.details = "Project details should be at least 10 characters long.";
  }

  // Category validation
  if (!category || category.trim().length < 3) {
    errors.category = "Category should be at least 3 characters long.";
  }

  // AssignedUsersList validation
  if (!Array.isArray(assignedUsersList) || assignedUsersList.length === 0) {
    errors.assignedUsersList =
      "Please assign at least one user to the project.";
  } else {
    assignedUsersList.forEach((user, index) => {
      if (!user || typeof user !== "object" || !user.name || !user.id) {
        errors[`assignedUsersList[${index}]`] =
          "Each assigned user must have a valid name and ID.";
      }
    });
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}
