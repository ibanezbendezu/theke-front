---
title: 'Consultar recursos según su tipo'
type: 'feature'
created: '2026-09-24'
status: 'done'
---

## Intent

Consultar notas y archivos canónicos desde una Biblioteca unificada, con vista previa o reproducción cuando corresponda y acceso privado al original como alternativa permanente.

## Constraints

- Solo Recursos `ready` aparecen en la Biblioteca.
- Las URLs inline y de descarga son privadas, temporales y autorizadas por Cuenta.
- Audio y video no comienzan a cargar hasta la acción explícita del autor.
- Un fallo de vista previa conserva metadatos y descarga del original.
- Imágenes, audio y video permiten guardar información de accesibilidad faltante.

## Tasks

- [x] API paginada y aislada de listado y detalle de Recursos.
- [x] URLs GET firmadas para vista previa y descarga del objeto limpio.
- [x] Persistencia aditiva de información de accesibilidad.
- [x] Biblioteca unificada con iconos, tipo, estado y metadatos visibles.
- [x] Vista de imagen/PDF, reproducción bajo demanda y fallback genérico.
- [x] Contrato OpenAPI y cliente sincronizados.
- [x] Pruebas focalizadas de tipos, descarga, accesibilidad y aislamiento.
