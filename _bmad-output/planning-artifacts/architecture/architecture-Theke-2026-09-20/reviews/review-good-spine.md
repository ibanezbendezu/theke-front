# Reviewer Gate — Good-spine checklist

## Veredicto

**CHANGES REQUIRED.** La spine es amplia, coherente con el brownfield y cubre el PRD, pero cuatro fronteras load-bearing todavía permiten que equipos distintos implementen autoridades, ciclos de publicación o flujos de archivos incompatibles. No hay un hallazgo crítico que invalide el enfoque Supabase/Vercel; sí hay hallazgos altos que deben fijarse antes de convertir las capacidades afectadas en historias listas para construir.

## Hallazgos críticos

Ninguno.

## Hallazgos altos

### H1 — La autoridad de autorización de la API server-side queda contradictoria

- **Evidencia:** AD-6 exige RLS y mínimo privilegio; la tabla de convenciones afirma que “RLS y grants aplican también a los adaptadores”. Sin embargo, AD-3 obliga a que publicación, comentarios públicos, uploads, IA y operaciones multi-entidad pasen por la API server-side, y AD-9 exige resolver un token público contra datos privados. La spine no decide si la Edge Function propaga el JWT del usuario, usa una key elevada, llama funciones `security definer` o combina esos caminos.
- **Riesgo de divergencia:** un módulo puede usar `service_role` y autorización manual, otro asumir que RLS lo protege, y un tercero construir políticas públicas en tablas canónicas. Eso debilita directamente NFR-9/NFR-11 y hace falsa o incompleta la regla de AD-6.
- **Acción:** **autofix.** Añadir una regla explícita: las rutas autenticadas ejecutan consultas bajo el JWT del usuario y tenant derivado de membresía; cualquier capacidad elevada se encapsula en funciones/repositorios nominados, verifica autorización antes de usar privilegios y nunca acepta `accountId` como autoridad desde el cliente; las rutas públicas resuelven el hash del Compartido mediante una función/proyección estrecha y no habilitan acceso anónimo a tablas canónicas. Aclarar que `service_role`, si se usa, elude RLS y queda prohibido fuera de esos adaptadores auditados.

### H2 — El flujo binario de uploads no fija si los bytes atraviesan Edge Functions

- **Evidencia:** AD-3 dice que todo upload pasa por la API; AD-11 exige clave UUID server-side y bucket privado de cuarentena, pero no define el protocolo de transferencia. El alcance incluye PDF, imágenes, audio, video, archivos genéricos y cargas múltiples.
- **Riesgo de divergencia:** un equipo puede hacer proxy de todos los bytes por Hono/Edge y otro usar upload directo a Storage. Esa elección cambia límites de tamaño, timeout, progreso, reintentos, costos y el cumplimiento de FR-6/NFR-3. En particular, archivos multimedia vuelven riesgoso asumir un proxy Edge.
- **Acción:** **autofix.** Fijar un handshake: la API valida intención/cuota, crea Recurso/Upload en estado pendiente, genera la clave UUID y entrega una URL o token firmado de una sola carga al bucket de cuarentena; el navegador envía los bytes directamente a Storage; la finalización verificada en servidor comprueba objeto, tamaño/MIME y encola inspección. Ningún objeto queda utilizable o publicable antes de `scan_status=clean`.

### H3 — “Compartido vivo” y “revisión publicada” permiten semánticas incompatibles

- **Evidencia:** AD-9 guarda “la revisión publicada”, pero también dice que la proyección pública actualiza en vivo contenido y presentación ya permitidos. El PRD/UX establece que los cambios guardados afectan al enlace vivo y que ampliar el contenido expuesto requiere confirmación explícita.
- **Riesgo de divergencia:** una unidad puede servir un snapshot inmutable de `published_revision`; otra, el último documento sin revalidación; otra, mezclar presentación de una revisión con versiones canónicas actuales. Esto afecta FR-19, FR-32..FR-35, NFR-6 y NFR-11. Además, reemplazar un archivo de un Recurso permitido podría exponer una versión pendiente o no publicable.
- **Acción:** **autofix.** Definir que el Compartido conserva una allowlist estable y una `last_validated_revision`; cada guardado produce/valida una nueva proyección pública antes de promoverla atómicamente. El lector público recibe siempre la última proyección válida completa. El contenido canónico vivo solo avanza a una `ResourceVersion` publicable (`scan_status=clean` y requisitos de accesibilidad); mientras tanto conserva la última versión pública válida o muestra indisponibilidad segura. La allowlist nunca crece implícitamente.

