---
name: Theke
description: Sistema visual sereno y centrado en contenido para construir, explorar y compartir conocimiento conectado.
status: final
preview-theme: dark
created: 2026-09-19
updated: 2026-09-20
sources:
  - ../../briefs/brief-Theke-2026-09-19/brief.md
  - ../../briefs/brief-Theke-2026-09-19/addendum.md
  - ../../prds/prd-Theke-2026-09-19/prd.md
  - ../../prds/prd-Theke-2026-09-19/addendum.md
  - ../../../../AGENTS.md
  - ../../../../src/index.css
  - ../../../../src/app/router.tsx
  - ../../../../src/features/canvas/CanvasEditor.tsx
colors:
  background: '#FFFFFF'
  foreground: '#37352F'
  foreground-secondary: '#666663'
  surface: '#F7F7F5'
  surface-raised: '#FFFFFF'
  surface-contextual: '#FFFFFFE8'
  surface-contextual-strong: '#FFFFFFF5'
  surface-hover: '#37352F0A'
  surface-active: '#37352F14'
  border: '#37352F29'
  border-strong: '#37352F73'
  control-border: '#666663'
  overlay: '#00000066'
  primary: '#2383E2'
  primary-strong: '#1668A9'
  primary-text: '#1668A9'
  on-primary: '#FFFFFF'
  focus-ring: '#2383E2'
  selection: '#2383E21F'
  relation: '#2383E2'
  ai: '#9065B0'
  comment: '#D9730D'
  on-comment: '#191919'
  success: '#0F7B6C'
  warning: '#CB7B00'
  error: '#C9372C'
  resource-document: '#787774'
  resource-note: '#DFAB01'
  on-resource-note: '#191919'
  resource-image: '#0F7B6C'
  resource-audio: '#9065B0'
  resource-video: '#D9730D'
  resource-link: '#2383E2'
  background-dark: '#1E1F22'
  foreground-dark: '#DFE1E5'
  foreground-secondary-dark: '#9DA0A8'
  surface-dark: '#2B2D30'
  surface-raised-dark: '#313338'
  surface-contextual-dark: '#2B2D30C7'
  surface-contextual-strong-dark: '#2B2D30E8'
  surface-hover-dark: '#FFFFFF0D'
  surface-active-dark: '#3574F033'
  border-dark: '#393B40'
  border-strong-dark: '#6F737A'
  control-border-dark: '#6F737A'
  overlay-dark: '#00000099'
  primary-dark: '#3574F0'
  primary-strong-dark: '#3264C8'
  primary-text-dark: '#6EA6FF'
  on-primary-dark: '#FFFFFF'
  focus-ring-dark: '#4E8FFF'
  selection-dark: '#3574F03D'
  relation-dark: '#6EA6FF'
  ai-dark: '#9A6DD7'
  comment-dark: '#FFA344'
  on-comment-dark: '#191919'
  success-dark: '#4DAB9A'
  warning-dark: '#FFB84D'
  error-dark: '#FF7369'
  resource-document-dark: '#B4B4B0'
  resource-note-dark: '#FFDC49'
  on-resource-note-dark: '#191919'
  resource-image-dark: '#4DAB9A'
  resource-audio-dark: '#9A6DD7'
  resource-video-dark: '#FFA344'
  resource-link-dark: '#529CCA'
