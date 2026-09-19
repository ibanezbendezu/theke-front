# PRD Quality Review — Theke

## Overall verdict

El PRD tiene una tesis de producto clara, un modelo conceptual consistente y decisiones valiosas sobre reutilización, asistencia de IA y publicación. Es una base adecuada para continuar la planificación, pero todavía no está listo para convertirse sin mediación en arquitectura e historias: el MVP acumula demasiadas superficies, varias decisiones abiertas condicionan la solución y el documento no distingue el prototipo brownfield de las capacidades nuevas.

## Decision-readiness — adequate

Las decisiones principales sí aparecen como decisiones: los recursos y relaciones son canónicos, la composición pertenece al diagrama, la publicación es viva y revocable, los comentarios no pasan al conocimiento global y la IA requiere confirmación humana. Las secciones “Fuera de alcance”, “Reglas del modelo de conocimiento” e “Identidad, almacenamiento y publicación” permiten entender qué producto se está proponiendo.

Sin embargo, varias preguntas abiertas no son detalles posteriores: cambian la arquitectura, el coste, la privacidad o la aceptación del MVP. Además, el documento declara elecciones importantes sin registrar el coste asumido ni la alternativa descartada, lo que dificulta defenderlas cuando aparezcan objeciones.

### Findings

- **high** Decisiones abiertas que condicionan la construcción (§ Preguntas abiertas 1, 2, 4, 6 y 7) — Cuotas y formatos, autenticación, retención y exportación, proveedor/coste de IA y umbrales de rendimiento afectan almacenamiento, modelo de seguridad, contratos e infraestructura. No pueden permanecer como una lista indiferenciada al comenzar arquitectura. *Fix:* clasificar cada pregunta como gate previo a arquitectura, gate previo a beta o decisión reversible; asignar un valor provisional, responsable y fecha de resolución.
- **medium** Trade-offs principales sin registro explícito (§ Reglas del modelo de conocimiento; § Identidad, almacenamiento y publicación) — Enlace vivo frente a snapshot, comentarios anónimos frente a abuso y copia administrada frente a referencia externa son elecciones reales, pero sólo se expresa lo elegido. *Fix:* añadir una tabla breve de decisiones con opción elegida, alternativa descartada, beneficio, coste y condición para revisarla.

## Substance over theater — adequate

Los dos protagonistas cumplen una función real: Daniel conduce la autoría y María la experiencia pública. Los recorridos determinan permisos, identidad ligera, comentarios contextuales y alcance de IA; no son personas decorativas. La diferenciación entre recurso, representación, relación, grupo y comentario también está ganada por el problema.

La mayor parte de los NFR es específica, pero algunos enunciados conservan vocabulario aspiracional que aparenta precisión sin crear un criterio reproducible. La amplitud de tipos de recurso también oculta diferencias sustanciales de soporte bajo una sola línea.

### Findings

- **medium** Umbrales aparentes con variables indefinidas (§ NFR-1, NFR-10, NFR-19 y NFR-21) — “Fluida”, “hardware de gama media”, “sin demora perceptible”, “versiones actuales” y documentar limitaciones de accesibilidad no producen una prueba repetible. *Fix:* definir dispositivo/navegador de referencia, métricas de interacción y revocación, matriz de navegadores y excepciones WCAG conocidas con fecha de resolución.
- **medium** Paridad implícita entre tipos de recurso (§ FR-7 y FR-14) — Enumerar nota, PDF, imagen, audio, video, enlace y archivo genérico puede hacer pensar que todos tendrán carga, previsualización, reproducción, búsqueda y análisis equivalentes, aunque “según corresponda” no los delimita. *Fix:* añadir una matriz por tipo con capacidades obligatorias del MVP y comportamiento de fallback.

## Strategic coherence — adequate

El documento sí sostiene una apuesta: el valor no está en dibujar libremente, sino en conservar conocimiento canónico reutilizable, construir manualmente representaciones comprensibles y recibir guía opcional sin ceder agencia. Los no objetivos y las contramétricas protegen esa tesis frente a generación automática y densidad artificial.

Las métricas se orientan al recorrido correcto, pero varias no son operables y la principal apuesta diferenciadora —que la guía de IA mejora el proceso— sólo se mide por cumplimiento de controles, no por utilidad. Por ello el PRD puede demostrar que la IA fue segura sin demostrar que agregó valor.

### Findings

