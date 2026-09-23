---
title: 'Crear y editar notas canónicas'
type: 'feature'
created: '2026-09-23'
status: 'done'
---

## Intent

Crear notas reutilizables en la Biblioteca como Recursos canónicos de Cuenta, conservando versiones inmutables del contenido.

## Constraints

- La cuenta y el autor se derivan de la sesión.
- Título obligatorio de 1 a 160 caracteres; descripción opcional; contenido textual.
- Cambiar contenido crea una versión; guardar el mismo contenido no crea duplicados.
- Toda lectura y escritura se restringe por `accountId` y los recursos ajenos responden como no encontrados.
- La migración es aditiva y no elimina estructuras existentes.

## Tasks

- [x] Esquema y migración de Recursos y versiones.
- [x] API autenticada para listar, crear, abrir y editar notas.
- [x] Contrato OpenAPI y cliente sincronizados.
- [x] Biblioteca real con editor, estado vacío y recuperación de errores.
- [x] Pruebas focalizadas de versionado, aislamiento e interfaz.