typography:
  display: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 32px, fontWeight: '650', lineHeight: '1.2', letterSpacing: -0.02em }
  heading-lg: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 24px, fontWeight: '650', lineHeight: '1.25', letterSpacing: -0.015em }
  heading-md: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 18px, fontWeight: '600', lineHeight: '1.35' }
  body: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 14px, fontWeight: '400', lineHeight: '1.5' }
  body-strong: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 14px, fontWeight: '600', lineHeight: '1.45' }
  label: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 12px, fontWeight: '600', lineHeight: '1.35' }
  caption: { fontFamily: "'JetBrains Sans', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 12px, fontWeight: '400', lineHeight: '1.4' }
rounded:
  sm: 4px
  md: 6px
  lg: 10px
  xl: 12px
  full: 9999px
  DEFAULT: 6px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  page-gutter: 24px
  panel-width: 304px
  sidebar-width: 224px
  tool-stripe-width: 40px
components:
  button-primary: { background: '{colors.primary-strong}', foreground: '{colors.on-primary}', border: '{colors.primary-strong}', radius: '{rounded.md}', focus: '{colors.focus-ring}' }
  button-secondary: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.control-border}', radius: '{rounded.md}', focus: '{colors.focus-ring}' }
  text-field: { background: '{colors.background}', foreground: '{colors.foreground}', border: '{colors.control-border}', radius: '{rounded.md}', focus: '{colors.focus-ring}', error: '{colors.error}' }
  menu-popover: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}' }
  sheet-dialog: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.xl}' }
  toast: { background: '{colors.foreground}', foreground: '{colors.background}', radius: '{rounded.md}' }
  skeleton: { background: '{colors.surface-active}', radius: '{rounded.md}' }
  media-controls: { background: '{colors.foreground}', foreground: '{colors.background}', focus: '{colors.focus-ring}', radius: '{rounded.md}' }
  app-sidebar: { background: '{colors.surface}', foreground: '{colors.foreground}', border: '{colors.border}', width: '{spacing.sidebar-width}' }
  top-bar: { background: '{colors.background}', foreground: '{colors.foreground}', border: '{colors.border}', height: 40px }
  project-card: { background: '{colors.background}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.md}' }
  resource-row: { background: '{colors.background}', hover: '{colors.surface-hover}', border: '{colors.border}', height: 40px }
  resource-card: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}', selected: '{colors.selection}' }
  folder-card: { background: '{colors.surface}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}' }
  canvas-toolbar: { background: '{colors.surface-contextual}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.md}', backdrop-filter: 'blur(10px)' }
  add-menu: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}' }
  group-frame: { background: '{colors.surface-active}', foreground: '{colors.foreground}', border: '{colors.border-strong}', radius: '{rounded.lg}' }
  semantic-relation: { stroke: '{colors.relation}', label-background: '{colors.surface-raised}', label-foreground: '{colors.foreground}' }
  relation-editor: { background: '{colors.surface-contextual-strong}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.md}', backdrop-filter: 'blur(10px)' }
  context-panel: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', width: '{spacing.panel-width}' }
  ai-guidance-card: { background: '{colors.surface-contextual-strong}', foreground: '{colors.foreground}', accent: '{colors.ai}', radius: '{rounded.md}', backdrop-filter: 'blur(10px)' }
  save-status: { foreground: '{colors.foreground-secondary}', error: '{colors.error}' }
  upload-batch-tray: { background: '{colors.surface-contextual}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.md}', backdrop-filter: 'blur(10px)' }
  share-wizard: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.xl}' }
  comment-marker: { background: '{colors.comment}', foreground: '{colors.on-comment}', radius: '{rounded.full}' }
  comment-composer: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}' }
  state-message: { background: '{colors.surface}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.lg}' }
  confirm-dialog: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.xl}' }
  theme-control: { background: '{colors.surface}', foreground: '{colors.foreground}', border: '{colors.border}', radius: '{rounded.md}' }
  semantic-view: { background: '{colors.surface-raised}', foreground: '{colors.foreground}', border: '{colors.control-border}', selected: '{colors.selection}', radius: '{rounded.lg}' }
  window-header: { background: '{colors.surface}', foreground: '{colors.foreground}', border: '{colors.border}', height: 40px }
  tool-window-stripe: { background: '{colors.surface}', foreground: '{colors.foreground-secondary}', border: '{colors.border}', width: '{spacing.tool-stripe-width}' }
  glass-shell: { background: '{colors.surface-contextual}', foreground: '{colors.foreground}', border: '{colors.border}', backdrop-filter: 'blur(20px) saturate(1.15)' }
---

# Theke — Design Spine

> Este archivo es el contrato visual para implementación y futuros mocks. Si un mock, la interfaz actual o un artefacto de exploración entra en conflicto, este spine gana. `.working/color-themes-1.html` fue descartado explícitamente y no es referencia final.