- **high** La utilidad de IA no se valida (§ Objetivos del MVP; § SM-5) — SM-5 comprueba alcance, fundamento y confirmación, pero no si una sugerencia ayuda a detectar evidencia, reorganizar o comprender mejor. Esto deja sin prueba el componente descrito como más atractivo y potencialmente monetizable. *Fix:* añadir una métrica de resultado para sugerencias útiles, con tarea observada, evaluación del usuario, tasa de acción cualificada y contramétrica de correcciones o falsas relaciones.
- **high** Métricas sin protocolo ni umbral suficiente (§ SM-1 a SM-6) — SM-3 no fija proporción, SM-4 usa “la mayoría” sin instrumento, SM-6 no define tasa, y ninguna métrica establece tamaño de cohorte, ventana completa o tratamiento de abandono. *Fix:* definir para cada SM población, evento, denominador, umbral, ventana e instrumento; marcar los valores todavía hipotéticos como tales.

## Done-ness clarity — thin

Muchos requisitos expresan una consecuencia verificable y las reglas del modelo eliminan ambigüedades importantes. Sin embargo, varios FR agrupan flujos completos o múltiples tipos de contenido en una sola unidad, y decisiones abiertas impiden escribir criterios de aceptación estables. El documento describe bien el producto futuro, pero todavía exige interpretación sustancial para determinar cuándo cada historia está terminada.

La asistencia de IA y la identidad anónima son las áreas más frágiles: se especifica el principio de control, pero no los estados, límites y fallos necesarios para pruebas end-to-end.

### Findings

- **high** Requisitos funcionales demasiado agregados (§ FR-1, FR-2, FR-7, FR-14, FR-35 y FR-39) — Cada uno combina varias capacidades independientemente entregables y con fallos diferentes; por ejemplo FR-39 mezcla notificación, dos vistas, navegación, resolución, eliminación y prohibición de editar. *Fix:* dividirlos en requisitos atómicos o añadir subcriterios Given/When/Then por capacidad y estado de error.
- **high** Preguntas abiertas bloquean criterios de aceptación (§ FR-1, FR-6 a FR-8, FR-30 a FR-38; § Preguntas abiertas) — No se puede cerrar recuperación de cuenta, carga, persistencia, análisis, publicación o comentarios sin límites de formato/cuota, duración de sesión, política de datos y proveedor. *Fix:* adoptar valores provisionales comprobables para el MVP y convertir cualquier decisión pendiente en un gate explícito antes de story creation.
- **medium** Contrato de sugerencias incompleto (§ FR-25 a FR-31) — Se define qué debe mostrar una sugerencia, pero no estados como análisis parcial, fuente ilegible, evidencia contradictoria, timeout, coste/límite alcanzado o ausencia de sustento. *Fix:* especificar estados terminales, mensajes mínimos, reintento/cancelación y conducta cuando una fuente no puede analizarse.
- **medium** Ciclo de identidad anónima no verificable (§ FR-36 a FR-38) — “Durante la vigencia de su identidad de sesión” no dice cuándo expira, qué ocurre al cambiar de dispositivo o borrar almacenamiento, ni si un visitante puede recuperar autoría. *Fix:* fijar duración, almacenamiento, recuperación/no recuperación y comportamiento tras expiración para el MVP.

## Scope honesty — adequate

Las omisiones están declaradas con claridad, el documento distingue “Fuera de alcance” de “Diferido” y los supuestos inline vuelven correctamente al índice. También evita presentar líneas de tiempo, coedición o descubrimiento público como si fueran parte tácita del MVP.

El principal problema no es scope creep oculto, sino que el alcance reconocido como MVP sigue siendo una plataforma completa: identidad, archivos, biblioteca, canvas, conocimiento canónico, IA, publicación, comentarios y moderación. “Asistencia de IA limitada” no está traducida en un corte vertical mínimo.

### Findings

- **high** MVP sin secuencia de demostración (§ Alcance del MVP — Incluido) — Ocho superficies de producto y múltiples riesgos de infraestructura aparecen como simultáneamente necesarias. Esto impide saber qué se recorta si tiempo, coste o complejidad contradicen el plan. *Fix:* definir un “MVP demostrable” de camino crítico con Must/Should/Later y una secuencia de incrementos; limitar inicialmente tipos de recurso y uno o dos casos de IA.
- **medium** Semántica de archivo y eliminación todavía abierta dentro del alcance (§ FR-2, FR-4, FR-10, FR-23; § Pregunta abierta 4) — Archivar se usa como mecanismo de seguridad, pero no se especifican visibilidad, restauración, retención ni interacción con compartidos vivos. *Fix:* declarar reglas mínimas de archivado, papelera, restauración y eliminación definitiva, dejando sólo los plazos regulatorios avanzados para después.

