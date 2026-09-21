# Revisión adversarial de compatibilidad

**Lente:** construir dos unidades de implementación un nivel por debajo que obedezcan literalmente todas las AD y aun así resulten incompatibles.

**Veredicto:** **No pasa todavía.** El spine fija bien proveedores y fronteras generales, pero deja cinco protocolos de integración suficientemente ambiguos para que equipos independientes produzcan comportamientos, datos o ciclos de vida incompatibles. Los dos primeros son de severidad alta porque afectan la identidad del conocimiento y la semántica pública del producto.

## Hallazgos altos

### A1 — Una Relación reutilizada puede perder la semántica de su tipo fuera del Proyecto de origen

- **AD implicadas:** AD-4, AD-5, AD-9, AD-16.
- **Unidad A, Relaciones:** almacena `relation_type_id` como FK obligatoria a un `RELATION_TYPE` propiedad del Proyecto; al mostrar la Relación en otro Proyecto consulta ese registro y devuelve su etiqueta.
- **Unidad B, Proyectos/Compartidos:** considera que un Proyecto solo puede leer sus propios tipos. Al incorporar una Relación canónica de la Cuenta cuyo tipo nació en otro Proyecto, rechaza el tipo, lo sustituye por uno genérico o excluye la Relación de la proyección pública.
- **Por qué ambas obedecen:** el spine declara la Relación propiedad de la Cuenta y el tipo propiedad del Proyecto, pero no fija la visibilidad interproyecto, si la Relación guarda un snapshot semántico del tipo, ni qué ocurre al archivar/eliminar el Proyecto o tipo originario.
- **Incompatibilidad:** una misma Relación cambia de significado, deja de ser renderizable o impide publicar según el módulo que la lea.
- **Corrección recomendada:** **autofix**. Definir una identidad de tipo accesible a nivel de Cuenta, aunque su creación y catálogo inicial estén contextualizados por Proyecto; o fijar explícitamente que la Relación conserva un descriptor inmutable y las reglas de lectura/ciclo de vida del tipo originario. Incluir el resultado al archivar/eliminar el tipo o Proyecto.

### A2 — `published_revision` admite implementación snapshot y publicación viva a la vez

- **AD implicadas:** AD-7, AD-9, AD-14.
- **Unidad A, Publicación:** resuelve siempre el documento exacto de `published_revision`; los cambios posteriores de contenido o presentación no aparecen hasta una nueva publicación.
- **Unidad B, Vista pública:** usa `published_revision` solo como auditoría inicial y resuelve siempre la revisión actual del Diagrama, filtrada por la allowlist; contenido y presentación cambian en vivo.
- **Por qué ambas obedecen:** AD-9 exige guardar “la revisión publicada” pero también que la proyección pública “actualiza en vivo contenido y presentación ya permitidos”. No especifica si la composición se fija, sigue el head completo o mezcla una membresía fija con campos vivos.
- **Incompatibilidad:** autor y visitante ven grafos distintos; caché, invalidación Realtime, comentarios anclados y revocación operan contra revisiones diferentes.
- **Corrección recomendada:** **discutir/autofix**. Fijar un contrato único, por ejemplo: allowlist y conjunto de representaciones congelados al publicar; contenido canónico y propiedades de presentación de esas representaciones se resuelven desde la revisión vigente, con IDs locales estables; todo nuevo recurso/representación exige confirmación. Definir qué revisión identifica cada DTO y evento.

## Hallazgos medios

### A3 — No existe una política interoperable para uploads pendientes, fallidos o reintentados

- **AD implicadas:** AD-3, AD-4, AD-11, AD-12, AD-20.
- **Unidad A, Uploads:** crea `Resource`, `ResourceVersion` y Representación inmediatamente con estado `quarantined`; un fallo de escaneo conserva el nodo y permite reintentar sobre el mismo Resource.
- **Unidad B, Canvas/Recursos:** espera `scan_status=clean` para crear el Resource; mientras tanto usa un placeholder efímero y, al reintentar, crea otro ID.
- **Por qué ambas obedecen:** AD-11 solo dice que el archivo entra en cuarentena y que `clean` habilita “uso normal”; no fija cuándo nacen las entidades canónicas, qué ID devuelve el comando, cómo se serializa el placeholder ni la transición de fallo/cancelación.
- **Incompatibilidad:** el autosave puede guardar una referencia que el backend aún no reconoce, los grupos creados al soltar varios archivos pierden miembros y los reintentos duplican recursos.
- **Corrección recomendada:** **autofix**. Definir la máquina mínima `initiated -> uploaded -> scanning -> ready | rejected | failed`, un `resourceId` estable desde el inicio y qué estados admite el documento de Diagrama; fijar idempotencia y limpieza.

