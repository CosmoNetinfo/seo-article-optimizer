const fs = require('fs');
const path = require('path');

// Load .env.local file and inject into process.env
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env.local');

    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const lines = envContent.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                const value = valueParts.join('=').trim();
                if (key && value) {
                    process.env[key.trim()] = value;
                }
            }
        });
    }
}

module.exports = { loadEnv };