## Downstream usability — adequate

El glosario conceptual es útil, los IDs son continuos y únicos, los recorridos tienen protagonistas nombrados y el addendum conserva decisiones de interacción sin convertirlas prematuramente en implementación. Estas cualidades permiten extraer material para UX y arquitectura.

La trazabilidad es parcial: algunas métricas enlazan rangos de FR, pero no existe una correspondencia completa entre objetivos, recorridos, requisitos y NFR. Además, el addendum introduce restricciones importantes sin IDs, lo que dificulta trasladarlas a historias y comprobar después que no se perdieron.

### Findings

- **medium** Trazabilidad insuficiente para una cadena UX → arquitectura → historias (§ Recorridos de usuario; § Requisitos funcionales; § Métricas de éxito) — Sólo FR-1 y FR-33 señalan explícitamente un UJ, y varias referencias de SM cubren rangos amplios sin mostrar qué resultado satisface cada requisito. *Fix:* añadir una matriz compacta Objetivo/UJ → FR → NFR/SM y marcar requisitos habilitadores sin recorrido directo.
- **low** Deriva de términos de publicación (§ Conceptos del producto; § NFR-2; § FR-32 a FR-40) — “Compartido”, “Vista compartida”, “publicación” y “enlace compartido” se alternan para entidad, vista y mecanismo. *Fix:* reservar un término para la entidad publicada, otro para su vista pública y otro para la URL, y actualizar el glosario.
- **low** Addendum sin anclajes de requisitos (§ Addendum completo) — Diferencias críticas como carpeta versus grupo, conexión semántica versus línea decorativa y acceso alternativo al clic derecho no apuntan a FR/NFR concretos. *Fix:* etiquetar cada bloque del addendum con los IDs que refina o convertir las reglas invariantes en criterios dentro del PRD.

## Shape fit — thin

La forma de PRD orientado a experiencia encaja con un producto de usuario final: los dos recorridos son load-bearing y el modelo conceptual sirve a UX y arquitectura. La formalidad tampoco es excesiva para un documento chain-top.

No obstante, Theke es brownfield y el PRD está escrito como greenfield. No identifica qué parte del recorrido ya existe en el prototipo, qué es mock, qué debe conservarse ni qué contratos actuales condicionan la evolución. Esta ausencia es particularmente riesgosa porque el siguiente trabajo deberá decidir entre extender, migrar o sustituir componentes existentes.

### Findings

- **high** Ausencia de baseline brownfield (§ documento completo) — El PRD no distingue capacidades actuales del canvas, nodos, agrupación y estado local frente a persistencia, biblioteca, autenticación, IA y publicación aún inexistentes. *Fix:* añadir una sección “Estado actual y brecha” con `existente / parcial / nuevo`, referencias verificadas al repositorio y conductas que deben preservarse.
- **medium** Sin estrategia de transición del prototipo al producto (§ FR-3, FR-9 a FR-23; § NFR-4 y NFR-6) — El salto desde datos demostrativos/estado cliente hacia entidades canónicas persistentes no explicita compatibilidad, migración o descarte de datos actuales. *Fix:* declarar si los datos mock no se migran y definir los límites de transición que arquitectura deberá resolver, incluyendo identidad de nodos y relaciones existentes.

## Mechanical notes

- IDs: UJ-1 a UJ-2, FR-1 a FR-40 y NFR-1 a NFR-22 son contiguos y únicos. SM-1 a SM-6 son continuos; SM-C1 y SM-C2 forman una serie diferenciada válida de contramétricas.
- Referencias: no se observan IDs inexistentes, aunque las referencias por rangos son demasiado amplias para trazabilidad fina.
- Assumptions Index: los cuatro supuestos inline (NFR-1, NFR-4, SM-1 y SM-2) aparecen en el índice, y no hay entradas huérfanas.
- Protagonistas: UJ-1 nombra a Daniel; UJ-2 nombra a Daniel y María, con contexto suficiente.
- Secciones: están presentes resumen, objetivos, no objetivos, usuarios, conceptos, recorridos, reglas, FR, NFR, alcance, métricas, preguntas e índice de supuestos. Falta únicamente el baseline brownfield exigido por la forma real del proyecto.
- Glosario: es sólido, pero conviene normalizar los términos relacionados con publicación y evitar que “conexión” se use tanto para una Relación semántica como para navegación o elementos visibles del canvas.
