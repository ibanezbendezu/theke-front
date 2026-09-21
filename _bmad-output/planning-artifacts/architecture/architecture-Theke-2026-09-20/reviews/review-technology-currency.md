# Revisión de vigencia tecnológica

**Artefacto:** `ARCHITECTURE-SPINE.md`  
**Fecha de verificación:** 2026-09-20  
**Veredicto:** **CHANGES REQUIRED**

La selección central es vigente y coherente para el MVP: Supabase mantiene Postgres, Auth, Storage, Realtime, Edge Functions y Queues; Hono está documentado oficialmente para enrutar una API dentro de una Edge Function; Vercel soporta Vite y rewrites a orígenes externos. Las versiones existentes coinciden con `package.json`/`package-lock.json`, y todas las versiones planificadas de la tabla existen hoy en npm. Sin embargo, cuatro decisiones operativas no están suficientemente cerradas para que dos implementadores obtengan el mismo sistema.

## Hallazgos

### 1. [ALTO] `shared/contracts` no sigue la frontera de empaquetado recomendada para Edge Functions

**Evidencia.** AD-16 y la semilla estructural ubican los contratos en `shared/contracts`, fuera de `supabase/functions`. La guía actual de Supabase recomienda compartir código bajo `supabase/functions/_shared` y usar configuración Deno por función para despliegue. Históricamente, importar directorios padre ha tenido fallos en el CLI, incluido el despliegue por API. Aunque el soporte ha evolucionado, el spine no fija ni prueba el modo de bundle que haría segura esta excepción. [Estructura oficial de Edge Functions](https://supabase.com/docs/guides/functions/development-environment), [dependencias y `deno.json`](https://supabase.com/docs/guides/functions/dependencies), [incidencia oficial sobre imports padre](https://github.com/supabase/cli/issues/3467).

**Impacto.** El frontend puede compilar mientras la API falla al servir o desplegar; además, local y despliegue por API/Docker pueden comportarse distinto.

**Corrección recomendada.** Elegir una sola variante en AD-16:

- fuente canónica dentro de `supabase/functions/_shared/contracts` y alias de Vite/TypeScript para consumirla desde web; o
- conservar `shared/contracts`, pero convertir `supabase functions serve`, el bundle y un despliegue de preview en gates obligatorios, fijando explícitamente el modo de deploy compatible.

La primera es la opción más alineada con el runtime administrado.

### 2. [ALTO] La región de datos está fijada, pero no la región efectiva de ejecución de la API

**Evidencia.** AD-15 y el diagrama colocan todos los servicios bajo `Supabase sa-east-1`. São Paulo existe como región de proyecto, pero las Edge Functions se ejecutan automáticamente cerca del solicitante; forzar `x-region`/`forceFunctionRegion` cambia ese comportamiento y desactiva el rerouting automático durante una caída. Supabase recomienda evaluar la ejecución junto a la base para operaciones con muchas rondas a DB/Storage. [Regiones de proyecto](https://supabase.com/docs/guides/platform/regions), [invocaciones regionales](https://supabase.com/docs/guides/functions/regional-invocation).

**Impacto.** Dos equipos pueden implementar la misma API con perfiles de latencia y failover distintos; una API conversadora puede ejecutarse lejos de Postgres aunque el diagrama sugiera lo contrario.

**Corrección recomendada.** Declarar una política: comandos DB/Storage intensivos se invocan en `sa-east-1`; endpoints públicos de lectura pueden usar selección automática si se mide que conviene. Registrar también el trade-off de failover y corregir el diagrama para distinguir región primaria de datos de red global de funciones.

### 3. [ALTO] El aislamiento de previews prometido no es un default de Vercel + Supabase

**Evidencia.** AD-15 exige que cada preview tenga datos y secretos aislados, pero no selecciona el mecanismo. Vercel crea previews web, mientras que la separación backend por PR requiere Supabase Branching y su integración con Vercel/GitHub; esta integración sincroniza credenciales y vuelve a desplegar para resolver una carrera conocida. Las ramas son data-less por defecto y no copian objetos Storage, por lo que también requieren seeds/fixtures. [Supabase Branching](https://supabase.com/docs/guides/deployment/branching), [integración con Vercel](https://supabase.com/docs/guides/deployment/branching/integrations).

**Impacto.** Sin esta decisión, una preview puede terminar usando staging compartido o quedar sin esquema/datos, contradiciendo una invariante de seguridad del spine.

**Corrección recomendada.** Nombrar Supabase Branching + integración Vercel/GitHub como mecanismo del preview, con `seed.sql` sin datos privados y una verificación CI que bloquee cualquier preview cuyo project ref coincida con staging o producción.

### 4. [MEDIO] La matriz de herramientas no cubre por completo el runtime Deno ni sus peers

**Evidencia.** AD-17 compromete Sentry también en Edge, pero la tabla solo incluye `@sentry/react`; la integración oficial requiere el SDK Deno y advierte que se debe aislar el scope por request. AD-18 nombra Vitest para dominio/UI, pero no explicita pruebas del runtime Edge; la guía vigente usa `deno test` para esas funciones. Además, `@testing-library/react@16.3.3` declara `@testing-library/dom@^10` como peer y este paquete no figura. [Sentry en Supabase Edge](https://supabase.com/docs/guides/functions/examples/sentry-monitoring), [testing de Edge Functions](https://supabase.com/docs/guides/functions/unit-test).

**Impacto.** Observabilidad y pruebas pueden quedar correctas en la SPA pero incompletas o incompatibles en producción Edge.

**Corrección recomendada.** Agregar a la decisión, sin necesidad de congelar cada patch en el spine: Deno 2 administrado por Supabase, `@sentry/deno` alineado con la versión web, `@testing-library/dom`, y `deno test` para unidades/integraciones de Edge. Incluir el patrón `withScope`/contexto explícito para evitar mezcla entre requests reutilizados.

## Comprobaciones que pasan

- **Frontend real:** React 19.2.8, TypeScript 6.0.3, Vite 8.2.2, React Router DOM 7.18.2, React Flow 12.11.3, Zustand 5.0.15 y Tailwind 4.3.3 coinciden con el repositorio. Node local es 22.15.0 y satisface Vite 8 (22.12+) y Vitest 5 (22.12+). [Requisitos de Vite 8](https://v8.vite.dev/blog/announcing-vite8).
- **Versiones planificadas:** `@supabase/supabase-js` 2.116.0, Supabase CLI 2.117.0, Hono 4.13.8, TanStack Query 5.103.1, Zod 4.6.5, Sentry React 10.75.0, Vitest 5.0.1, Testing Library React 16.3.3 y Playwright 1.63.0 existen en npm al 2026-09-20. TanStack Query, Sentry React y Testing Library declaran compatibilidad con React 19; Playwright requiere Node 20+.
- **API Hono en Edge:** Supabase documenta Hono para agrupar rutas y reducir cold starts; no se apoya en una tecnología extinguida. [Routing oficial](https://supabase.com/docs/guides/functions/routing).
- **Trabajo asíncrono:** Queues sigue siendo una cola durable basada en `pgmq`; la separación del worker pesado es necesaria porque Edge mantiene límites de 256 MB y 2 s de CPU activa por request. [Queues](https://supabase.com/docs/guides/queues), [límites de Edge Functions](https://supabase.com/docs/guides/functions/limits).
- **Seguridad de datos:** RLS más grants explícitos es el patrón vigente para cada tabla expuesta; `supabase test db` ejecuta pgTAP para RLS. [RLS y grants](https://supabase.com/docs/guides/database/postgres/row-level-security), [testing de base](https://supabase.com/docs/guides/local-development/testing/overview).
- **Rewrite same-origin:** Vercel soporta rewrites hacia orígenes externos como reverse proxy, por lo que `/api/*` hacia la Edge Function es viable. [Rewrites de Vercel](https://vercel.com/docs/routing/rewrites).
- **Recuperación:** Es correcto que los backups de DB no restauran objetos de Storage. [Backups de Supabase](https://supabase.com/docs/guides/platform/backups).

## Nota sobre versiones

Los números exactos son verificables hoy, pero los componentes marcados como «Planificado» aún no están instalados. El spine debe tratarlos como baseline investigada, no como prueba de integración. Al adoptar cada paquete, se debe fijar en lockfile y ejecutar build, tests de ambos runtimes, `supabase functions serve` y bundle/deploy de preview. No se detectó un starter implícito cuyos defaults deban preservarse; si se usa `supabase bootstrap hono`, su salida debe quedar subordinada a AD-3, AD-6 y AD-16.

## Recheck

**Fecha:** 2026-09-20  
**Veredicto:** **CHANGES REQUIRED**

Los cuatro hallazgos fueron incorporados sustancialmente: AD-15 fija Supabase Branching y la política regional; AD-16 mueve contratos a `_shared` y agrega gates de ambos runtimes; AD-17/AD-18 incorporan Sentry Deno, scope aislado, Testing Library DOM y `deno test`. Quedan dos contradicciones editoriales que aún pueden desviar la implementación:

1. **Assumption Review #6 conserva la ruta obsoleta `shared/contracts`.** Debe cambiar a `supabase/functions/_shared/contracts` para coincidir con AD-16 y la semilla estructural.
2. **El diagrama aún coloca `API[Edge Function API con Hono]` dentro de `Supabase sa-east-1`.** Debe separar la red global de Edge Functions de la región primaria de Postgres/Storage o anotar explícitamente que solo las invocaciones intensivas se fuerzan a `sa-east-1`, conforme a AD-15.

No quedan bloqueos tecnológicos adicionales de los cuatro hallazgos originales.

**Disposición final:** **PASS** — las rutas de contratos y la topología regional quedaron consistentes; los cuatro hallazgos están cerrados.

## Revisión por cambio material — 2026-09-21

**Veredicto:** **CHANGES REQUIRED**

La nueva base tecnológica existe y es compatible en lo esencial: Node 24.21.0 está en LTS; NestJS 12.0.4 integra Fastify 5.12.5; Clerk admite Bearer tokens entre orígenes y `authorizedParties`; Drizzle sobre `node-postgres` puede compartir una transacción con `pg-boss`; Railway ofrece PostgreSQL, buckets privados S3 con URLs presignadas y entornos efímeros por PR. Todas las versiones exactas de la tabla existen en npm al 2026-09-21. Quedan cuatro bloqueos de realidad operativa.

### 1. [ALTO] «Verificación local» de Clerk no está garantizada sin `jwtKey`

AD-6 afirma que la API verifica localmente el token con `@clerk/backend`. La API oficial indica que `authenticateRequest()` solo es networkless si recibe `jwtKey`; de lo contrario consulta JWKS en Clerk. También requiere `publishableKey` para session tokens y recomienda limitar `acceptsToken` y `authorizedParties`. [Referencia oficial de `authenticateRequest()`](https://clerk.com/docs/reference/backend/authenticate-request).

**Cierre requerido:** fijar en AD-6 `jwtKey`/`CLERK_JWT_KEY`, `publishableKey`, `acceptsToken: 'session_token'`, rotación y comportamiento fail-closed. Si se desea resolución JWKS remota, sustituir «localmente» y documentar timeout/cache/degradación.

### 2. [ALTO] Los previews separados de Vercel y Railway no forman automáticamente un entorno PR conjunto

Railway crea el PR Environment al abrir un PR contra un repositorio vinculado y replica la infraestructura de su entorno base; Vercel crea su propio preview por rama y aplica variables preview o branch-specific. Con `theke-web` y `theke-api` en repositorios distintos, un PR de frontend no crea por sí solo un backend Railway aislado, y un PR de backend no actualiza por sí solo `API_URL`/orígenes autorizados de un preview Vercel. [PR Environments de Railway](https://docs.railway.com/guides/preview-deployments-with-pr-environments), [variables Vercel por rama](https://vercel.com/changelog/environments-variables-per-git-branch).

Esto afecta además a Clerk `authorizedParties`, CORS y a la cookie anónima: los dominios preview `*.vercel.app` y `*.railway.app` son cross-site, por lo que `SameSite=Lax` no cubre `fetch` con credenciales entre ambos.

**Cierre requerido:** definir el orquestador y la convención de emparejamiento entre PRs/repositorios, cómo se inyectan URL API y allowlists, y cómo se prueba la cookie. Alternativas coherentes: preview full-stack bajo subdominios propios same-site, o cookie preview `SameSite=None; Secure` con CORS/CSRF estrictos. Si los PRs no se emparejan, AD-15 debe dejar de prometer infraestructura aislada para cada PR y fijar una matriz explícita frontend-only/backend-only/integración.

### 3. [ALTO] Orval 8.35.0 no funciona con el Node actual del repositorio web

La versión exacta existe, pero declara `node >=22.18.0`; el entorno actual de `theke-web` es Node 22.15.0. Node 24.21.0 LTS satisface Orval, Nest, Clerk Backend, pg-boss, Vitest y AWS SDK, pero el spine solo lo fija para backend. [Node 24 LTS](https://nodejs.org/en/about/previous-releases), [Node 24.21.0](https://nodejs.org/en/download/archive/v24.21.0).

**Cierre requerido:** fijar Node 24.21.0 también para CI/desarrollo de `theke-web` mediante `engines` y un archivo de versión, o bajar Orval a una versión compatible y verificarla. Hasta entonces el gate de cliente generado no es ejecutable en el entorno real.

### 4. [MEDIO] El contrato OpenAPI entre repositorios carece de canal versionado y pinning

AD-16 dice que el backend «publica» `openapi.json` y que la web genera en CI, pero no determina dónde se publica, qué versión consume cada commit ni cómo un frontend antiguo continúa construyéndose mientras API y web se despliegan independientemente. Orval resuelve la generación, no la distribución ni la selección atómica del artefacto.

**Cierre requerido:** elegir un artefacto inmutable por versión/commit (release, package o registry), fijar su checksum/ref en `theke-web` y ejecutar compatibilidad contra la versión desplegada y la candidata antes de promover. No generar contra un endpoint mutable `latest`.

### Comprobaciones que pasan

- Clerk documenta el session token corto y el Bearer manual para solicitudes cross-origin; separar autenticación Clerk de autorización PostgreSQL es correcto. [Solicitudes autenticadas](https://clerk.com/docs/guides/development/making-requests), [session tokens](https://clerk.com/docs/guides/sessions/session-tokens).
- Nest soporta oficialmente `FastifyAdapter`; la versión 12.0.4 del adaptador depende de Fastify 5.12.5. Los recipes Express no deben reutilizarse sin equivalente Fastify. [Nest con Fastify](https://docs.nestjs.com/techniques/performance).
- `pg-boss` 12.33.3 soporta insertar jobs en una transacción existente y ofrece adaptador Drizzle; con la selección explícita `drizzle-orm/node-postgres` la combinación es adecuada. AD-12 debe implementarse con `boss.send(..., { db: fromDrizzle(tx, sql) })`, no con un `send()` normal dentro del callback. [pg-boss](https://github.com/timgit/pg-boss), [API de jobs](https://github.com/timgit/pg-boss/blob/master/docs/api/jobs.md).
- Drizzle 0.45.3 soporta `pg >=8`; `pg` 8.23.0 satisface esa frontera. Mantener migraciones SQL versionadas en lugar de `push` para producción es coherente con el flujo reproducible. [Drizzle PostgreSQL](https://orm.drizzle.team/docs/get-started/postgresql-new).
- Railway Buckets son privados, S3-compatible, soportan presigned PUT/GET y cada environment obtiene instancia/credenciales aisladas. [Buckets](https://docs.railway.com/storage-buckets), [uploads presignados](https://docs.railway.com/guides/storage-buckets-guide).
- Railway PR Environments se eliminan al cerrar/mergear el PR y pueden replicar API, worker, PostgreSQL y bucket; la separación interna es real. [Environments](https://docs.railway.com/environments).
- Railway solo ofrece hoy regiones en California, Virginia, Amsterdam y Singapur; por ello «región elegida por medición desde Chile» es una decisión válida, pero no implica residencia sudamericana. El bucket debe medirse y fijarse también porque su región no cambia después de crearlo. [Regiones Railway](https://docs.railway.com/deployments/regions).
- El plan de backup/restauración es realizable con snapshots, PITR, dumps portables y restore drills; la copia externa sigue siendo necesaria para sobrevivir al borrado del proyecto. [Backups Railway](https://docs.railway.com/guides/postgres-backups-restores).
- Versiones npm comprobadas: TanStack Query 5.103.1; Clerk React 5.61.3; Nest core/platform-fastify 12.0.4; Fastify 5.12.5; Nest Swagger 12.0.1; class-validator 0.15.1; class-transformer 0.5.1; Clerk Backend 3.18.1; Drizzle ORM/Kit 0.45.3/0.31.11; `pg` 8.23.0; pg-boss 12.33.3; AWS S3/presigner 3.1136.0; Orval 8.35.0; Sentry React/Node 10.75.0; Vitest 5.0.1; Testing Library React/DOM 16.3.3/10.4.2; Playwright 1.63.0. React 19.2.8 satisface los peers de Clerk React, TanStack Query, Sentry y Testing Library.

**Disposición final 2026-09-21:** **PASS** — Clerk fija verificación networkless y fail-closed; previews distinguen y orquestan el emparejamiento full-stack con cookie segura; Node 24.21.0 rige ambos repos; `@theke/contracts` es inmutable, versionado y fijado por digest/lockfile. Los cuatro bloqueos quedan cerrados.
