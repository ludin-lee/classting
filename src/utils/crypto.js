import { createHmac } from "node:crypto";

const { CI_SECRET } = process.env;

function generateCI(email) {
  if (email === undefined) return;
  return createHmac("sha256", CI_SECRET).update(email).digest("base64");
}

function generatePassword(password) {
  if (!password) return null;
  return createHmac("sha256", CI_SECRET).update(password).digest("base64");
}

export { generateCI, generatePassword };
