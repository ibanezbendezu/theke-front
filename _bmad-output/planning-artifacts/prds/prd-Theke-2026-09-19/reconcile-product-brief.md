---
title: "Reconciliación del Product Brief con el PRD: Theke"
status: final
created: 2026-09-19
sources:
  - ../../briefs/brief-Theke-2026-09-19/brief.md
  - ../../briefs/brief-Theke-2026-09-19/addendum.md
  - prd.md
  - addendum.md
---

# Reconciliación del Product Brief con el PRD: Theke

## Veredicto

**Preservación sustancial con reservas.** El PRD conserva la propuesta central, el usuario inicial, el modelo de recursos y relaciones reutilizables, el valor sin IA, el control humano, el grafo compartible, la separación de comentarios y casi todo el alcance diferido del brief. No se detectó ninguna contradicción crítica con la visión.

Sin embargo, el PRD no puede considerarse una traducción completamente fiel sin confirmación del creador: introduce como decisiones cerradas una biblioteca limitada al Proyecto, cuenta obligatoria, copia administrada de archivos, publicación no listada con visitantes anónimos y varias capacidades adicionales. También omite la hipótesis comercial y no convierte dos señales de validación del brief —actuar sobre la IA y recibir comentarios útiles— en métricas de resultado.

### Conteo de hallazgos

| Severidad | Cantidad | Interpretación |
|---|---:|---|
| Crítica | 0 | No hay una contradicción que invalide la propuesta de producto. |
| Alta | 3 | Decisiones u omisiones que pueden cambiar el límite del producto, sus datos o su estrategia. |
| Media | 5 | Expansiones o vacíos que conviene resolver antes de convertir el PRD en compromiso de MVP. |
| Baja | 3 | Trazabilidad o precisión incompleta sin alterar por sí sola el producto. |

## Matriz de preservación de decisiones

### 1. Identidad, problema y usuario

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Theke transforma fuentes dispersas en conocimiento conectado mediante un espacio visual. | Resumen, Objetivos del MVP, UJ-1. | Preservada | La formulación del PRD es consistente con la promesa original. |
| Usuario inicial: persona que estudia en profundidad un tema acotado. | Usuario objetivo y trabajos por realizar. | Preservada | Se mantiene la actividad de estudio como centro del MVP. |
| Teología es el caso inicial, no una limitación de dominio. | Resumen y Usuario objetivo. | Preservada | El PRD añade correctamente que los requisitos no deben depender del contenido religioso. |
| Problema: materiales heterogéneos y fragmentados, relaciones ocultas, falta de visión general. | Trabajos por realizar: reunir fuentes, observar el tema completo, expresar relaciones, detectar vacíos. | Preservada | La formulación se convierte en trabajos verificables. |
| Theke complementa, no reemplaza, el almacenamiento existente. | Fuera de alcance y Alcance diferido. | Preservada con tensión | Se excluye reemplazar almacenamiento y se difiere Drive, pero se decide guardar una copia administrada de cada archivo. La compatibilidad conceptual existe, aunque debe explicitarse el tratamiento de la fuente original. Ver A-3 y M-2. |

### 2. Modelo de conocimiento

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Los recursos conservan identidad y se reutilizan sin volver a cargarlos. | Conceptos; FR-9, FR-19, FR-20 y reglas del modelo. | Preservada | El PRD separa acertadamente Recurso canónico y Representación local. |
| Recursos admitidos: texto/notas, documentos, imágenes, audio, video y enlaces. | FR-7 y FR-8. | Preservada y ampliada | Se añade archivo genérico con descarga, sin conflicto con el brief. |
| Las relaciones tienen significado, explicación/justificación y son reutilizables. | Conceptos; FR-21, FR-22 y reglas del modelo. | Preservada | El PRD añade dirección, tipos, evidencia y procedencia. |
| Cada diagrama decide qué relaciones existentes mostrar. | FR-22; reglas del modelo. | Preservada | Se conserva la separación entre relación global y visibilidad local. |
| Un mismo conocimiento puede observarse en varios contextos sin silos. | FR-9, FR-20 y FR-22. | Parcial | Está garantizado entre Diagramas del mismo Proyecto, pero el PRD crea una frontera de Proyecto que el brief no había decidido. Ver A-1. |
| Las relaciones pueden sustentar nuevas sugerencias o componentes derivados. | FR-26 a FR-30; componentes derivados diferidos. | Preservada | Las sugerencias entran al MVP; los componentes derivados avanzados quedan correctamente diferidos. |
| Debe resolverse qué propiedades son globales y cuáles locales. | Conceptos, reglas del modelo, FR-19 y FR-20. | Preservada/resuelta | Contenido/metadatos son globales; posición, tamaño, estilo y visibilidad son locales. Es una resolución coherente del addendum, aunque todavía faltan matrices por tipo de recurso para diseño y arquitectura. |

