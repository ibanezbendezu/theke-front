# Reconciliación de fuentes UX — Theke

## Veredicto

`DESIGN.md` y `EXPERIENCE.md` preservan con alta fidelidad la intención del brief, las decisiones del PRD y las restricciones brownfield. Los spines convierten la visión en un contrato visual y conductual coherente sin tratar el prototipo como producto terminado. No se observan pérdidas sustantivas en serenidad, autonomía manual, explicación y control de IA, separación global/local, semántica de elementos, comentarios contextuales, responsive del compartido ni accesibilidad de base.

La reconciliación encuentra cuatro brechas acotadas: una contradicción de contraste dentro de `DESIGN.md` y tres decisiones conductuales presentes en las fuentes que no quedaron cerradas o suficientemente explícitas en `EXPERIENCE.md`.

## Preservación por cualidad

| Cualidad o decisión | Resultado | Evidencia en los spines |
|---|---|---|
| Serenidad y contenido primero | Preservada | `DESIGN.md` define una “mesa de estudio amplia”, cromado retirado, color semántico limitado, ausencia de celebración y profundidad basada en tono/borde. `EXPERIENCE.md` mantiene voz breve, sin exclamaciones, culpa ni antropomorfismo. |
| Autonomía y construcción manual | Preservada | Foundation declara “Manual siempre disponible”; `Add Menu`, `Relation Editor` y todos los estados de IA conservan operación manual. Los anti-patterns rechazan chat obligatorio, relaciones automáticas y diagramas generados. |
| IA explicable, opcional y controlada | Preservada | `AI Guidance Card`, consentimiento de alcance, separación entre evidencia/inferencia/carencias, confirmación antes de cambios, procedencia y estados de fallo cubren FR-24 a FR-31 y los principios del brief. |
| Recurso, Representación, Relación, Carpeta, Grupo, Anotación y comentario | Preservada | Los componentes, Shapes, `Context Panel`, `Folder Card`, `Group Frame`, `Semantic Relation` y las reglas global/local distinguen forma, comportamiento y ciclo de vida sin depender sólo del color. |
| Comentarios separados del conocimiento | Preservada | `Comment Marker`, `Comment Composer`, estados cerrado/revocado/sin anclaje y Flows 5–6 conservan autoría del visitante, moderación del autor, composición fija y ausencia de conversión automática a conocimiento. |
| Responsive y plataforma | Preservada | Autoría web de escritorio, reducción de paneles en viewport compacto y compartido adaptable con hoja inferior en móvil coinciden con NFR-21/NFR-22. No promete autoría móvil completa. |
| Accesibilidad | Preservada con una brecha visual | `Accessibility Floor` cubre WCAG 2.2 AA, alternativas a drag/clic derecho/doble clic/hover, foco, tamaño de objetivos, lista no espacial, zoom, multimedia, `aria-live` y movimiento reducido. El contraste del marcador de comentario contradice ese piso; véase G1. |
| Invariantes React Flow y Zustand | Preservadas | Ambos spines declaran `AGENTS.md` obligatorio; además fijan `container` como `Group Frame`, etiqueta exterior, handles fuera de `overflow-hidden`, ausencia de `transition-all`, `nodrag`/`nopan`, movimiento conjunto de hijos y reparentado sujeto a las invariantes verificadas. |
| Brownfield y frontend actual | Preservado como punto de partida | `EXPERIENCE.md` conserva React Flow, navegación, tema, tarjetas, Grupos, aristas editables y zoom, pero elimina Comunidad del MVP y declara que los spines prevalecen frente a mocks, rutas y controles incompletos actuales. |

## Gaps

### G1 — High — El marcador de comentario no cumple el contraste declarado

**Fuentes:** PRD NFR-19 exige WCAG 2.2 AA; el addendum exige que comentarios sean distinguibles y usables en el compartido.

**Spine:** `DESIGN.md` fija `{colors.comment}` `#D9730D` con `{colors.on-primary}` `#FFFFFF` para `comment-marker`, mientras su propia sección de contraste exige 4.5:1 para texto normal. Esa combinación alcanza aproximadamente **3.28:1** en tema claro. El número del marcador es información textual y no queda cubierto por el umbral de 3:1 reservado a texto grande o elementos gráficos.

