function requireFromEnv(envName, envObj = process.env) {
  if (envObj[envName]) return envObj[envName];
  throw new Error(`Environment var ${envName} must be set`);
}

function getDBURL(envObj = process.env) {
  // for testing use SQLITE
  if (envObj.NODE_ENV === "test")
    return envObj.DB_TEST_URL || "sqlite::memory:";
  const db_name = requireFromEnv("DB_URL", envObj);
  return db_name;
}

module.exports = {
  requireFromEnv,
  getDBURL,
};