### 3. Construcción manual e IA

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| La construcción manual forma parte del aprendizaje. | Objetivos, FR-24, FR-29, Fuera de alcance. | Preservada | La IA no sustituye el recorrido manual. |
| El producto debe ser útil sin IA. | FR-24, NFR-5, NFR-18. | Preservada | Se cubren desactivación, indisponibilidad y límites. |
| IA opcional puede detectar vacíos, conexiones y reorganización y sugerir fuentes. | FR-26, FR-27 y FR-28. | Preservada con precisión parcial | Vacíos, conexiones, agrupación y necesidad de otra fuente están cubiertos. No se promete búsqueda autónoma; queda diferida. La interpretación es compatible si “sugerir fuentes” incluye recomendar qué evidencia falta, no localizarla automáticamente. |
| Cada sugerencia explica fundamento y ofrece opciones; usuario decide. | FR-29 y FR-31. | Preservada | Se añaden edición, descarte y reporte. |
| Procedencia y explicación de relaciones o contenido de IA. | FR-29, FR-30; NFR-17. | Preservada | Se distingue evidencia, inferencia y carencia de sustento. |
| Hacer visibles las relaciones manuales y las sugeridas por Theke. | FR-30. | Preservada parcialmente | Se conserva la distinción de origen para contenido aceptado, pero no se especifica cómo permanece visible al usuario después de incorporarlo. Ver B-2. |
| IA avanzada es la principal hipótesis de suscripción, todavía por validar y no única fuente de valor. | Sin sección equivalente. | Omitida | Ver A-2. |

### 4. Primera versión y experiencia del autor

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Crear un tema de estudio. | Proyecto como contenedor del tema; FR-2. | Preservada y formalizada | “Proyecto” pasa a ser el nombre de la entidad. |
| Incorporar y conservar recursos en una biblioteca. | FR-3 a FR-9. | Preservada y ampliada | Se añaden carpetas, búsqueda, filtrado, carga múltiple y archivos genéricos. |
| Representar recursos en un grafo. | FR-10 a FR-20. | Preservada y ampliada | Se añaden duplicación/archivo, presentación, carpeta en diagrama y anotaciones visuales. |
| Establecer relaciones explicadas. | FR-21 a FR-23. | Preservada | Se definen extremos válidos y ciclo de vida seguro. |
| Retomar el trabajo en sesiones posteriores. | FR-1, FR-11; NFR-4 y NFR-6. | Preservada | Se exige persistencia y autoguardado. |
| Asistencia limitada de IA sin crear automáticamente el diagrama. | FR-24 a FR-31; fuera de alcance. | Preservada | El análisis por selección/diagrama y la revisión previa a compartir amplían de forma coherente el concepto. |

### 5. Publicación y comentarios

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Compartir vista interactiva mediante enlace. | FR-32 a FR-35. | Preservada | Se define como publicación viva, no listada y revocable. |
| Visitante explora nodos, grupos y recursos asociados. | UJ-2 y FR-35. | Preservada | Se concretan zoom, paneo, expansión, reproducción y conexiones. |
| Composición y posiciones fijas para visitantes. | UJ-2, FR-35, addendum del PRD. | Preservada | Solo el autor controla edición. |
| Comentarios contextualizados pertenecen al compartido, no al conocimiento global. | Concepto Compartido, objetivos, FR-36 a FR-40. | Preservada | No hay conversión automática a Recursos o Relaciones. |
| Visitante crea y edita sus propios comentarios. | FR-36 a FR-38. | Preservada | Se añade nombre visible e identidad anónima de sesión. |
| Autor consulta comentarios en contexto o lista y puede eliminarlos, pero no editar texto ajeno. | UJ-2, FR-39, addendum del PRD. | Preservada | Se añade estado “resuelto” y notificación interna. |
| Coedición futura opcional. | Fuera de alcance y Alcance diferido. | Preservada | No se mezcla con el compartido de lectura/comentarios del MVP. |

