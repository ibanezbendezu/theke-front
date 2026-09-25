---
title: 'Explorar relaciones en el Canvas y la vista semántica'
type: 'feature'
created: '2026-09-25'
status: 'done'
---

## Intent

Reconocer, seleccionar y recorrer Relaciones por lienzo y estructura accesible.

## Criterios de aceptación

1. Línea y etiqueta muestran dirección y tipo o etiqueta canónica, con estados visibles de foco, selección y hover.
2. El panel contextual muestra explicación, evidencia y procedencia, y navega a ambos Recursos.
3. La zona interactiva permite seleccionar líneas cercanas sin bloquear controles de nodos.
4. La Vista semántica lista conexiones entrantes y salientes y centra la Relación seleccionada.
5. El acceso por teclado anuncia extremos, dirección, tipo y estado de evidencia, y permite abrir el editor.

## Tareas

- [x] Mejorar selección y foco de aristas en el Canvas.
- [x] Añadir inspector de Relaciones y navegación estructurada.
- [x] Verificar lint, build y smoke focalizado en navegador.

## Verificación

- Web: lint y build.
- Navegador: recorrido de Relaciones salientes y entrantes, foco en el Canvas, lectura de evidencia/procedencia en panel y navegación al Recurso destino.

## Referencias

- `_bmad-output/planning-artifacts/epics.md`, Story 3.3.
