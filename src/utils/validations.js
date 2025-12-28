const Validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("FirstName is required");
  } else if (!lastName) {
    throw new Error("LastName is required");
  } else if (!emailId) {
    throw new Error("Email is required");
  } else if (!Validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!password) {
    throw new Error("Password is required");
  } else if (!Validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters with uppercase, lowercase, number, and symbol"
    );
  }
};

const filterAllowedFields = (body, allowedFields) => {
  return Object.keys(body).reduce((acc, key) => {
    if (allowedFields.includes(key)) {
      acc[key] = body[key];
    }
    return acc;
  }, {});
};

module.exports = {
  validateSignUpData,
  filterAllowedFields,
};