### 6. Resultados, señales y negocio

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Completar y retomar mapas. | SM-1 y SM-2. | Preservada | Incluye supuestos cuantitativos marcados. |
| Reutilizar recursos o relaciones. | SM-3. | Preservada | No fija porcentaje, pero conserva la señal. |
| Compartir y permitir exploración/comentario. | SM-1 y SM-6. | Preservada | Mide ejecución sin asistencia. |
| Recibir comentarios útiles. | SM-6 solo mide que se deje un comentario. | Parcial | No mide utilidad o valor de la retroalimentación. Ver M-4. |
| Actuar sobre sugerencias de Theke. | SM-5 mide control y cumplimiento; SM-C1 observa aceptar/editar/descartar/reportar. | Parcial | No existe métrica que determine si la IA provoca una acción útil o mejora el trabajo. Ver M-4. |
| Declarar mejor comprensión de la estructura del tema. | SM-4. | Preservada | Falta umbral definitivo, de forma razonable hasta el piloto. |
| Evitar confundir más nodos/conexiones o aceptación de IA con éxito. | SM-C1 y SM-C2. | Ampliación coherente | Protege los principios del brief. |

### 7. Alcance posterior

| Decisión del brief | Evidencia en el PRD | Estado | Observación |
|---|---|---|---|
| Línea de tiempo y otras gramáticas quedan después. | Fuera de alcance y Alcance diferido. | Preservada | Línea de tiempo sigue siendo la primera candidata futura. |
| Coedición queda después. | Fuera de alcance y Alcance diferido. | Preservada | Se añade “permisos por usuario” al mismo bloque. |
| Plataforma pública avanzada queda después. | Fuera de alcance y Alcance diferido. | Preservada | El enlace no listado es el único mecanismo público del MVP. |
| Automatizaciones complejas quedan después. | Fuera de alcance. | Preservada | También se difiere análisis permanente de la biblioteca. |
| Componentes derivados quedan después. | Fuera de alcance y Alcance diferido. | Preservada | El PRD precisa que se trata de componentes avanzados. |
| Extensiones futuras deben reutilizar biblioteca canónica y evitar silos. | Implícito en el modelo, no expresado como restricción futura. | Parcial | Ver B-3. |

## Hallazgos

### Severidad alta

#### A-1 — La biblioteca y el conocimiento reutilizable quedan limitados al Proyecto sin que el brief haya aprobado esa frontera

**Tipo:** cambio de alcance/modelo.

El brief habla de una biblioteca organizada por el usuario, recursos reutilizables en distintos diagramas y relaciones que forman conocimiento global. El PRD introduce `Proyecto` como contenedor de una Biblioteca y define tipos de relación personalizados “dentro del Proyecto”. Esto garantiza reutilización dentro de un Proyecto, pero no dice si un recurso puede usarse en Diagramas de Proyectos diferentes.

La decisión afecta una promesa diferencial: no duplicar recursos ni perder identidad. Para un usuario que estudia “Juan 1” y luego crea otro Proyecto sobre “Cristología”, la frontera puede obligarlo a duplicar la misma fuente.

**Corrección recomendada:** decidir explícitamente uno de estos modelos antes de finalizar el PRD:

1. Biblioteca por cuenta y Proyectos como vistas/colecciones; o
2. Biblioteca por Proyecto con una operación explícita de reutilización/importación enlazada entre Proyectos; o
3. Reutilización intencionalmente limitada al Proyecto durante el MVP, documentando la desviación y su consecuencia.

#### A-2 — Se pierde por completo la hipótesis de negocio del brief

**Tipo:** omisión estratégica.

El brief establece que el producto base debe ser útil por sí solo, que la IA avanzada es la principal hipótesis inicial de suscripción, que esa hipótesis debe validarse y que el producto no debe depender de la IA como única fuente de valor. El PRD conserva el valor sin IA, pero no menciona monetización, experimentos comerciales, límites entre IA básica/avanzada ni el riesgo de depender de una sola propuesta de pago.

No es necesario diseñar precios en el MVP, pero eliminar la hipótesis impide que el PRD produzca evidencia para validarla.

**Corrección recomendada:** incluir una sección breve de hipótesis de negocio/no compromiso con: propuesta provisional, riesgo, preguntas de validación y qué señal permitiría distinguir valor gratuito de valor pagado.

