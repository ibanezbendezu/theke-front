# Epic 1 Context: Biblioteca privada y reutilizable

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Entregar el primer recorrido privado y persistente de Theke: una persona accede a su cuenta, administra Proyectos y conserva una Biblioteca canónica donde puede crear, incorporar, organizar, encontrar, editar y reutilizar Recursos sin duplicarlos. Esta épica establece la base de identidad, autorización, datos y archivos sobre la que los Diagramas posteriores referenciarán conocimiento estable.

## Stories

- Story 1.1: Acceder al espacio privado
- Story 1.2: Crear y administrar proyectos
- Story 1.3: Crear y editar notas canónicas
- Story 1.4: Organizar y reutilizar recursos en proyectos
- Story 1.5: Cargar uno o varios archivos de forma segura
- Story 1.6: Consultar recursos según su tipo
- Story 1.7: Guardar enlaces web como recursos
- Story 1.8: Buscar y filtrar la biblioteca
- Story 1.9: Archivar o eliminar con impacto visible

## Requirements & Constraints

- El autor debe poder crear cuenta, iniciar y cerrar sesión y recuperar acceso sin perder trabajo ya persistido. El acceso inicial usa código de un solo uso por correo y Google mediante Clerk.
- Proyectos, Biblioteca y Recursos son privados por defecto y están aislados por Cuenta. Un autor puede crear, renombrar, abrir, archivar y eliminar Proyectos, con impacto y confirmación antes de operaciones destructivas.
- Cada Cuenta posee una Biblioteca canónica accesible fuera de un Diagrama. Los Proyectos seleccionan y organizan referencias mediante Carpetas, pero no duplican contenido.
- El MVP admite notas editables, PDF, imágenes, audio, video, enlaces web y archivos genéricos. Cuando no hay preview, siempre debe conservar metadatos y acceso seguro al original.
- Las cargas comunican progreso y resultado por archivo. El piloto admite 20 archivos por lote, 250 MiB por archivo y 5 GiB por Cuenta; preview de audio hasta 120 minutos y video hasta 30 minutos.
- Editar contenido compatible conserva la identidad canónica y crea versiones; los usos resuelven la versión vigente. Quitar una referencia nunca elimina el Recurso.
- Biblioteca, Carpetas y listados usan carga progresiva y paginación estable. Las acciones esenciales deben funcionar con teclado y controles visibles, sin depender de arrastre, hover o clic derecho.
- Toda comunicación usa cifrado en tránsito, los objetos se cifran en reposo y ninguna consulta o identificador proporcionado por el cliente puede romper el aislamiento entre Cuentas.

## Technical Decisions

- `theke-web` y `theke-api` son repositorios y despliegues independientes. El frontend React consume exclusivamente REST versionado bajo `/v1` mediante un cliente generado desde OpenAPI publicado en `@theke/contracts`; debe soportarse la versión actual y la inmediatamente anterior.
- El backend es Node.js 24 con TypeScript estricto, NestJS sobre Fastify y un monolito modular. PostgreSQL y Drizzle son la persistencia; Vercel aloja la SPA y Railway aloja API, worker, PostgreSQL y almacenamiento S3 privado.
- Clerk autentica, pero Theke mantiene `User`, `Account` y `Membership`. Cada request privado deriva un `AuthContext`; los repositorios tenant-owned requieren `accountId` interno y constraints compuestas impiden referencias cruzadas.
- Recursos, versiones y metadatos son entidades normalizadas. `ResourceVersion` es inmutable y `resource.current_version_id` cambia mediante revisión esperada. Carpetas y membresías de Recursos pertenecen al Proyecto.
- Los uploads usan URL firmada hacia cuarentena, estados idempotentes y promoción atómica a una key limpia. Un worker separado procesa jobs de pg-boss encolados dentro de la transacción Drizzle. ClamAV `clamd`, aislado en red privada y actualizado con `freshclam`, escanea mediante `INSTREAM` y falla cerrado.
- La obtención de metadatos web ocurre server-side con protección SSRF, límites de protocolo, redirecciones, bytes y tiempo. Un fallo de preview no impide guardar la URL.
- Archivar es reversible. El borrado posee ventana recuperable de 30 días, export ZIP previa para la Cuenta y purgado coordinado con tombstones. Backups externos usan Backblaze B2 con Object Lock, RPO de 24 horas y RTO de 4 horas para el piloto.
- Migraciones siguen expand/contract; logs propagan `requestId` sin secretos ni contenido privado. Lint, build, contratos, aislamiento entre Cuentas y recorridos críticos forman parte del gate de integración.

## UX & Interaction Patterns

- La interfaz usa un shell compacto inspirado en IntelliJ IDEA, paleta semántica tipo Notion, tema claro/oscuro/sistema y fallback opaco cuando la translucidez perjudica legibilidad.
- Inicio, Proyectos y Biblioteca son superficies distintas. La Biblioteca global y la selección del Proyecto deben comunicar con claridad cuándo una acción afecta conocimiento canónico o solo organización local.
- Resource Row/Card muestra tipo, nombre, metadatos, estado y acción primaria. Folder Card representa organización, no un Grupo visual. Upload Batch Tray conserva progreso y errores por archivo.
- Estados vacío, carga, error, reintento y permiso insuficiente deben ser específicos. Confirm Dialog explica entidad, alcance y consecuencias; foco, contraste, anuncios y operación por teclado apuntan a WCAG 2.2 AA.

## Cross-Story Dependencies

La autenticación y el contexto de autorización habilitan todas las historias siguientes. Proyectos preceden la Biblioteca organizada; el modelo canónico de notas precede referencias, uploads, tipos, enlaces y búsqueda. La gestión destructiva se implementa al final para calcular impacto sobre todas las entidades ya disponibles. Epic 2 consume estas identidades canónicas, pero Epic 1 entrega una Biblioteca útil sin requerir Canvas, Relaciones, IA ni publicación.
