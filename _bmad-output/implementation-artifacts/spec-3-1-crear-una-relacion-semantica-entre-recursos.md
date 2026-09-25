---
title: 'Crear una relación semántica entre recursos'
type: 'feature'
created: '2026-09-25'
status: 'done'
---

## Intent

Conectar dos Recursos de la misma Cuenta mediante una Relación canónica dirigida o no dirigida y mostrar una representación independiente en el Diagrama actual.

## Criterios de aceptación

1. La API valida Cuenta, extremos, dirección y tipo antes de crear la Relación y su uso local.
2. Los tipos comunes tienen claves estables; un tipo personalizado pertenece a la Cuenta y nace visible solo en su Proyecto de origen.
3. Una relación equivalente no se duplica y la interfaz permite mostrar la existente.
4. Los handles y un formulario accesible ofrecen el mismo flujo. Carpetas, Grupos y Anotaciones reciben una explicación y no crean Relaciones.
5. La Relación y la arista del Diagrama conservan IDs distintos y sobreviven a recarga.

## Tareas

- [x] Añadir tablas, migración, servicio y contrato de Relaciones.
- [x] Conectar el editor y la vista semántica con el flujo canónico.
- [x] Verificar errores, concurrencia, build, lint y smoke focalizado en navegador.

## Verificación

- API: lint, build, contrato y prueba focalizada contra PostgreSQL.
- Web: lint, build, contrato y prueba de migración de documentos.
- Navegador: creación dirigida común y personalizada, detección de duplicado, acceso desde Vista semántica y persistencia tras recarga.

## Referencias

- `_bmad-output/planning-artifacts/epics.md`, Story 3.1.
- `_bmad-output/planning-artifacts/architecture/architecture-Theke-2026-09-20/ARCHITECTURE-SPINE.md`, AD-3.
