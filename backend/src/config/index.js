const path = require('path');
const dotenv = require('dotenv');

function loadConfig() {
  const envPath = path.resolve(__dirname, '../../.env');
  dotenv.config({ path: envPath });
}

function getConfig() {
  return {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    databaseUrl: process.env.DATABASE_URL,
    emailHost: process.env.EMAIL_HOST,
    emailPort: Number(process.env.EMAIL_PORT) || 587,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    openAiApiKey: process.env.OPENAI_API_KEY,
    mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  };
}

module.exports = { loadConfig, getConfig };