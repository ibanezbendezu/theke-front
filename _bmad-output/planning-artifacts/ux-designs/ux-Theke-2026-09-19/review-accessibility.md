# Revisión ad-hoc de accesibilidad — reevaluación final

## Alcance

Reevaluación de `DESIGN.md` y `EXPERIENCE.md` corregidos contra WCAG 2.2 AA y las interacciones espaciales de Theke. Se volvió a comprobar el límite visual de controles, los usos de `warning` y `resource-note`, la Vista semántica y el tratamiento antiabuso. También se confirmó que siguen presentes los contratos ya aceptados para teclado, foco, equivalentes espaciales, multimedia, comentarios, reflow, reducción de movimiento y anuncios.

Esta revisión evalúa el contrato UX. La conformidad final requiere pruebas sobre la implementación renderizada.

Referencias: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/understanding/), [Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) y [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Veredicto

Los spines están **listos para alimentar arquitectura e historias accesibles, sin bloqueos documentales de severidad alta o media**.

El nuevo `control-border` corrige el único bloqueo del sistema visual. Los usos de `warning` y `resource-note` ya están delimitados de manera suficiente siempre que la implementación respete el carácter redundante/no exclusivo del color. La Vista semántica conserva paridad funcional suficiente con las operaciones esenciales del Canvas.

Permanece un único hallazgo bajo: el estado antiabuso ofrece recuperación accesible, pero todavía no prohíbe explícitamente que el mecanismo de verificación subyacente dependa sólo de imagen, audio o tiempo.

## Verificaciones focales

### 1. Límite de controles

| Uso | Par | Ratio aproximado | Resultado |
|---|---|---:|---|
| `control-border` claro | `#666663` / `#FFFFFF` | 5.76:1 | Pasa 1.4.11. |
| `control-border-dark` | `#C7C7C4` / `#191919` | 10.38:1 | Pasa 1.4.11. |

`Button Secondary`, `Text Field` y `Semantic View` usan ahora `control-border`. `border` queda para separación de baja jerarquía y `border-strong` para foco estructural, no como único límite de un control.

**Estado:** resuelto.

### 2. `warning` y `resource-note`

`warning` queda restringido a iconos, bordes o texto grande con contraste verificado; el texto normal usa `foreground` y no depende del naranja sobre blanco. Los tokens `resource-*` se acompañan de título e iconografía diferenciable sin color; si `resource-note` funciona como fondo, usa `on-resource-note`, combinación que alcanza aproximadamente 8.34:1 en claro y 13.05:1 en oscuro.

El valor claro de `resource-note` no debe convertirse por implementación en el único trazo de un icono funcional sobre blanco, pues por sí solo alcanza aproximadamente 2.11:1. Bajo el contrato actual es un acento redundante, no la única información.

**Estado:** resuelto documentalmente; validar el uso real de los tokens en componentes.

### 3. Vista semántica

La Vista semántica está definida como árbol/lista sincronizado de Grupos, Recursos y Relaciones. Permite buscar, seleccionar, abrir detalle, mover por incrementos, agrupar, conectar, mostrar/ocultar y saltar al equivalente visual. Foco y selección se reflejan entre ambas vistas sin movimiento inesperado de cámara, y la superficie conserva reflow fuera del plano bidimensional.

Esto proporciona una alternativa no espacial a las operaciones esenciales de autoría y exploración; los comandos visibles de mover, redimensionar, agrupar/sacar, conectar y distribuir completan la paridad con drag y handles.

**Estado:** resuelto como contrato; validar semántica de árbol/lista, orden, anuncios y sincronización sobre código.

### 4. Antiabuso de comentarios

El estado “Comentario limitado por antiabuso” conserva el borrador, explica el límite sin culpar, anuncia cuándo reintentar y ofrece una vía accesible de contacto o reporte. Esto resuelve la recuperación tras el bloqueo.

Sin embargo, el spine no exige todavía que el control antiabuso que provoca o evita ese estado sea operable por teclado y tecnología asistiva ni que ofrezca una alternativa equivalente a desafíos visuales, auditivos o temporizados.

**Estado:** parcialmente resuelto; hallazgo bajo antes del piloto externo.

## Hallazgo restante

### A11Y-R1 — Low — Falta un guardrail para el mecanismo antiabuso subyacente

**Ubicación:** `EXPERIENCE.md > State Patterns > Comentario limitado por antiabuso`, `Comment Composer` y `Accessibility Floor`.

La recuperación accesible está definida, pero una historia podría introducir un CAPTCHA visual, un reto sólo auditivo o un desafío dependiente de tiempo sin contradecir expresamente el spine.

**Impacto:** no bloquea arquitectura, UX ni la preparación de historias del MVP; debe cerrarse antes de seleccionar o implementar un mecanismo antiabuso para el piloto externo.

**Corrección concreta:** exigir que cualquier verificación antiabuso sea operable por teclado y tecnología asistiva, no dependa exclusivamente de imagen, audio o tiempo y ofrezca una alternativa equivalente.

## Validaciones de implementación

No son bloqueos del spine:

1. Verificar contraste real de todos los estados, especialmente iconos de tipo de Recurso y mensajes warning.
2. Probar la Vista semántica y su sincronización con teclado y lectores de pantalla, sin desplazamiento inesperado de cámara.
3. Confirmar que mover, redimensionar, agrupar, conectar y distribuir mantienen paridad, anuncio y deshacer sin puntero.
4. Validar foco, reflow a 320 CSS px, multimedia, `prefers-reduced-motion` y `aria-live` en la implementación.
5. Auditar el mecanismo antiabuso elegido antes del piloto externo.

## Bloqueos restantes

- MVP de planificación: ninguno.
- Arquitectura: ninguno.
- Implementación/piloto externo: cerrar A11Y-R1 al elegir el mecanismo antiabuso y completar las validaciones sobre código.

## Conteo

- Critical: 0
- High: 0
- Medium: 0
- Low: 1
