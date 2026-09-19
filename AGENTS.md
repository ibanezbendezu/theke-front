<!-- bmad:context -->
<!-- Verified 2026-09-19 against 74c154fa3cd9cdf405a017a49c3722d853c8f322. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## Theke

Theke es un espacio de trabajo visual web para crear diagramas interactivos y conectar recursos como texto, imágenes, video, audio, documentos y enlaces. La implementación actual ofrece un lienzo de grafo con React, TypeScript, React Flow y Zustand. La planificación del producto vive en `_bmad-output/planning-artifacts/`.

## Where things are

- Rutas y superficies principales: `src/app/router.tsx`
- Orquestación, menús y eventos del lienzo: `src/features/canvas/CanvasEditor.tsx`
- Estado estructural y mutaciones del grafo: `src/store/useCanvasStore.ts`
- Renderizadores de nodos: `src/features/canvas/nodes/`
- Datos demostrativos, no persistencia real: `src/mock/initialState.ts`

## Running and verifying

- Antes de entregar cambios de código, ejecuta lint y build. Actualmente no existe una suite automatizada de pruebas ni CI; no afirmes que los tests pasaron.
- No ignores errores previos de lint: sepáralos claramente de cualquier regresión introducida por el cambio.

## Conventions that differ from defaults

- Canaliza las mutaciones estructurales de nodos y aristas mediante `src/store/useCanvasStore.ts`; conserva en los componentes solamente el estado efímero de interacción.
- Al agregar un tipo de nodo, mantén el mismo discriminador en su tipo `Node`, el registro `nodeTypes` y la creación de datos en `CanvasEditor.tsx`.
- Usa `container`, no `group`, como discriminador interno de `GroupNode`.
- Marca inputs, botones y otros controles dentro del canvas con `nodrag` y, cuando corresponda, `nopan`.
- Al reparentar un nodo, obtén su posición absoluta actual, conviértela a coordenadas relativas al contenedor, usa `expandParent` y mantén el hijo después del padre en el arreglo de nodos.
- No agregues `transition-all` a nodos con `NodeResizer`; usa transiciones específicas como `transition-colors` o `transition-opacity`.
- Mantén la etiqueta de `GroupNode` fuera del área de contenido mediante su posición `absolute top-full`; evita que los hijos puedan cubrirla.

## Known pitfalls

- Mantén los handles de `GroupNode` fuera del panel interior con `overflow-hidden`; dentro de ese panel quedan recortados.
- React Flow depende del orden padre-hijo del arreglo de nodos: omitir el reordenamiento al agrupar rompe el arrastre conjunto.

<!-- /bmad:context -->