### H4 — El alcance de tipos de Relación contradice la reutilización entre Proyectos

- **Evidencia:** AD-4 hace a la Relación canónica de Cuenta, pero hace que su tipo personalizado pertenezca al Proyecto que lo define. FR-21 permite tipos personalizados reutilizables dentro del Proyecto, mientras FR-22 y la identidad canónica permiten mostrar Relaciones existentes en otros Diagramas, potencialmente de otros Proyectos.
- **Riesgo de divergencia:** dos equipos pueden modelar el tipo como FK estricta al Proyecto, como texto copiado o como entidad de Cuenta. Al reutilizar una Relación fuera del Proyecto de origen quedan ambiguos su nombre, permiso, edición y ciclo de vida.
- **Acción:** **discuss/autofix.** Elegir y fijar una sola semántica. Recomendación: la Relación es de Cuenta y conserva un `relation_type_id` también de Cuenta; el tipo personalizado registra `origin_project_id` y su descubrimiento/reutilización se limita inicialmente al Proyecto de origen, pero la Relación ya creada puede mostrarse en otros Proyectos de la misma Cuenta con su tipo estable. Si Producto realmente exige tipos estrictamente project-owned, la Relación debe conservar un snapshot estable del nombre y reglas de borrado del tipo.

## Hallazgos medios

### M1 — Falta un objetivo de recuperación verificable

- **Evidencia:** AD-19 decide backups diarios, exportación y copia de Storage, pero no fija RPO/RTO, frecuencia de la copia de objetos ni prueba de restauración.
- **Riesgo:** dos unidades pueden considerar “recuperable” resultados operacionalmente incompatibles.
- **Acción:** **defer/open item.** Antes del piloto, fijar RPO/RTO del MVP y exigir un restore drill documentado que restaure DB y objetos y valide referencias cruzadas.

### M2 — Los contratos compartidos carecen de una regla de empaquetado entre Vite y Edge

- **Evidencia:** AD-16 ubica contratos en `shared/contracts` e indica que ambos runtimes los importan, pero no fija export maps, alias ni un comando que pruebe que Vite y el bundler de Supabase resuelven el mismo código.
- **Riesgo:** duplicación accidental de esquemas o imports que funcionan en un runtime y fallan en otro.
- **Acción:** **autofix.** Convertir `shared/contracts` en un paquete interno sin dependencias de runtime, con exports explícitos y una verificación de compilación para web y funciones en CI.

### M3 — El bearer token público no tiene una política de navegador/caché

- **Evidencia:** AD-9 protege el token en reposo y AD-6 limita DTOs, pero no gobierna `Referrer-Policy`, caché de respuestas públicas, scripts de terceros o indexación.
- **Riesgo:** el token no listado puede filtrarse por referrer, telemetría o caches compartidas aun siendo aleatorio y hasheado en DB.
- **Acción:** **autofix.** Para `/s/:token` y `/api/public/*`, fijar `Referrer-Policy: no-referrer`, `Cache-Control: private, no-store` para respuestas tokenizadas, exclusión de logs/telemetría y `noindex`; documentar una CSP compatible con previews controladas.

### M4 — Promoción de esquema y compatibilidad durante despliegue no están decididas

- **Evidencia:** AD-15 aísla entornos y AD-16 exige migraciones, pero no indica orden de promoción ni compatibilidad de despliegues web/API/esquema.
- **Riesgo:** una preview o despliegue gradual puede ejecutar código nuevo contra esquema anterior, o una migración destructiva romper la versión web todavía servida.
- **Acción:** **autofix.** Exigir migraciones expand/contract, migrar antes de activar código dependiente y retirar columnas solo después de una ventana compatible; staging valida la misma secuencia que producción.

## Checklist de buena spine