Mockups de referencia aprobados: [Canvas de autoría](mockups/key-canvas-authoring.html), [publicación](mockups/key-share-wizard.html) y [comentario móvil](mockups/key-shared-mobile-comment.html). Ilustran el tema oscuro; los tokens y reglas de este documento siguen siendo normativos para ambos temas.

## Brand & Style

Theke debe sentirse como una herramienta profesional de estudio: serena, enfocada, exploratoria y confiable. El conocimiento ocupa el primer plano; el cromado se retira. La interfaz no intenta impresionar ni simular inteligencia: presenta estructura, procedencia y acciones con claridad para que la persona siga pensando por sí misma.

La postura visual debe ser reconociblemente cercana a IntelliJ IDEA 2026 en tema oscuro: header integrado, franjas estrechas de herramientas, paneles acoplados, área central dominante, jerarquía por bloques tonales, controles compactos y revelado progresivo. La similitud abarca composición, densidad y ritmo visual; Theke conserva logotipo, iconografía, contenido y vocabulario propios. La paleta Notion permanece como antecedente para colores semánticos de contenido, pero el shell oscuro adopta neutros fríos próximos a JetBrains Islands Dark.

Evitar saturación, tono infantil, rigidez corporativa y “magia” visual. No hay gradientes de marca ni animaciones celebratorias. El material translúcido tipo macOS/ChatGPT se limita al shell, barras flotantes y capas superpuestas; nunca convierte Recursos o contenido en vidrio decorativo. Los controles avanzados aparecen en contexto y desaparecen cuando dejan de ser útiles.

## Visual Provenance

- **Referencia principal:** IntelliJ IDEA 2026 en tema oscuro para el header, editor central, tool window stripes, paneles acoplados, densidad y separación tonal. Referencias oficiales: `https://www.jetbrains.com/help/idea/new-ui.html`, `https://www.jetbrains.com/help/idea/guided-tour-around-the-user-interface.html` y `https://www.jetbrains.com/help/idea/user-interface-themes.html`.
- **Material:** macOS y las aplicaciones de escritorio ChatGPT/Codex inspiran translucidez, blur y sensación de ventana nativa. Referencia de Codex: `https://openai.com/index/introducing-the-codex-app/`.
- **Referencias secundarias:** Miro/Figma para el lienzo espacial, Notion para colores semánticos de contenido y Google Docs para comentarios.
- **Límite de identidad:** Theke conserva marca, iconos, vocabulario y contenido propios; no copia recursos propietarios ni atajos de JetBrains u OpenAI.
- **Descartado:** `.working/color-themes-1.html` y sus cuatro paletas no son referencia final.

## Colors

### Superficies y texto

- `{colors.background}` / `{colors.background-dark}` es el plano de páginas y Canvas.
- `{colors.surface}` / `{colors.surface-dark}` separa navegación, paneles secundarios y estados suaves.
- `{colors.surface-raised}` / `{colors.surface-raised-dark}` sostiene tarjetas, menús, paneles flotantes y diálogos.
- `{colors.surface-contextual}` y `{colors.surface-contextual-strong}` —con sus pares oscuros— sostienen shell, controles temporales o capas flotantes. Son translúcidos, pero el contenido canónico bajo ellos no debe competir con su texto.
- `{colors.foreground}` / `{colors.foreground-dark}` se usa para el texto principal. El texto secundario y los estados persistentes usan `{colors.foreground-secondary}` / `{colors.foreground-secondary-dark}`: valores opacos con contraste mínimo 4.5:1. Los tokens de borde nunca se usan como texto.
- `{colors.border}` separa a baja jerarquía; `{colors.border-strong}` se reserva para foco estructural.
- `{colors.control-border}` / `{colors.control-border-dark}` delimita inputs y controles interactivos con contraste mínimo 3:1.

### Acción y semántica

