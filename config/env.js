const dotenv = require('dotenv');

dotenv.config();

if (!process.env.OPENAI_API_KEY || !process.env.SMTP_USER) {
  throw new Error("❌ ERROR: Faltan variables de entorno en .env");
}

module.exports = {
  port: process.env.PORT || 5000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

