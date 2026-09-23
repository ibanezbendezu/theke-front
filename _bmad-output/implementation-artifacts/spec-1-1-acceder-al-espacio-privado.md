---
title: 'Acceder al espacio privado'
type: 'feature'
created: '2026-09-21'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
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

**Always:** Mantener los repositorios independientes; usar Node.js 24, TypeScript estricto, NestJS/Fastify, PostgreSQL y Drizzle; derivar la cuenta del token Clerk validado; aprovisionar en una transacción idempotente; propagar `requestId`; respetar tema y accesibilidad; verificar localmente que ambos repositorios usan el mismo contrato OpenAPI versionado y el mismo digest. La publicación SemVer inmutable y la compatibilidad de despliegue N/N-1 quedan diferidas hasta el primer entorno compartido.

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
- `.env`, `tests/` -- configuración y pruebas web locales.
- `../theke-api/packages/contracts/` -- OpenAPI y `@theke/contracts`.
- `../theke-api/src/`, `drizzle/`, `tests/` -- autenticación, cuenta, HTTP, esquema y pruebas.
- `../theke-api/.env.example`, `README.md` -- ejecución local con Clerk y PostgreSQL administrado en Neon.

## Tasks & Acceptance

**Execution:**
- [x] `../theke-api/` -- crear el repositorio NestJS/Fastify Node 24 con healthcheck, `requestId` y logs redactados.
- [x] `../theke-api/drizzle/`, `src/modules/account/` -- modelar User/Account/Membership y `ensureLocalUser` transaccional compartido por request/webhook.
- [x] `../theke-api/src/infrastructure/auth/`, `src/interfaces/http/` -- validar Clerk por entorno y exponer `/v1/me` sin autoridad tenant del cliente.
- [x] `../theke-api/packages/contracts/`, `src/api/generated/` -- verificar localmente versión y digest del OpenAPI y generar el cliente reproduciblemente; diferir la publicación remota.
- [x] `src/app/`, `src/features/auth/`, `src/data/` -- integrar Clerk/Query, proteger rutas, restaurar destino/sesión y limpiar cachés al salir.
- [x] `src/layouts/`, `src/components/layout/` -- reemplazar la identidad mock y ofrecer cierre de sesión accesible.
- [x] Configuración, documentación y `tests/` de ambos repositorios -- separar secretos y cubrir matriz, idempotencia, tokens y recorrido crítico.

**Acceptance Criteria:**
- Given una sesión válida, when la SPA llama `/v1/me`, then recibe usuario, cuenta y membresía sin enviar `accountId`.
- Given cuentas distintas, when consultan endpoints privados, then ninguna observa ni selecciona datos de otra.
- Given un error HTTP, when llega a la SPA, then conserva `{error:{code,message,details?,requestId}}` y ofrece recuperación segura.
- Given teclado, lector o tema elegido, when se accede, restaura o sale, then foco, anuncios, orden y contraste permiten completar el flujo.
- Given el gate local, when corren lint, build, pruebas y contrato, then ambos repositorios son reproducibles; con credenciales locales autorizadas, `theke-web` y `theke-api` superan el smoke test usando Clerk real y PostgreSQL en Neon.

## Implementation Notes

- Implementación local completada en `theke-web` y el repositorio Git hermano `theke-api`; el cliente web se regenera con Orval 8.35.0 y ambos OpenAPI poseen el mismo SHA-256.
- Verificación independiente: web lint/build/test (12)/E2E (12)/contract/audit y API Node 24 lint/build/test (5)/E2E (2)/contract pasan. El build web conserva un warning no bloqueante por chunk de 666,95 kB.
- La publicación de `@theke/contracts` y los despliegues Vercel/Railway quedan diferidos hasta el primer entorno compartido. El cierre local requiere un smoke real con Clerk y PostgreSQL en Neon, sin versionar secretos.
- Smoke local completado el 2026-09-22: Clerk autenticó, `/v1/me` respondió 200 en accesos repetidos y Neon conservó una sola terna User/Account/Membership con rol owner.

## Spec Change Log

- 2026-09-23: revisión cerrada tras aplicar los hallazgos aceptados y superar las verificaciones focalizadas; la integración PostgreSQL opcional no bloquea el cierre.

- 2026-09-22: se reemplazó el gate externo de GitHub Packages/Vercel/Railway por validación contractual y smoke locales con Clerk + Neon, según la propuesta de cambio de sprint aprobada.

## Review Triage Log

