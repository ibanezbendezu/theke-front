---
title: 'Guardar enlaces web como recursos'
type: 'feature'
created: '2026-09-24'
status: 'done'
---

## Intent

Guardar una URL como Recurso reutilizable inmediatamente y completar sus metadatos en segundo plano sin comprometer la red interna ni perder ediciones manuales.

## Constraints

- Solo se aceptan URL HTTP o HTTPS sin credenciales.
- Cada destino y redirección se valida contra direcciones privadas antes de solicitarlo.
- La descarga limita tiempo, tamaño, contenido y redirecciones; el HTML nunca se ejecuta.
- Un fallo conserva la URL y permite editar o reintentar.
- Los metadatos no sobrescriben una edición manual posterior al inicio del trabajo.

## Tasks

- [x] Persistencia y migración de enlaces y estado de metadatos.
- [x] Creación inmediata y trabajo asíncrono mediante la cola existente.
- [x] Obtención limitada de título, descripción e imagen con protección SSRF.
- [x] Edición manual y reintento desde la Biblioteca.
- [x] Contrato OpenAPI y cliente sincronizados.
- [x] Pruebas focalizadas de validación, SSRF, fallos y UI.
