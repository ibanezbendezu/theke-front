---
title: 'Crear y administrar proyectos'
type: 'feature'
created: '2026-09-23'
status: 'done'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-Theke-2026-09-20/ARCHITECTURE-SPINE.md'
---

## Intent

Permitir que una persona cree, abra, renombre, archive y restaure proyectos dentro de su cuenta, con aislamiento estricto entre cuentas y navegación por cursor estable.

## Constraints

- La API deriva siempre `accountId` de la sesión; el navegador nunca lo envía.
- El nombre se recorta y admite entre 1 y 120 caracteres.
- Archivar conserva identidad y contenido; restaurar reutiliza el mismo proyecto.
- Los proyectos ajenos responden como no encontrados.
- La lista separa activos y archivados, con carga, vacío y error recuperable.

## Tasks

- [x] Esquema y migración PostgreSQL para `projects`.
- [x] API autenticada de listado, detalle, creación, renombrado, archivo y restauración.
- [x] Interfaz de lista, estado vacío, validación, vistas activa/archivada y paginación.
- [x] Vista individual de proyecto.
- [x] Contrato OpenAPI generado y sincronizado entre repositorios.
- [x] Pruebas unitarias focalizadas de dominio y UI.
