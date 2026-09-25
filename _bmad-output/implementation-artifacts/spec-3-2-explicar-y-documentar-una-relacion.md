---
title: 'Explicar y documentar una relación'
type: 'feature'
created: '2026-09-25'
status: 'done'
---

## Intent

Editar los datos canónicos de una Relación desde el Diagrama, con evidencia verificable y control de concurrencia.

## Criterios de aceptación

1. El editor muestra extremos, dirección, tipo, etiqueta, explicación, evidencia y procedencia, separados de la presentación local.
2. Los cambios canónicos conservan el ID, registran autor y fecha, y aparecen en todas las visualizaciones al volver a consultarlas.
3. La evidencia referencia Recursos de la misma Cuenta y puede guardar fragmento y nota.
4. Se puede señalar explícitamente que falta evidencia sin crear una cita falsa.
5. Un conflicto de revisión preserva el formulario local y ofrece recargar la versión remota.

## Tareas

- [x] Añadir esquema, migración y API de lectura/edición de Relaciones.
- [x] Añadir Relation Editor con selección de evidencia desde Biblioteca.
- [x] Verificar autorización, concurrencia, build, lint y flujo focalizado en navegador.

## Verificación

- API: prueba focalizada contra PostgreSQL con cita, rechazo entre Cuentas y conflicto de revisión; lint, build y contrato.
- Web: lint, build y contrato generado.
- Navegador: edición de etiqueta, explicación, procedencia, carencia de evidencia y cita de Biblioteca; persistencia tras recarga.

## Referencias

- `_bmad-output/planning-artifacts/epics.md`, Story 3.2.
- `_bmad-output/planning-artifacts/architecture/architecture-Theke-2026-09-20/ARCHITECTURE-SPINE.md`, AD-4 y AD-7.