### A4 — Productor y consumidor pueden implementar dos protocolos de trabajo durable distintos

- **AD implicadas:** AD-12, AD-16, AD-17.
- **Unidad A, Comandos:** inserta una fila de outbox en la transacción y un dispatcher posterior la publica en Supabase Queues.
- **Unidad B, Worker:** espera que el comando invoque `pgmq.send` dentro de la transacción y usa el ID de mensaje de la cola como identidad del job; no consume la tabla outbox.
- **Por qué ambas obedecen:** “outbox/queue en la misma transacción” permite outbox seguido de relay o enqueue transaccional directo. Tampoco fija el identificador canónico, envelope, leasing, reintentos, dead-letter ni deduplicación.
- **Incompatibilidad:** jobs nunca consumidos o duplicados; métricas y estados de intentos sin correlación.
- **Corrección recomendada:** **autofix**. Elegir un solo patrón MVP. Fijar `jobId`, envelope/versionado, tabla/cola autoritativa, clave de deduplicación, ack/retry/dead-letter y transiciones observables.

### A5 — La identidad anónima no define su alcance ni protocolo de rotación

- **AD implicadas:** AD-2, AD-9, AD-10, AD-15.
- **Unidad A, Sesión pública:** emite una cookie global de Theke; la misma identidad puede editar comentarios propios en todos los Compartidos durante 30 días y rota el token conservando el mismo sujeto.
- **Unidad B, Comentarios:** emite una cookie con path o sujeto por Compartido; cada enlace produce una identidad distinta y rotar invalida la capacidad de editar comentarios previos.
- **Por qué ambas obedecen:** ambas usan token opaco first-party, hash y 30 días; no se decide si el sujeto es global, por Compartido o por navegador, ni renovación, rotación y migración de ownership.
- **Incompatibilidad:** el visitante puede o no editar comentarios que el sistema considera suyos; rate limits por sesión y recuperación divergen.
- **Corrección recomendada:** **discutir** por implicación de privacidad. Fijar el alcance del `anonymousVisitorId`, el nombre/path de cookie, rotación con ventana de gracia, revocación y cómo se conserva ownership sin almacenar el token.

## Hallazgos bajos

### A6 — `ResourceVersion` no tiene un protocolo de “versión vigente” común

- **AD implicadas:** AD-4, AD-9, AD-13.
- **Unidad A, Recursos:** mantiene `resource.current_version_id` y lo cambia atómicamente al editar.
- **Unidad B, Compartidos/IA:** define la vigente como `max(created_at)` o `max(version_number)` y acepta creaciones concurrentes.
- **Por qué ambas obedecen:** se exige una versión inmutable con hash, pero no se fija puntero autoritativo, secuencia, control optimista ni tratamiento de versiones idénticas por hash.
- **Incompatibilidad:** la vista pública y la IA pueden analizar o exponer versiones distintas de la que ve el autor.
- **Corrección recomendada:** **autofix**. Fijar `current_version_id`, creación/versionado atómico con revisión esperada, unicidad del ordinal y semántica del hash.

### A7 — El contrato compartido no fija compatibilidad de cambios entre despliegues independientes

- **AD implicadas:** AD-15, AD-16.
- **Unidad A, Web:** despliega un DTO nuevo y obligatorio junto con la SPA, porque compila contra el mismo `shared/contracts`.
- **Unidad B, Edge:** sigue una versión anterior durante un despliegue escalonado y rechaza el DTO; o despliega primero y devuelve un discriminador que la SPA anterior no reconoce.
- **Por qué ambas obedecen:** compartir fuentes y migraciones elimina drift en el repositorio, pero no define evolución compatible durante rollouts, versión de API ni orden de despliegue.
- **Incompatibilidad:** previews o producción fallan durante despliegues legítimos aun usando el mismo contrato versionado.
- **Corrección recomendada:** **autofix/defer a convención operativa**. Exigir cambios aditivos en una ventana de compatibilidad, discriminador/envelope versionado y secuencia expand-migrate-contract; documentar qué despliegue precede al otro.

## Resumen de cierre

- **Bloquean finalización:** A1 y A2.
- **Deben cerrarse antes de dividir implementación:** A3 y A4.
- **Requiere decisión de privacidad/producto:** A5.
- **Pueden resolverse como convenciones explícitas del spine:** A6 y A7.

## Recheck