| Criterio | Resultado | Observación |
| --- | --- | --- |
| Fija puntos reales de divergencia | **Parcial** | Cubre la mayoría, pero autorización, transferencia de bytes, semántica viva y tipos de Relación siguen abiertos. |
| Reglas enforceables y alineadas con `Prevents` | **Parcial** | La mayoría son comprobables; AD-6/AD-9 son ambiguas en ejecución y AD-3/AD-11 no cierran el protocolo. |
| `Deferred` no permite divergencia inmediata | **Parcial** | Proveedor IA, malware y backup pueden diferirse con gates; RPO/RTO necesita un gate explícito. |
| Tecnología nombrada verificada-current | **Pass con evidencia externa requerida** | Versiones exactas y estado existente/planificado están declarados; la spine no conserva fuente/fecha de verificación para dependencias planificadas. |
| Ratifica el brownfield | **Pass** | Conserva React/Vite/React Flow/Zustand y codifica todas las invariantes de `AGENTS.md`, incluida la semántica de `container`. |
| Cobertura del PRD | **Pass con riesgos altos** | El mapa incluye FR-1..FR-40 y NFR-1..NFR-22; H2/H3/H4 afectan cómo se realizan capacidades cubiertas, no su presencia nominal. |
| No contradice spine padre | **N/A** | No se declara una spine padre. |
| Dimensiones propias decididas/diferidas/abiertas | **Parcial** | Despliegue, entornos, infra, datos, seguridad, operación y pruebas están presentes; faltan los cierres indicados en H1..H4 y M1..M4. |

## Fortalezas verificadas

- La elección de monolito modular con puertos limita bien el acoplamiento a Supabase e IA, y encaja con el tamaño del MVP.
- La separación entre Recurso/Relación canónicos y documento local del Diagrama refleja directamente las invariantes del PRD.
- AD-7, AD-8 y AD-20 ratifican el código existente y convierten los principales pitfalls de React Flow en reglas implementables.
- La spine no omite el sobre operativo: distingue entornos, backups DB/Storage, observabilidad, colas, pruebas de RLS y carga, aunque quedan objetivos concretos por cerrar.
- La IA mantiene opt-in, procedencia, alcance explícito y alternativa manual, coherente con el valor central del producto.

## Recheck

**Veredicto: CHANGES REQUIRED — quedan dos contradicciones documentales menores antes del PASS.**

### Estado de los hallazgos originales

- **H1 — Cerrado en la regla normativa:** AD-6 ahora diferencia JWT + RLS de elevación nominada/auditada, deriva el tenant de membresía y prohíbe confiar en `accountId` del cliente. La convención resumida de Autorización aún dice sin excepción que RLS aplica a todos los adaptadores; debe alinearse con AD-6 para no reabrir la ambigüedad.
- **H2 — Cerrado:** AD-11 fija intención server-side, token de una sola carga, transferencia directa a cuarentena, finalización verificada, máquina de estados e idempotencia.
- **H3 — Cerrado:** AD-9 fija allowlist estable, proyección completa promovida atómicamente, última versión pública válida y controles de referrer/caché/indexación/telemetría.
- **H4 — Cerrado en la regla normativa:** AD-4 adopta `RelationType` de Cuenta con `origin_project_id` y catálogo inicialmente restringido al Proyecto. El ERD aún muestra únicamente `PROJECT ||--o{ RELATION_TYPE : define` y omite la propiedad de Cuenta; debe cambiar a propiedad de Cuenta más origen de Proyecto para no contradecir AD-4.
- **M1 — Cerrado:** AD-19 añade gate de RPO/RTO/frecuencia y restore drill DB + objetos.
- **M2 — Cerrado en AD-16 y la semilla estructural:** ubicación, alias, restricciones ESM y verificación dual están fijados. `Assumption Review` #6 aún menciona la ruta obsoleta `shared/contracts`; debe usar `supabase/functions/_shared/contracts` o referirse al alias `@contracts/*`.
- **M3 — Cerrado:** AD-9 fija `no-referrer`, `private, no-store`, `noindex`, CSP y exclusión de logs/telemetría.
- **M4 — Cerrado:** AD-16 exige cambios aditivos y secuencia expand/migrate/contract con checks de ambos runtimes.

