# Theke Web

SPA privada de Theke. Clerk resuelve la identidad; `theke-api` aprovisiona la cuenta local y es la única autoridad para datos persistentes.

## Autenticación y desarrollo

1. Desde un checkout limpio, copia el template versionado `.env.example` a `.env.local` y configura Clerk con OTP por correo y Google.
2. Configura `VITE_API_URL` con `theke-api` del mismo entorno.
3. Inicia primero `theke-api` con su `.env` local y la migración aplicada en Neon.
4. Ejecuta `npm install` y `npm run dev`, abre `http://localhost:5173` y completa el acceso con OTP o Google.

Las rutas principales son privadas. El guard no monta el shell hasta que Clerk y `GET /v1/me` terminan; al salir se vacía la caché remota. Verifica con `npm run lint`, `npm run build`, `npm test`, `npm run contracts:check` y `npm run test:e2e -- auth`.

Para cerrar el smoke local, recarga una sesión válida, comprueba que vuelve al destino privado, cierra sesión y confirma que Atrás o una nueva recarga no muestran datos anteriores. Repite el acceso en los temas Sistema, Claro y Oscuro. Las credenciales reales permanecen solo en `.env.local`; nunca las copies a `.env.example` ni al repositorio.

## Base Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