**Impacto:** la identidad visual de una función central incumple el piso de accesibilidad que el spine promete y puede perder legibilidad en marcadores pequeños.

**Cierre requerido:** ajustar el fondo o foreground del marcador claro y registrar el par validado con contraste mínimo de 4.5:1; conservar naranja como señal semántica no exige usarlo como fondo del número.

### G2 — Medium — El ciclo de la identidad anónima sigue implícito

**Fuentes:** PRD FR-36/FR-38 limita la edición a la identidad de sesión y el gate de Identidad exige que Arquitectura y UX definan su duración antes de las historias de comentarios.

**Spine:** `Comment Composer` solicita el nombre la primera vez y Flow 5 permite que María edite su comentario, pero no se marca como decisión pendiente cuándo expira la identidad, qué ocurre al cerrar navegador o cambiar de dispositivo ni qué estado ve el visitante cuando ya no puede demostrar autoría.

**Impacto:** los wireframes y las historias podrían asumir recuperabilidad o persistencia incompatibles entre sí.

**Cierre requerido:** añadir el gate explícito a `EXPERIENCE.md` y definir los estados UX de identidad vigente, perdida/expirada y nueva sesión, sin anticipar el mecanismo técnico de autenticación.

### G3 — Medium — Republicar no conserva la semántica completa acordada

**Fuentes:** PRD FR-33 asume un único Compartido activo por Diagrama; revocar y volver a publicar crea **un enlace y un hilo de comentarios nuevos**, mientras el historial anterior queda disponible sólo para el autor.

**Spine:** `Confirm Dialog` menciona revocar/republicar y `State Patterns` conserva el historial tras revocación, pero no declara que republicar rota la URL, inicia un hilo separado y no reactiva el acceso anterior.

**Impacto:** Share Wizard, historial de comentarios y arquitectura de publicación podrían implementar reactivación del mismo enlace, contradiciendo la decisión fuente.

**Cierre requerido:** incorporar un estado/flujo breve de republicación con sus consecuencias visibles antes de confirmar.

### G4 — Medium — La semántica distinta de soltar archivos no quedó normativa

**Fuentes:** el addendum del PRD confirma que soltar archivos externos en Biblioteca crea Recursos sin colocarlos, mientras soltarlos en Canvas crea Recursos y Representaciones; la carga múltiple no crea Relaciones ni Grupo.

**Spine:** Flow 1 y los estados describen carga desde Canvas, lote y ausencia de agrupación semántica; el Canvas vacío indica que admite arrastre. Sin embargo, el contrato no explicita en un mismo patrón la diferencia de resultado entre drop en Biblioteca y drop en Canvas.

**Impacto:** los dos drop targets pueden terminar comportándose igual o duplicando contenido, debilitando la distinción canónica entre Recurso y Representación.

**Cierre requerido:** añadir a `Interaction Primitives` o `Component Patterns` una regla comparativa de ambos destinos y mantener `Add Menu` como alternativa accesible principal.

## Compatibilidad con el frontend actual

- Las divergencias visibles del prototipo son deliberadas y están correctamente tratadas como trabajo pendiente: `/explore`, rótulos de Notion, retorno fijo a Biblioteca, datos mock, ruta `/canvas/:id` sin carga real, creación dependiente de menú contextual y ausencia de paneles, publicación y guardado.
- La estrategia visual parte de los tokens de `src/index.css`, pero los sustituye con un set semántico más completo; esto es coherente con el brownfield y no una pérdida de fuente.
- La arquitectura de interacción propuesta no contradice el reparentado existente siempre que implementación continúe canalizando mutaciones estructurales por Zustand, conserve el orden padre-hijo y aplique el cálculo absoluto/relativo descrito en `AGENTS.md`.

## Conclusión de reconciliación

Con G1 corregido y G2–G4 incorporados como reglas explícitas, los spines quedan alineados con las fuentes declaradas y suficientemente estables para alimentar arquitectura, historias y futuros mocks sin reinterpretar decisiones centrales.
