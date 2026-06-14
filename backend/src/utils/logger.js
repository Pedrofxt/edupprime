const fs = require('fs');
const path = require('path');

const logPath = path.resolve(__dirname, '../logs/audit.log');

function ensureLogFile() {
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, '');
}

function audit(message) {
  ensureLogFile();
  const time = new Date().toISOString();
  fs.appendFileSync(logPath, `[${time}] ${message}\n`);
}

module.exports = { audit };