- `{colors.primary}` es el azul Notion para foco e indicadores gráficos. Enlaces de texto usan `{colors.primary-text}` y botones con texto blanco usan `{colors.primary-strong}` para contraste AA.
- `{colors.relation}` identifica Relaciones semánticas; líneas decorativas permanecen neutrales.
- `{colors.ai}` identifica procedencia o guía de IA. Nunca significa “correcto” ni domina una superficie.
- `{colors.comment}` identifica marcadores y modo Comentar. Usa texto `{colors.on-comment}`; número o icono siempre acompaña el color. La combinación debe conservar contraste AA en ambos temas.
- `{colors.success}`, `{colors.warning}` y `{colors.error}` expresan estado en contexto.
- `{colors.warning}` se usa solo en iconos, bordes o texto grande con contraste verificado; para texto normal se acompaña de `{colors.foreground}` y nunca aparece solo sobre blanco.
- Los tokens `resource-*` aparecen en iconos o franjas pequeñas; título e icono mantienen la distinción sin color. Si `{colors.resource-note}` se usa como fondo, su texto usa `{colors.on-resource-note}`.

### Modo y contraste

El tema sigue el sistema por defecto. La persona puede fijar claro u oscuro y la preferencia se guarda por dispositivo. Los pares `*-dark` son decisiones explícitas, no inversiones automáticas.

Los componentes referencian tokens sin sufijo en modo claro. En modo oscuro, el proveedor sustituye cada token por su par `-dark` del mismo nombre semántico; nunca mezcla valores de ambos temas.

Objetivos: 4.5:1 para texto normal y 3:1 para texto grande, iconos funcionales, bordes de foco y controles. `{colors.primary-strong}` + `{colors.on-primary}` se usa en acciones con texto normal; en oscuro, `{colors.primary-strong-dark}` + `{colors.on-primary-dark}`. Un futuro contraste alto debe poder sustituir superficies y bordes sin cambiar semántica ni jerarquía.

### Transparencia semántica

- **Opaco = estable o comprometido:** Recursos, contenido editable, Biblioteca, paneles acoplados, diálogos de confirmación y pasos de publicación usan superficies opacas.
- **Translúcido = shell o contextual:** header, franjas periféricas, `Canvas Toolbar`, `Relation Editor`, selección por lote, vista previa de sugerencias de IA y halos de comentario pueden usar material oscuro translúcido con blur.
- **Transparente = agrupación o alcance:** `Group Frame`, selección rectangular y zonas de destino usan relleno muy ligero y borde explícito; no parecen un Recurso ni una Carpeta.
- Ningún párrafo, input o acción crítica descansa directamente sobre contenido variable. El shell puede bajar hasta 78 % de opacidad con `backdrop-filter: blur(20px) saturate(1.15)`; popovers con texto largo usan al menos 91 %, y campos internos siempre son opacos.
- Si `backdrop-filter` no está disponible, si la persona solicita mayor contraste o si el fondo compromete WCAG, la superficie pasa a `{colors.surface-raised}` sin cambiar tamaño ni jerarquía. La transparencia nunca comunica por sí sola estado, disponibilidad o procedencia.

## Typography

La fuente deseada es **JetBrains Sans**, distinta de JetBrains Mono. Antes de descargarla, empaquetarla o distribuirla, Producto y el equipo legal deben confirmar la licencia y la fuente oficial. Mientras ese gate permanezca abierto —o si la licencia no permite distribución— se usa **Inter** si ya está disponible y, en su defecto, `system-ui`. No descargar fuentes en tiempo de ejecución desde terceros.

La jerarquía es estable con cualquier fallback: `{typography.display}` para bienvenida vacía o título excepcional; `{typography.heading-lg}` para página; `{typography.heading-md}` para sección, panel y diálogo; `{typography.body}` para contenido; `{typography.body-strong}` para títulos y acciones; `{typography.label}` para controles; `{typography.caption}` para metadatos, procedencia y estado.

No usar JetBrains Mono como sustituto de marca. La monoespaciada queda para datos que lo requieran. Evitar mayúsculas sostenidas salvo rótulos muy cortos.

## Layout & Spacing

Escala base de 4 px. La densidad predeterminada se acerca al modo compacto de una herramienta de escritorio: controles frecuentes usan `{spacing.1}`–`{spacing.3}`, tarjetas y paneles `{spacing.3}`–`{spacing.5}`, y solo regiones de contenido usan `{spacing.6}`–`{spacing.10}`.

