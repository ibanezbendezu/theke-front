# Addendum del PRD: Theke

Este addendum conserva decisiones de interacción para la futura especificación de UX. Las reglas de negocio y permisos normativos permanecen en el PRD.

## Decisiones pendientes de UX

- Comportamiento del lote creado al soltar varios archivos y forma de reorganizarlo.
- Mecanismo principal y accesible de incorporación que no requiera arrastrar y soltar.
- Diferenciación visual entre Recurso, nota canónica, Anotación visual, Relación y elemento decorativo.
- Exploración de una Carpeta desde el Diagrama; en el MVP no puede actuar como extremo de una Relación.
- Densidad, tamaños y estados expandidos de las tarjetas, que deberán validarse en el MVP.

## Intenciones de interacción confirmadas

### Incorporación

- Soltar archivos en la Biblioteca crea Recursos sin colocarlos; soltarlos en el Canvas crea también sus Representaciones.
- Arrastrar un Recurso existente crea otra Representación sin duplicar contenido canónico.
- Theke reconoce el tipo y elige una Representación inicial. Una carga múltiple crea Recursos independientes, los distribuye sin solaparlos y no afirma Relaciones implícitas.
- El menú contextual es un atajo de creación y carga, no la única vía visible. Véanse FR-6, FR-7 y FR-12 a FR-14.

### Semántica visual

- Recursos, notas canónicas, Anotaciones visuales y comentarios necesitan identidades visuales distintas.
- Formas, separadores, fondos y líneas decorativas pertenecen a la presentación; las conexiones semánticas entre Recursos deben distinguirse de ellas.
- Las Relaciones conectan solo Recursos en el MVP. Pueden ser dirigidas o no dirigidas, usar tipos sugeridos o personalizados reutilizables dentro del Proyecto y conservar explicación, evidencia y procedencia. Véanse FR-17, FR-18 y FR-21.

### Carpetas y grupos

- Una Carpeta organiza referencias a Recursos dentro de un Proyecto y puede representarse sin materializar toda la colección.
- El nodo Carpeta muestra identidad y tamaño y abre una exploración para seleccionar o arrastrar Recursos individuales.
- Un Grupo organiza Representaciones ya colocadas en el Canvas; no comparte la semántica de una Carpeta. Véanse FR-15 y FR-16.

### Tarjetas y detalle

- Los Recursos aparecen inicialmente como tarjetas compactas reconocibles por tipo.
- Edición, detalle, previsualización o reproducción se revelan bajo demanda para preservar visión general y rendimiento. Véase FR-14.

## Asistencia de IA

La orientación debe aparecer de forma contextual, explicada y no bloqueante. El autor puede solicitar una revisión de Relaciones, Grupos, una selección o el Diagrama completo, editar o descartar propuestas y continuar sin IA. UX deberá hacer visible el alcance analizado, el fundamento y la confirmación previa a cualquier cambio. Véanse FR-24 a FR-31.

## Experiencia del compartido

El visitante navega una composición fija y comenta mediante una herramienta visible compatible con teclado y tacto; el menú contextual funciona como atajo. El autor previsualiza la exposición, recibe marcadores y una lista navegable y controla comentarios y acceso. UX deberá definir claramente los estados activo, comentarios desactivados, revocado, resuelto y sin anclaje. Véanse FR-32 a FR-40.
