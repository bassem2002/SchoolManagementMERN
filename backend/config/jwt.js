function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || !secret.trim()) throw new Error("JWT_SECRET doit etre configure");
  return secret;
}
module.exports = { getJwtSecret };
