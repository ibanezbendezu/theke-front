import { defineConfig } from 'orval';
export default defineConfig({ theke: { input: './src/api/contract/openapi.json', output: { target: './src/api/generated/theke.ts', schemas: './src/api/generated/models', client: 'fetch', clean: true, override: { mutator: { path: './src/api/httpClient.ts', name: 'thekeFetch' } } } } });