**Veredicto:** **CHANGES REQUIRED.** A1, A4, A5, A6 y A7 quedaron cerrados de forma suficiente. A2 y A3 todavía admiten implementaciones incompatibles.

### R1 — A3 sigue abierto: se crea una `ResourceVersion` inmutable antes de poder calcular su hash

- AD-4 exige que cada `ResourceVersion` sea inmutable y tenga hash.
- AD-11 crea `Resource`/`ResourceVersion`/`Upload` en estado `initiated`, antes de que el navegador cargue los bytes.
- Un equipo puede crear la versión con hash nulo y actualizarla después, violando inmutabilidad; otro puede inventar un hash provisional o crear una segunda versión al finalizar, alterando identidad y ordinal.
- **Cierre necesario:** crear solo `Resource` + `Upload` al iniciar y crear/promover la `ResourceVersion` después de verificar bytes y calcular hash; o definir una entidad de staging mutable distinta de `ResourceVersion`. El placeholder debe referenciar el `resourceId`/`uploadId` estable.

### R2 — A2 sigue parcialmente abierto: faltan disparadores de proyección para cambios canónicos distintos de `ResourceVersion`

- AD-9 reconstruye la proyección ante guardado de Diagrama o nueva versión de un Recurso permitido.
- Relaciones, explicación/evidencia, `RelationType`, archivo/borrado y otras mutaciones canónicas incluidas en la proyección también pueden cambiar sin guardar el Diagrama ni crear `ResourceVersion`.
- Un módulo de Relaciones puede esperar que publicar lea siempre su estado vigente; el materializador puede obedecer literalmente los dos disparadores enumerados y dejar la proyección anterior.
- **Cierre necesario:** declarar que toda mutación de una entidad canónica incluida o de su publicabilidad invalida/reconstruye los Compartidos afectados, mediante el mismo job idempotente; enumerar Recursos, Relaciones/tipos y cambios de estado relevantes o expresarlo como regla exhaustiva.

### Estado A1–A7

| Hallazgo | Estado |
| --- | --- |
| A1 — ownership de `RelationType` | Cerrado: pertenece a Cuenta, conserva origen y estabilidad. |
| A2 — snapshot vs vivo | Parcial: proyección atómica definida; disparadores incompletos (R2). |
| A3 — lifecycle de upload | Parcial: estados e IDs definidos; creación prematura de versión (R1). |
| A4 — jobs | Cerrado: `pgmq` único, envelope y consumo definidos. |
| A5 — identidad anónima | Cerrado: alcance, derivación y expiración explícitos. |
| A6 — versión vigente | Cerrado: `current_version_id`, ordinal y revisión esperada. |
| A7 — evolución de contratos | Cerrado: eventos versionados y expand/migrate/contract. |

**Disposición final:** **PASS** — R1 y R2 quedaron cerrados; no persisten bloqueos adversariales de compatibilidad en A1–A7.

## Revisión por cambio material — 2026-09-21

**Veredicto:** **CHANGES REQUIRED.** La nueva separación `theke-web`/`theke-api` abre cinco puntos donde implementaciones independientes pueden obedecer las AD y aun no interoperar.

### B1 — El documento de Canvas no tiene una fuente contractual única entre repositorios

- **AD implicadas:** AD-1, AD-4, AD-7, AD-16, AD-20.
- **Implementación web válida:** mantiene la unión Zod, `schemaVersion` y migraciones locales en `theke-web`; OpenAPI tipa el documento como JSON/objeto y el journal puede hidratar versiones antiguas offline.
- **Implementación API válida:** implementa su propia unión/validación y migraciones en `theke-api`, porque el backend es autoridad y no comparte código con la SPA.
- **Incompatibilidad:** ambas pueden diferir en discriminadores, campos opcionales, normalización padre-hijo y migración de `schemaVersion`; el cliente guarda documentos que la API rechaza o la API devuelve documentos que IndexedDB no puede migrar.
- **Cierre requerido:** fijar propiedad y distribución del contrato completo del documento. Recomendación: esquema canónico versionado en `theke-api`, expuesto sin pérdida en OpenAPI/JSON Schema y acompañado por fixtures de compatibilidad; si la web necesita validación/migración offline, publicar un paquete o artefacto versionado único que ambos repos consuman, no dos Zod independientes.

### B2 — OpenAPI “versionado” no define publicación, pin ni promoción entre dos repositorios