### Bloqueadores restantes para PASS

1. Alinear el ERD con AD-4: `ACCOUNT` posee `RELATION_TYPE`; `PROJECT` solo lo origina mediante `origin_project_id`.
2. Corregir `Assumption Review` #6 a la ubicación decidida en AD-16 y ajustar la convención de Autorización para reconocer los adaptadores elevados, nominados y auditados de AD-6.

**Final disposition: PASS — H1–H4 y M1–M4 están cerrados; no quedan bloqueadores de esta revisión.**

---

## Full re-review — 2026-09-21

### Veredicto

**CHANGES REQUIRED.** La sustitución de Supabase por `theke-api` + Clerk + PostgreSQL/Drizzle + pg-boss + Railway es coherente con el PRD y puede construirse como monolito modular. Sin embargo, introduce una vulnerabilidad potencial en el pipeline de archivos y deja cuatro seams inter-repositorio/backend lo bastante abiertos como para producir implementaciones incompatibles o inseguras.

### Hallazgo crítico

#### C1 — Una URL presignada no es de una sola operación y permite reemplazar bytes después de validarlos

- **Evidencia:** AD-11 promete una URL S3 presignada “de una sola operación”, calcula hash, crea `ResourceVersion` y después encola inspección. Una presigned URL S3 puede reutilizarse hasta expirar y un `PUT` posterior sobre la misma key reemplaza el objeto. Railway documenta que sus buckets son S3-compatible y admiten upload directo; por tanto no puede asumirse semántica single-use propia.
- **Impacto:** si `ResourceVersion` o la publicación siguen apuntando a la key de cuarentena, un cliente puede sobrescribir el objeto después del hash o incluso después del scan y lograr que Theke sirva bytes que nunca fueron inspeccionados. Esto contradice NFR-12 y el `Prevents` de AD-11.
- **Acción:** **autofix antes de historias de upload/publicación.** La key de cuarentena debe ser única por `uploadId`; la firma debe tener TTL corto y fijar headers/checksum/tamaño soportados. `finalize` registra ETag/checksum/version ID y cierra lógicamente el upload. El scanner debe leer exactamente esos bytes y, al aprobar, copiarlos a una key limpia, inmutable y distinta; solo esa key queda referenciada por la versión publicable. Reutilizar o sobrescribir la key de cuarentena nunca debe modificar una versión `ready`. Si el proveedor soporta una precondición equivalente, puede reforzarla, pero no reemplaza la promoción a bytes inmutables.
- **Fuentes primarias:** [AWS: presigned uploads reemplazan una key existente](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html), [AWS: las presigned requests pueden reutilizarse](https://docs.aws.amazon.com/prescriptive-guidance/latest/presigned-url-best-practices/faq.html), [Railway Buckets son privados y S3-compatible](https://docs.railway.com/storage-buckets).

### Hallazgos altos

#### H1 — `current_version_id` puede promover una versión todavía no inspeccionada

- **Evidencia:** AD-4 afirma que cada cambio crea la versión y actualiza atómicamente `resource.current_version_id`; AD-11 crea `ResourceVersion` antes de encolar inspección y solo más tarde alcanza `ready`.
- **Riesgo de divergencia:** una implementación puede hacer visible la versión candidata inmediatamente y otra conservar la anterior. El resultado cambia Canvas, Compartidos vivos y el comportamiento de reemplazo de archivos.
- **Acción:** **autofix.** Distinguir versión candidata de versión vigente: crear la candidata en `scanning`, no actualizar `current_version_id`; al aprobar los bytes limpios, promoverla mediante revisión esperada y transacción, invalidar proyecciones públicas y mantener la versión anterior si se rechaza o falla. Para un Recurso nuevo, `current_version_id` permanece nulo hasta `ready`.

#### H2 — SSE autenticado no define un transporte compatible con Bearer tokens en navegador

- **Evidencia:** AD-6 exige Bearer Clerk para la API y AD-14 exige SSE autenticado. `EventSource` nativo no permite configurar el header `Authorization`; la spine tampoco elige un cliente fetch-streaming, cookie de sesión ni ticket efímero.
- **Riesgo de divergencia:** un equipo puede poner el session token en query string —filtrable en logs/URLs—, otro abandonar Bearer y otro implementar polling. Esto afecta FR-39 y los límites de seguridad de AD-6/AD-17.
- **Acción:** **autofix.** Elegir fetch streaming/SSE con `Authorization: Bearer` y reconexión explícita, o emitir desde REST un ticket SSE opaco, de un solo uso y vida muy corta. Prohibir session tokens en query strings y fijar semántica de cursor (`Last-Event-ID`), expiración/reautenticación y fallback a invalidación por polling.

#### H3 — El contrato entre dos repositorios no tiene artefacto pinneable ni política de compatibilidad

- **Evidencia:** AD-16 dice que el backend publica `openapi.json` versionado y que la web genera cliente en CI, pero no fija dónde se publica, cómo `theke-web` pinnea una versión/digest, cuánto tiempo `theke-api` conserva compatibilidad ni qué repositorio gobierna la spine. “Fallar si existe drift no confirmado” no es comprobable sin una referencia canónica.
- **Riesgo de divergencia:** CI puede generar contra `latest`, un despliegue API puede romper la web aún activa, y cada repositorio puede conservar una arquitectura distinta. Los cambios aditivos ayudan al esquema, pero no resuelven distribución, pinning ni deprecación del contrato HTTP.
- **Acción:** **autofix.** `theke-api` publica OpenAPI como artefacto inmutable con versión y digest; `theke-web` fija esa versión en código/lock y actualiza mediante PR. CI del API verifica compatibilidad con la última versión web desplegada; API mantiene una ventana declarada —recomendación: actual + anterior— y no elimina campos hasta confirmar adopción. Definir también la ubicación canónica de esta spine y un mecanismo de sincronización/validación en ambos repositorios.

#### H4 — La autorización por tenant queda como disciplina de cada consulta

- **Evidencia:** AD-6 dice que Theke autoriza contra memberships/ownership, pero sin RLS ni una regla de repositorio/constraint que impida queries sin tenant. AD-18 solo detecta algunos fallos mediante una matriz de pruebas.
- **Riesgo de divergencia:** módulos distintos pueden filtrar por `account_id`, validar ownership después de leer o aceptar IDs globales sin scope; un olvido produce fuga entre cuentas, el riesgo central de NFR-9.
- **Acción:** **autofix.** Todo caso de uso autenticado recibe un `AuthContext` resuelto una sola vez; repositorios de entidades tenant-owned exigen `accountId` en su interfaz y realizan acceso con scope, sin métodos globales accesibles a módulos de negocio. Usar constraints/FKs compuestas donde protejan relaciones cross-tenant y reservar repositorios globales para adapters nominados. Mantener la matriz de integración como verificación, no como única barrera.

#### H5 — La identidad anónima con cookie carece de defensa CSRF y estrategia para previews cross-site

- **Evidencia:** AD-10 autoriza edición por una cookie `HttpOnly` y `credentials: include`; AD-15 usa `app.*`/`api.*` en producción, pero Vercel Preview y Railway PR normalmente tienen sitios distintos. `SameSite=Lax` no acompaña fetch cross-site y, en producción same-site, no sustituye una defensa explícita contra orígenes hermanos comprometidos.
- **Riesgo de divergencia:** comentarios pueden fallar solo en preview o quedar expuestos a mutaciones CSRF según dominio y formato de request.
- **Acción:** **autofix.** Para mutaciones cookie-auth, exigir `Origin` exacto más token CSRF ligado a la sesión anónima; aceptar solo JSON y CORS con credenciales para orígenes enumerados. Decidir dominios preview bajo un mismo site o una política preview específica (`SameSite=None; Secure` + CSRF) y cubrir ambos recorridos en Playwright.

### Hallazgos medios

#### M1 — La cabecera documental no registra el cambio material

- **Evidencia:** `updated` continúa en `2026-09-20` aunque la arquitectura fue reemplazada el 2026-09-21.
- **Acción:** **autofix.** Actualizar la fecha y registrar en memlog la sustitución completa de la base anterior.

#### M2 — La promoción independiente de DB, API y worker necesita orden explícito

- **Evidencia:** AD-15 permite despliegues independientes y AD-16 exige expand/migrate/contract, pero no fija quién ejecuta migraciones ni el orden API/worker cuando ambos comparten schema y handlers.
- **Acción:** **autofix.** Un único migration job de `theke-api` adquiere lock, aplica expand antes del código dependiente; API y worker mantienen compatibilidad N/N-1; contract/destructive migrations corren solo tras confirmar que no existe código anterior activo. Railway debe usar health checks y orden documentado.

#### M3 — “Dead-letter” en pg-boss necesita convención operativa concreta

- **Evidencia:** AD-12 exige dead-letter al superar el máximo, pero no fija nombres/retención/redrive/alerta; esas decisiones afectan todos los handlers.
- **Acción:** **autofix.** Fijar sufijo o política única de DLQ, retención, alerta, redrive idempotente y runbook; excluir payload de contenido privado de dashboard/logs. La elección pg-boss sí es técnicamente compatible con jobs dentro de transacciones Drizzle mediante su adapter `db`.
- **Fuente primaria:** [pg-boss: adapters de transacción y opción `db`](https://github.com/timgit/pg-boss/blob/master/docs/api/jobs.md).

### Checklist 2026-09-21

| Criterio | Resultado | Observación |
| --- | --- | --- |
| Fija puntos reales de divergencia | **Parcial** | Cubre modelo, hosting, auth, colas y contratos, pero C1 y H1–H5 siguen abiertos. |
| Reglas enforceables y alineadas con `Prevents` | **Parcial** | AD-11 promete una garantía que S3 presigned PUT no ofrece; autorización y SSE requieren mecanismos concretos. |
| `Deferred` no permite divergencia inmediata | **Pass parcial** | IA, scanner y backup tienen gates adecuados; los hallazgos anteriores no deben moverse a Deferred. |
| Tecnología nombrada verificada-current | **Pass con una corrección semántica** | Railway Buckets, PR Environments, Clerk `authorizedParties` y pg-boss/Drizzle tienen soporte primario; “single-use presigned URL” no lo tiene. |
| Ratifica el brownfield | **Pass** | Mantiene React/Vite/React Flow/Zustand y todas las invariantes específicas de `AGENTS.md`. |
| Cobertura PRD/UX | **Pass con bloqueadores de realización** | El mapa cubre FR-1..FR-40 y NFR-1..NFR-22; los hallazgos afectan seguridad/fiabilidad de upload, comments y notificaciones. |
| No contradice spine padre | **N/A** | No existe una spine padre declarada. |
| Dimensiones propias decididas/diferidas/abiertas | **Parcial** | Datos, infra, operaciones y pruebas están presentes; faltan cierres en seguridad de archivos, tenancy, transporte SSE y seam inter-repo. |

### Fortalezas verificadas

- La separación `theke-web`/`theke-api` mantiene al navegador fuera de PostgreSQL y concentra reglas de dominio y autorización.
- Clerk se limita correctamente a identidad; `authorizedParties`, webhooks verificados y `ensureLocalUser` idempotente evitan convertirlo en modelo de permisos.
- PostgreSQL + Drizzle + pg-boss es una base coherente: pg-boss documenta adapters para crear jobs dentro de transacciones ORM, incluido Drizzle.
- Railway documenta buckets S3-compatible privados y aislamiento de buckets/servicios por PR Environment, por lo que AD-15 es viable.
- Las reglas canónicas, de Compartido vivo, React Flow, accesibilidad, IA opt-in, recuperación y pruebas continúan cubriendo el producto sin contradecir el frontend actual.

### Disposición 2026-09-21

Corregir **C1** antes de considerar segura cualquier carga o publicación. Cerrar **H1–H5** antes de convertir los recorridos afectados en historias listas para desarrollo. M1–M3 son autofixes documentales/operativos y no requieren cambiar la elección general de stack.

### Final recheck — 2026-09-21

**PASS — C1, H1–H5 y M1–M3 están cerrados en AD-4, AD-6, AD-10–AD-16 y la cabecera; no quedan bloqueadores de la revisión 2026-09-21.**