| ID | Veredicto | Evidencia y ruta |
|---|---|---|
| B1 | medium | `ensureLocalUser` escribe `null` desde `/v1/me` y borra metadatos del webhook; patch grupo identidad. |
| B2 | medium | La cuenta creada antes del webhook conserva el nombre genérico; patch grupo identidad. |
| B3 | high | `safeDestination` acepta `/\\host`, normalizable como destino externo; patch grupo redirect. |
| B4 | medium | Un 401 queda como error reintentable sin invalidar sesión; patch grupo recuperación auth. |
| B5 | medium | `response.json()` pierde status/envelope ante cuerpos vacíos o no JSON; patch grupo cliente HTTP. |
| B6 | high | `authorizedParties: []` desactiva el límite cuando falta configuración; patch grupo startup seguro. |
| B7 | medium | La API inicia con variables críticas ausentes; patch grupo startup seguro. |
| B8 | low | `/health` es liveness, no readiness; el daño no forma parte del gate local y convertirlo añade acoplamiento, rechazado. |
| B9 | medium | Los checks de contrato no comparan API contra web; patch grupo contrato cruzado. |
| B10 | false | La compatibilidad N/N-1 fue diferida explícitamente hasta el primer entorno compartido. |
| B11 | medium | La suite llamada E2E no verifica el boundary autenticado ni wiring HTTP; patch grupo boundary auth. |
| B12 | medium | El fake ignora predicados y no prueba concurrencia PostgreSQL; patch grupo integración DB. |
| B13 | low | Borrado de usuario Clerk pertenece al ciclo de vida posterior y exige política de retención; rechazado por complejidad desproporcionada. |
| B14 | medium | Ambos README apuntan actualmente a `.env` como plantilla inexistente; patch grupo documentación. |
| V1 | medium | Brecha verificada: no existe aserción de digest API-web; patch grupo contrato cruzado. |
| V2 | medium | Brecha verificada: todos los tests UI mockean `useCurrentAccount`; patch grupo hook real. |
| V3 | medium | Brecha verificada: no se prueba el success boundary de `/v1/me`; patch grupo boundary auth. |
| V4 | medium | Brecha verificada: aislamiento/concurrencia no se ejecutan contra PostgreSQL; patch grupo integración DB. |
| V5 | medium | Brecha verificada: webhook Clerk sin cobertura; patch grupo webhook. |
| E1 | high | Mismo redirect con backslash confirmado; patch grupo redirect. |
| E2 | medium | URL API ausente o con slash produce destino incorrecto; patch grupo cliente HTTP. |
| E3 | medium | Mismo fallo no JSON confirmado; patch grupo cliente HTTP. |
| E4 | medium | Token/fetch sin timeout puede bloquear indefinidamente el guard privado; patch grupo hook real. |
| E5 | low | `decodeURIComponent` puede lanzar con una ruta malformada, pero es preexistente; diferido. |
| E6 | low | `event.target` no-Element puede lanzar; comportamiento preexistente al cambio de tipos; diferido. |
| E7 | low | Touch sin primer elemento puede fallar; comportamiento preexistente; diferido. |
| E8 | low | Cancelar el menú conserva `connectingNodeId`; comportamiento preexistente; diferido. |
| E9 | medium | Mismo borrado de metadatos confirmado; patch grupo identidad. |
| E10 | medium | Mismo nombre genérico permanente confirmado; patch grupo identidad. |
| E11 | low | Origins con espacios fallan aunque sean válidos; patch trivial grupo startup seguro. |
| E12 | medium | Authorized parties con espacios rechazan sesiones válidas; patch grupo startup seguro. |
| E13 | false | La caché permanece en memoria, pero el guard no monta datos signed-out y la key incluye `userId`; no hay exposición demostrada. |
| E14 | medium | Mismo fallo de envelope no JSON confirmado; patch grupo cliente HTTP. |
| E15 | medium | Mismo drift contractual confirmado; patch grupo contrato cruzado. |

## Design Notes

Usar Clerk hospedado dentro de una superficie Theke tematizada. El guard espera Clerk y `/v1/me` antes de montar el shell. Durante el desarrollo individual, ambos repositorios validan localmente versión y digest del contrato; GitHub Packages se reserva para despliegues independientes compartidos.

## Verification

**Commands:**
- `npm.cmd run lint && npm.cmd run build && npm.cmd test` en cada repositorio -- sin errores.
- `npm.cmd run contracts:check` -- OpenAPI sin diff y compatible con vigente/anterior.
- `npm.cmd run test:e2e -- auth` -- acceso, restauración y salida completan el recorrido.

**Manual checks (if no CLI):**
- Con credenciales locales autorizadas y `DATABASE_URL` de Neon, verificar OTP, Google, recarga, cancelación, error y cierre en los tres temas.
