const fs = require('fs');
const path = require('path');

const SKIP_MODULES = new Set([
  'config',
  'enums',
  'helpers',
  'security',
  'feature-flags',
  'mail',
  'auth',
  'storage',
  'seeding',
  'roles',
  'user',
]);

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 100);
  });
}

function validateModule(modulePath, moduleName) {
  const warnings = [];
  const requiredFiles = [
    `${moduleName}.module.ts`,
    `${moduleName}.controller.ts`,
    `${moduleName}.service.ts`,
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(modulePath, file))) {
      warnings.push(`Missing ${file}`);
    }
  }

  if (!fs.existsSync(path.join(modulePath, 'dto'))) {
    warnings.push('Missing dto/ directory');
  }

  if (!fs.existsSync(path.join(modulePath, 'entities'))) {
    warnings.push('Missing entities/ directory');
  }

  return warnings;
}

async function main() {
  const input = await readStdin();
  if (!input.trim()) return;

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    return;
  }

  const filePath = payload.file_path || payload.path;
  if (!filePath || !filePath.includes('src')) return;

  const normalized = filePath.replace(/\\/g, '/');
  const match = normalized.match(/src\/([^/]+)\//);
  if (!match) return;

  const moduleName = match[1];
  if (SKIP_MODULES.has(moduleName)) return;

  const modulePath = path.join(process.cwd(), 'src', moduleName);
  if (!fs.existsSync(modulePath)) return;

  const warnings = validateModule(modulePath, moduleName);
  if (warnings.length > 0) {
    console.log(
      `[vogue-backend] CRUD structure warnings for "${moduleName}": ${warnings.join(', ')}`,
    );
  }
}

main().catch(() => {});