En escritorio, la aplicación replica la anatomía general de una IDE moderna: `Window Header` de 40 px; `Tool Window Stripe` de 40 px en los bordes; panel de proyecto/Biblioteca acoplado; Canvas central; e Inspector acoplado a la derecha. Las franjas abren, cierran o enfocan paneles y siempre ofrecen tooltip. El centro conserva la mayor superficie.

Inicio, Proyectos y Biblioteca usan `{spacing.page-gutter}` en escritorio y 16 px en viewport estrecho. Listas y grillas comparten bordes de alineación. La grilla de puntos del Canvas es una guía espacial de bajo contraste, no una restricción rígida.

## Elevation & Depth

La jerarquía nace de tono, borde y posición, como en JetBrains Islands: paneles vecinos se distinguen por superficies frías y hairlines, no por tarjetas. Superficies integradas, Recursos y paneles acoplados no llevan sombra. Menús, `Relation Editor` y `Upload Batch Tray` usan como máximo `0 8px 24px #00000038`; `{colors.overlay}` queda solo para `Confirm Dialog` y `Share Wizard` modal.

Hover cambia tono o borde sin elevar ni mover geometría. El blur solo sirve para separar una capa contextual translúcida del Canvas y nunca se aplica a nodos, paneles acoplados o contenido estable.

## Shapes

`{rounded.sm}` para controles pequeños, `{rounded.md}` para botones e inputs, `{rounded.lg}` para tarjetas y paneles, `{rounded.xl}` para diálogos. `{rounded.full}` solo para marcadores numerados, avatares e indicadores compactos.

Recursos son tarjetas; Anotaciones no adoptan tarjeta. `Group Frame` es marco tonal con etiqueta exterior. Carpetas son colecciones compactas. Relaciones semánticas usan línea continua y etiqueta; trazos decorativos son neutrales o discontinuos.

## Components

Los controles base usan las entradas homónimas de `components`: `Button Primary`, `Button Secondary`, `Text Field`, `Menu/Popover`, `Sheet/Dialog`, `Toast`, `Skeleton` y `Media Controls`. Conservan foco visible y combinan icono, texto o forma con el color; error y selección nunca dependen solo del tono.