- **AD implicadas:** AD-1, AD-15, AD-16, AD-18.
- **Implementación web válida:** descarga el `openapi.json` más reciente de la rama principal o de una API desplegada al ejecutar CI y genera Orval.
- **Implementación API válida:** publica el archivo como artefacto de cada commit/release y despliega producción independientemente; staging y PR tienen revisiones distintas.
- **Incompatibilidad:** el cliente compilado puede corresponder a otro commit o entorno que la API objetivo. “Drift no confirmado” y cambios aditivos no identifican contra qué digest/release se verificó cada build ni cómo se promueve el par compatible.
- **Cierre requerido:** definir canal de distribución inmutable, versión/digest fijado en `theke-web`, matriz de compatibilidad y gate de promoción. Cada build web debe registrar el digest OpenAPI usado y cada entorno debe comprobar que su API satisface esa versión antes de desplegar.

### B3 — SSE autenticado carece de un protocolo de navegador y reanudación interoperable

- **AD implicadas:** AD-2, AD-6, AD-14, AD-16.
- **Implementación web válida:** usa `EventSource`, que no permite configurar `Authorization: Bearer`, y espera cookie o token en query; otra usa `fetch` streaming/polyfill para adjuntar Bearer.
- **Implementación API válida:** exige Bearer según AD-6 pero puede emitir eventos sin `id`, o interpretar reconexión mediante `Last-Event-ID`; OpenAPI por sí solo no fija adecuadamente el stream/event envelope.
- **Incompatibilidad:** una combinación no autentica; otra pierde invalidaciones al refrescar el token o reconectar, y tipos/versiones de eventos pueden divergir.
- **Cierre requerido:** elegir `fetch`-SSE con Bearer (o una cookie explícita distinta), fijar media type, envelope/discriminador versionado, heartbeat, `id`, `Last-Event-ID`/semántica de gap, refresh/reconnect y cierre de sesión. Publicar este contrato junto con OpenAPI o un artefacto de eventos igualmente pinneado.

### B4 — PR environments no garantizan un par web/API ni cookies/CORS funcionales

- **AD implicadas:** AD-10, AD-15, AD-16.
- **Implementación web válida:** un preview Vercel usa su dominio `*.vercel.app` y descubre una API Railway PR por variable de entorno.
- **Implementación API válida:** crea un dominio Railway efímero con CORS exacto y cookie `SameSite=Lax`; otro PR del repositorio contrario puede no existir o apuntar a un contrato distinto.
- **Incompatibilidad:** Vercel y Railway son sitios distintos, por lo que la cookie anónima `SameSite=Lax` no viaja en `fetch` cross-site aunque use `credentials: include`; además no se define correlación entre PRs, origen exacto permitido ni contrato compatible del par.
- **Cierre requerido:** decidir un patrón de preview: proxy same-origin, subdominios bajo un mismo site controlado, o cookie `SameSite=None; Secure` con las defensas CSRF correspondientes. Definir emparejamiento web/API por identificador de entorno, provisioning/teardown coordinado y gate de digest OpenAPI.

### B5 — Una versión de archivo puede convertirse en `current_version_id` antes de superar el escaneo

- **AD implicadas:** AD-4, AD-9, AD-11.
- **Implementación de Recursos válida:** al crear la `ResourceVersion` después de calcular hash, AD-4 actualiza inmediatamente `resource.current_version_id`, aunque el Upload siga `scanning`.
- **Implementación de Uploads válida:** interpreta “solo `ready` habilita uso normal” y no promueve la versión hasta obtener resultado limpio, conservando la versión vigente anterior.
- **Incompatibilidad:** lecturas privadas, IA y nuevas proyecciones pueden resolver una versión no inspeccionada en una implementación y la última limpia en otra; un rechazo deja distinto puntero canónico.
- **Cierre requerido:** separar `candidate_version_id` de `current_version_id` o declarar que la versión se crea como candidata y solo se promueve atómicamente al pasar a `ready`; rechazo/fallo conserva la versión limpia previa. Todos los consumidores deben excluir candidatas salvo la UI de estado del upload.

### Resultado de los límites solicitados

- **Clerk/local user:** sin nuevo bloqueo de compatibilidad; `clerk_user_id` único + `ensureLocalUser` idempotente y autorización local fijan la identidad suficientemente para el spine.
- **Transacción/jobs:** sin nuevo bloqueo; PostgreSQL compartido, `pg-boss` único y enqueue dentro de la transacción fijan el protocolo base. La evolución de handlers queda cubierta por eventos versionados y expand/migrate/contract.
- **Bloquean cierre:** B1–B5.

**Disposición final del recheck — 2026-09-21:** **PASS** — B1–B5 quedaron cerrados y la última pasada adversarial no encontró otro bloqueo de compatibilidad al nivel del spine.
