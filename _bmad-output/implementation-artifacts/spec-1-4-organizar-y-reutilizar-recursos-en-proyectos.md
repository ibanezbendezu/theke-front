---
title: 'Organizar y reutilizar recursos en proyectos'
type: 'feature'
created: '2026-09-23'
status: 'done'
---

## Intent

Referenciar Recursos canónicos de la Biblioteca desde Proyectos y organizarlos en Carpetas sin copiar contenido ni perder versiones.

## Constraints

- `project_resources` referencia al Recurso original y evita duplicados por Proyecto.
- Carpetas pertenecen a un único Proyecto; moverlas o renombrarlas no cambia la Biblioteca.
- Mover varios Recursos a Carpeta o raíz es atómico.
- Archivar una Carpeta conserva sus referencias y permite restaurarla.
- Todas las operaciones derivan la Cuenta de la sesión y ofrecen controles utilizables con teclado.

## Tasks

- [x] Esquema y migración aditiva de Carpetas y referencias.
- [x] API autenticada de organización y movimientos atómicos.
- [x] Contrato OpenAPI y cliente sincronizados.
- [x] Vista de Proyecto con selector de Biblioteca y gestión de Carpetas.
- [x] Pruebas focalizadas de identidad, duplicados, aislamiento y accesibilidad.
