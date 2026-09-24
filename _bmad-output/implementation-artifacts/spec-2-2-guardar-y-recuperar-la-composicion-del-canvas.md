---
title: 'Guardar y recuperar la composición del Canvas'
type: 'feature'
created: '2026-09-24'
status: 'done'
---

## Intent

Conservar automáticamente la composición del Diagrama y ofrecer recuperación explícita de cambios pendientes.

## Tasks

- [x] Guardar documento completo con versión de esquema, revisión esperada e idempotencia.
- [x] Mantener secuencia auditable de revisiones y rechazar sobrescrituras obsoletas.
- [x] Mostrar estados Guardando, Guardado, sin conexión y conflicto.
- [x] Conservar borrador local en IndexedDB y ofrecer restaurar o descartar al reabrir.
- [x] Migrar documentos antiguos soportados de forma determinista.
- [x] Verificar guardado, reintento y conflicto con PostgreSQL y migración de cliente.
