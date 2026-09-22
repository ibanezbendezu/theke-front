import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const contract = JSON.parse(readFileSync(new URL('../src/api/contract/openapi.json', import.meta.url)));
const generatedDirectory = fileURLToPath(new URL('../src/api/generated/', import.meta.url));
const hashGenerated = (directory) => {
  const hash = createHash('sha256');
  const visit = (current, relative = '') => {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const child = join(current, entry.name); const name = join(relative, entry.name);
      if (entry.isDirectory()) visit(child, name); else hash.update(name).update(readFileSync(child));
    }
  };
  visit(directory); return hash.digest('hex');
};
const before = hashGenerated(generatedDirectory);
if (!process.env.npm_execpath) throw new Error('npm_execpath no está disponible');
execFileSync(process.execPath, [process.env.npm_execpath, 'run', 'contracts:generate'], { stdio: 'inherit' });
const after = hashGenerated(generatedDirectory);
if (before !== after) throw new Error('Drift contractual: el cliente generado no estaba actualizado');
if (contract.info.version !== '1.0.0' || !contract.paths['/v1/me'] || !contract.components.schemas.MeResponse) throw new Error('Contrato OpenAPI inválido o desactualizado');
console.log(`Contrato ${contract.info.version} verificado`);