#### A-3 — Cuenta obligatoria, copia administrada de archivos y publicación anónima no listada se convierten en compromisos sin trazabilidad como supuestos

**Tipo:** expansión y cierre prematuro de decisiones.

El PRD decide que el autor debe autenticarse, que Theke conserva una copia administrada de todo archivo, que el enlace es no listado/vivo/revocable y que el visitante comenta sin cuenta mediante identidad anónima de sesión. Son soluciones plausibles y coherentes, pero no fueron decisiones del brief ni figuran como supuestos o preguntas abiertas.

Estas elecciones determinan arquitectura, costes, privacidad, moderación, recuperación de cuenta y cumplimiento. En particular, la copia administrada puede parecer en tensión con “no reemplazar el almacenamiento existente” si no se conserva procedencia/origen.

**Corrección recomendada:** obtener aceptación explícita o marcar cada decisión como supuesto del MVP. Separar requisito de resultado (“persistir”, “permitir comentario propio”) de mecanismo (“cuenta”, “cookie/identidad de sesión”, “copia administrada”) cuando el mecanismo todavía no esté validado.

### Severidad media

#### M-1 — El PRD añade un segundo bloque grande de alcance visual y de biblioteca

**Tipo:** expansión de MVP.

FR-2, FR-4, FR-5, FR-10 y FR-15 a FR-18 incluyen archivar/eliminar Proyectos, carpetas persistentes, búsqueda/filtrado, duplicar/archivar Diagramas, nodo carpeta, anotaciones decorativas completas y personalización de colores/fondo. Parte tiene apoyo en el prototipo o en menciones del creador, pero el brief solo comprometía biblioteca, grafo, recursos, relaciones, persistencia, IA limitada y compartido.

Cada función es razonable, aunque en conjunto compite con persistencia, publicación, comentarios e IA por capacidad del MVP.

**Corrección recomendada:** etiquetar capacidades como `must/should/could`, o dividir el MVP en incrementos verificables. Como mínimo, justificar carpeta-en-diagrama, duplicación/archivo y personalización como necesarias para el outcome principal.

#### M-2 — “No perder ubicación” y “no reemplazar almacenamiento” no tienen una regla de procedencia de archivos

**Tipo:** requisito incompleto.

El PRD guarda copia administrada y conserva URL para enlaces web, pero no exige registrar nombre/origen/importación de archivos locales o remotos ni explicar qué ocurre cuando la fuente externa cambia. La sincronización con Drive está correctamente diferida, pero la procedencia básica de la fuente sigue siendo relevante para estudio y confianza.

**Corrección recomendada:** definir metadatos mínimos de procedencia por tipo de Recurso y aclarar que la copia administrada es una importación, no sincronización bidireccional.

#### M-3 — La semántica de los comentarios queda ligada al Diagrama, pero no está cerrada para múltiples publicaciones o republicación

**Tipo:** regla de negocio incompleta.

El brief dice que los comentarios pertenecen al compartido. El PRD define `Compartido` con permisos propios, pero FR-33 habla de “un enlace” para un Diagrama y las reglas dicen que revocarlo conserva el historial interno. No especifica si puede existir más de un Compartido por Diagrama, si republicar genera otra audiencia/hilo o si comentarios anteriores reaparecen.

**Corrección recomendada:** fijar cardinalidad Diagrama–Compartido y ciclo de vida de comentarios al revocar/republicar. Mantener como invariante que nunca migran automáticamente al conocimiento global.

#### M-4 — Dos señales de validación del brief se rebajan a comprobaciones de funcionamiento

**Tipo:** omisión de métricas de outcome.

SM-5 verifica transparencia y confirmación de IA, pero no si una sugerencia conduce a añadir evidencia, investigar, reorganizar o conectar mejor. SM-6 verifica que el visitante puede comentar, pero no si el comentario es útil para el autor. El brief exigía observar ambas cosas como señales de valor.

**Corrección recomendada:** añadir una métrica o pregunta cualitativa para (a) acciones útiles iniciadas por sugerencias y (b) utilidad percibida de la retroalimentación recibida. No usar tasa bruta de aceptación como sustituto, en línea con SM-C1.

#### M-5 — El alcance de sugerencias de fuentes es interpretable, no inequívoco

**Tipo:** precisión de requisito.

