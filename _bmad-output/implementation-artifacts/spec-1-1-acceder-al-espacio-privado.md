---
title: 'Acceder al espacio privado'
type: 'feature'
created: '2026-09-21'
status: 'in-progress'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '151cbee63825a2a94d4e63eb73f7ee488c43743f'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-Theke-2026-09-20/ARCHITECTURE-SPINE.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-Theke-2026-09-19/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Theke expone hoy todas sus rutas, muestra una identidad ficticia y no posee sesión, cuenta local ni API persistente; por ello el trabajo no puede pertenecer de forma segura y durable a una persona.

**Approach:** Entregar el primer corte vertical entre `theke-web` y un repositorio hermano `theke-api`: Clerk autentica mediante OTP de correo o Google, la API aprovisiona idempotentemente `User`, `Account` y `Membership`, y la SPA protege y restaura el espacio privado consumiendo `/v1/me` mediante el contrato OpenAPI generado.

## Boundaries & Constraints

**Always:** Mantener los repositorios y despliegues independientes; usar Node.js 24, TypeScript estricto, NestJS/Fastify, PostgreSQL y Drizzle; derivar la cuenta del token Clerk validado; aprovisionar en una transacción idempotente; propagar `requestId`; respetar tema y accesibilidad; publicar contratos SemVer inmutables en GitHub Packages y admitir la versión actual y la anterior.

**Never:** Confiar en `accountId` del navegador; crear entidades desde React; conectar la SPA a PostgreSQL o Clerk administrativo; registrar tokens, correo o contenido privado; mostrar datos previos mientras se resuelve identidad; incorporar capacidades de historias posteriores; modificar recursos externos sin credenciales y autorización del entorno.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Ruta privada sin sesión | `/`, Biblioteca, Proyectos o Canvas | Acceso Theke/Clerk; conserva destino seguro | No renderiza datos privados |
| Primer acceso/reingreso | OTP o Google válido, incluso concurrente | `/v1/me` resuelve una sola terna User/Account/Membership | Transacción revierte; uniques evitan duplicados |
| Fallo o cancelación | Código vencido, rechazo o cancelación | Mensaje claro, valor conservado y Reintentar | Sin registros parciales ni enumeración de cuentas |
| Restauración/salida | Recarga válida; luego sign-out | Carga accesible; restaura identidad; al salir limpia caché | Back/refresh no expone la sesión anterior |
| API inválida | Bearer ausente, vencido o no autorizado | 401 uniforme con `requestId` | Falla cerrado antes de consultar datos |

</frozen-after-approval>

## Code Map

- `package.json`, `src/app/providers.tsx`, `src/app/router.tsx` -- dependencias, providers y rutas públicas/privadas.
- `src/features/auth/`, `src/api/generated/`, `src/data/` -- acceso, boundary, cliente y `/v1/me`.
- `src/layouts/`, `src/components/layout/` -- shell protegido, cuenta real y salida.
- `.env.example`, `vercel.json`, `tests/` -- configuración y pruebas web.
- `../theke-api/packages/contracts/` -- OpenAPI y `@theke/contracts`.
- `../theke-api/src/`, `drizzle/`, `tests/` -- autenticación, cuenta, HTTP, esquema y pruebas.
- `../theke-api/railway.toml`, `.env.example` -- ejecución y secretos del backend.

## Tasks & Acceptance

**Execution:**
- [x] `../theke-api/` -- crear el repositorio NestJS/Fastify Node 24 con healthcheck, `requestId` y logs redactados.
- [x] `../theke-api/drizzle/`, `src/modules/account/` -- modelar User/Account/Membership y `ensureLocalUser` transaccional compartido por request/webhook.
- [x] `../theke-api/src/infrastructure/auth/`, `src/interfaces/http/` -- validar Clerk por entorno y exponer `/v1/me` sin autoridad tenant del cliente.
- [ ] `../theke-api/packages/contracts/`, `src/api/generated/` -- publicar OpenAPI SemVer y generar el cliente reproduciblemente.
- [x] `src/app/`, `src/features/auth/`, `src/data/` -- integrar Clerk/Query, proteger rutas, restaurar destino/sesión y limpiar cachés al salir.
- [x] `src/layouts/`, `src/components/layout/` -- reemplazar la identidad mock y ofrecer cierre de sesión accesible.
- [x] Configuración, documentación y `tests/` de ambos repositorios -- separar secretos y cubrir matriz, idempotencia, tokens y recorrido crítico.

**Acceptance Criteria:**
- Given una sesión válida, when la SPA llama `/v1/me`, then recibe usuario, cuenta y membresía sin enviar `accountId`.
- Given cuentas distintas, when consultan endpoints privados, then ninguna observa ni selecciona datos de otra.
- Given un error HTTP, when llega a la SPA, then conserva `{error:{code,message,details?,requestId}}` y ofrece recuperación segura.
- Given teclado, lector o tema elegido, when se accede, restaura o sale, then foco, anuncios, orden y contraste permiten completar el flujo.
- Given el gate, when corren lint, build, pruebas y contrato, then ambos repositorios son reproducibles; con credenciales autorizadas, Vercel/Railway superan el smoke test.

## Implementation Notes

- Implementación local completada en `theke-web` y el repositorio Git hermano `theke-api`; el cliente web se regenera con Orval 8.35.0 y ambos OpenAPI poseen el mismo SHA-256.
- Verificación independiente: web lint/build/test (12)/E2E (12)/contract/audit y API Node 24 lint/build/test (5)/E2E (2)/contract pasan. El build web conserva un warning no bloqueante por chunk de 666,95 kB.
- Pendiente de autoridad externa: publicar `@theke/contracts` y ejecutar el smoke real con Clerk, PostgreSQL, Vercel y Railway. No se declara satisfecho el último criterio de aceptación.

## Spec Change Log

## Review Triage Log

## Design Notes

Usar Clerk hospedado dentro de una superficie Theke tematizada. El guard espera Clerk y `/v1/me` antes de montar el shell. GitHub Packages evita acoplar repositorios por rutas locales.

## Verification

**Commands:**
- `npm.cmd run lint && npm.cmd run build && npm.cmd test` en cada repositorio -- sin errores.
- `npm.cmd run contracts:check` -- OpenAPI sin diff y compatible con vigente/anterior.
- `npm.cmd run test:e2e -- auth` -- acceso, restauración y salida completan el recorrido.

**Manual checks (if no CLI):**
- Con credenciales autorizadas, verificar OTP, Google, recarga, cancelación, error y cierre en los tres temas.