| Componente | Especificación visual |
|---|---|
| **Button Primary / Secondary** | Altura mínima 36 px y objetivo efectivo de 44 × 44 px cuando no existe separación equivalente. Estados de hover, activo y deshabilitado, y foco visible, sin alterar la geometría. |
| **Text Field** | Etiqueta persistente, ayuda y error asociados; borde fuerte y anillo al enfocar. Placeholder nunca sustituye la etiqueta. |
| **Menu / Popover** | Superficie compacta, selección tonal con indicador, borde y sombra mínima. El elemento enfocado permanece visible. |
| **Sheet / Dialog** | Superficie elevada sobre overlay; título y descripción visibles. La hoja móvil conserva esquinas superiores `{rounded.xl}`. |
| **Toast / Skeleton** | Toast de alto contraste para confirmación breve; Skeleton reproduce la forma final sin animación obligatoria. |
| **Media Controls** | Controles de alto contraste, foco visible, estados de reproducción y pausa, volumen, progreso y alternativas textuales. |
| **Window Header** | 40 px y continuidad con el marco oscuro. Aloja marca/proyecto, breadcrumb breve y acciones globales; evita una barra web convencional. |
| **Tool Window Stripe** | Franja vertical de 40 px con iconos propios de Theke, estado activo tonal, tooltip y nombre accesible. Abre Biblioteca, Vista semántica, IA o Comentarios como paneles acoplados. |
| **App Sidebar** | Panel de proyecto/Biblioteca de 224 px junto a su `Tool Window Stripe`. Árbol compacto, encabezado de herramienta y borde divisorio; puede colapsar completamente. Explorar/Comunidad no aparece en MVP. |
| **Top Bar** | 40 px integrada bajo el header cuando el Canvas requiere breadcrumb, `Save Status`, pestaña del Diagrama y acciones contextuales. Puede fusionarse con `Window Header` en ventanas bajas. |
| **Project Card** | Fila o bloque plano con borde fino, título fuerte y metadatos en caption. Hover tonal; foco visible. Evita una cuadrícula de tarjetas decorativas. |
| **Resource Row** | Mínimo 40 px, icono semántico, nombre, tipo y última edición. Acciones disponibles con foco y hover. |
| **Resource Card** | Compacta, reconocible por tipo, título y hasta dos líneas de metadatos. Selección con `{colors.selection}` y anillo. |
| **Folder Card** | Colección compacta con icono, nombre y conteo. No comparte apariencia con `Group Frame`. |
| **Canvas Toolbar** | Grupo de acciones compacto tipo toolbar de IDE para zoom, encuadre y Canvas. Material oscuro translúcido estilo macOS/Codex, borde fino y sombra mínima; fallback opaco. |
| **Add Menu** | Desde el botón visible Añadir; categorías Biblioteca, Subir, Nota, Carpeta, Grupo y Anotaciones. |
| **Group Frame** | Marco de alcance con relleno transparente muy ligero, borde redimensionable, etiqueta fuera del contenido y handles fuera de `overflow-hidden`. Sin `transition-all`. |
| **Semantic Relation** | Línea continua; flecha solo si es dirigida; etiqueta sobre cápsula neutra. Color `{colors.relation}`. |
| **Relation Editor** | Popover contextual translúcido cercano a la conexión con dirección, tipo, etiqueta, Guardar y Pedir sugerencia; campos internos opacos. |
| **Context Panel** | Tool window derecho de 304 px con encabezado compacto, pestañas o selector de contexto y divisores horizontales. Para Recurso separa “Contenido canónico” de “En este Diagrama”. |
| **AI Guidance Card** | Vista previa contextual translúcida con acento lateral `{colors.ai}` y secciones Fundamento, Alcance y Carencias. Al aceptar o editar contenido, la superficie pasa a opaca. Nunca modal automático. |
| **Save Status** | Texto pequeño: Guardando…, Guardado o No se pudo guardar. Sin badge ni check dominante. |
| **Upload Batch Tray** | Barra contextual translúcida: Distribuir, Crear grupo visual y Deshacer carga. Su transparencia refuerza que la selección es temporal; no parece Grupo permanente. |
| **Share Wizard** | Tres pasos textuales: Vista previa, Contenido expuesto y Acceso. |
| **Comment Marker** | Círculo numerado `{colors.comment}`; seleccionado refuerza borde. Siempre con nombre accesible. |
| **Comment Composer** | En escritorio dentro de `Context Panel`; en móvil, hoja inferior. Campo y acción Publicar. |
| **State Message** | Dentro de la superficie afectada: título, explicación accionable y, como máximo, una acción principal. |
| **Confirm Dialog** | Solo para reemplazar/eliminar, revocar/republicar o acciones sensibles; muestra impacto concreto. |
| **Theme Control** | Sistema, Claro y Oscuro con texto e icono. Contraste alto queda preparado, aún no expuesto. |
| **Semantic View** | Lista o árbol en superficie elevada, selección sincronizada y jerarquía expresada mediante sangría, icono y texto; nunca depende solo de posición o color. |

## Do's and Don'ts

| Do | Don't |
|---|---|
| Dejar que Recursos y Relaciones dominen el Canvas. | Rodear todo de paneles, badges y colores de marca. |
| Usar color para semántica, estado y contenido. | Usar azul como cromado dominante. |
| Usar transparencia para contexto temporal, selección y alcance. | Aplicarla a Recursos, texto largo, formularios o paneles estables. |
| Hacer reconocible el patrón header + tool stripes + tool windows + área central. | Copiar logotipo, iconos, nombres, atajos o recursos propietarios de JetBrains/OpenAI. |
| Mantener IA discreta, identificable y consultable. | Hacer brillar o pulsar sugerencias. |
| Distinguir Recurso, Carpeta, Grupo, Anotación y comentario por forma y etiqueta. | Depender solo de color. |
| Mostrar acciones avanzadas al seleccionar o pedirlas. | Ocultar la única vía en hover o clic derecho. |
| Transiciones específicas de 120–180 ms con reducción de movimiento. | `transition-all` o animar posiciones del Canvas. |
| Etiqueta de `Group Frame` fuera del contenido. | Handles dentro de `overflow-hidden`. |
| Usar este spine para nuevos componentes. | Copiar estilos del prototipo si contradicen tokens. |
