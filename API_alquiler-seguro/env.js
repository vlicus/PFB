process.loadEnvFile();

export const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FRONT_URL,
  API_URL,
} = process.env;