El brief dice “sugerir fuentes”. FR-26 permite señalar evidencia relacionada o necesidad de otra fuente; el alcance diferido excluye búsqueda web autónoma. Esto es coherente con una IA que recomienda qué tipo de respaldo buscar o qué Recurso existente usar, pero no queda explícito.

**Corrección recomendada:** indicar que en el MVP Theke puede recomendar evidencia existente o formular una necesidad de búsqueda, pero no localizar/importar fuentes externas autónomamente.

### Severidad baja

#### B-1 — La base técnica y las invariantes verificadas del prototipo no tienen referencia en el PRD

**Tipo:** trazabilidad documental.

El addendum del brief pide preservar las reglas operativas de `AGENTS.md`. El PRD puede mantenerse independiente de implementación, pero debería señalar esas restricciones como entrada obligatoria para arquitectura y construcción, especialmente porque el prototipo existente es el punto de partida.

**Corrección recomendada:** añadir una referencia no normativa al addendum/`AGENTS.md` en una sección de contexto técnico o notas para arquitectura.

#### B-2 — La distinción de origen IA queda almacenada, pero su visibilidad posterior no es explícita

**Tipo:** precisión de UX/requisito.

FR-30 exige conservar origen y distinción respecto del contenido manual. El principio del brief pide “hacer visibles” relaciones manuales y sugeridas. No se requiere que esa distinción sea consultable o perceptible después de aceptar la sugerencia.

**Corrección recomendada:** exigir que el usuario pueda consultar el origen y fundamento conservados, dejando a UX decidir si se muestra siempre o bajo demanda.

#### B-3 — La regla futura de evitar silos entre visualizaciones queda implícita

**Tipo:** trazabilidad de alcance posterior.

El PRD difiere nuevas gramáticas y construye un buen modelo canónico, pero no conserva expresamente que futuras líneas de tiempo u otras vistas deben reutilizar la misma biblioteca y relaciones.

**Corrección recomendada:** añadir esa invariante a Alcance diferido o Principios del producto para impedir implementaciones futuras aisladas.

## Cambios de alcance compatibles que no constituyen hallazgo por sí solos

Las siguientes incorporaciones no contradicen el brief y mejoran su verificabilidad, siempre que el equipo acepte el tamaño resultante del MVP:

- separación formal entre Recurso y Representación;
- reglas seguras para eliminar/archivar entidades en uso;
- relaciones dirigidas/no dirigidas y tipos personalizados;
- análisis de IA con alcance visible y autorización para ampliarlo;
- reporte de sugerencias incorrectas y prohibición de inventar citas;
- previsualización y revocación del compartido;
- manejo de comentario cuyo anclaje desaparece;
- carga progresiva, autoguardado visible y estabilidad de identidad;
- privacidad por defecto, aislamiento de cuentas, cifrado y controles de carga;
- transparencia sobre proveedor, retención y entrenamiento de IA;
- accesibilidad WCAG 2.2 AA y alternativas a drag/clic derecho;
- vista compartida adaptable a móvil sin comprometer edición móvil;
- contramétricas que impiden optimizar aceptación de IA o densidad del grafo.

## Cobertura de preguntas del addendum del brief

| Pregunta original | Tratamiento del PRD | Estado |
|---|---|---|
| Propiedades globales vs locales por recurso/representación. | Resuelta en reglas generales y FR-19/FR-20. | Suficiente para PRD; falta detalle por tipo en UX/arquitectura. |
| Otros públicos y disciplinas. | Mantiene apertura, sin elegir nuevos públicos. | Correctamente pendiente. |
| Propuestas de pago además de IA. | No aparece en Preguntas abiertas. | Omitida; cubierta por A-2. |
| Componentes derivados que ayudan sin sustituir aprendizaje. | Diferidos como avanzados. | Correctamente pendiente, pero conviene conservar la pregunta para discovery futuro. |

## Recomendación de cierre

Antes de marcar el PRD como final:

1. Resolver A-1: alcance de biblioteca y reutilización entre Proyectos.
2. Reincorporar la hipótesis y pregunta comercial de A-2.
3. Confirmar o marcar como supuestos las decisiones de identidad, almacenamiento y publicación de A-3.
4. Priorizar las expansiones de M-1 para que “MVP” no equivalga a toda la visión inicial más infraestructura completa.
5. Añadir las dos señales de outcome que faltan en M-4.

Con esas correcciones, el PRD preservaría íntegramente la intención del Product Brief y distinguiría con claridad decisiones del creador, supuestos de diseño y alcance validable.
