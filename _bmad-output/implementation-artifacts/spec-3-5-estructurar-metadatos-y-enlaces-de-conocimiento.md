---
title: 'Estructurar metadatos y enlaces de conocimiento'
type: 'feature'
created: '2026-09-25'
status: 'done'
---

## Intent

Dar a Recursos y notas una estructura navegable al estilo de Obsidian antes de introducir la IA, conservando las identidades canónicas de Theke y la distinción entre una mención y una Relación semántica.

## Criterios de aceptación

1. Todos los Recursos admiten alias, etiquetas y hasta 30 propiedades de tipo consistente por nombre dentro de la Cuenta.
2. Biblioteca busca por título, alias, descripción y contenido de nota; filtra por etiqueta.
3. Las notas indexan enlaces wiki por versión, muestran referencias entrantes y salientes junto a un grafo local, y distinguen destinos resueltos, ambiguos y sin resolver.
4. El editor inserta enlaces por UUID estable. Las referencias resueltas conservan el destino cuando se renombra o aparece otro alias igual.
5. La evidencia de Relaciones conserva versión y ubicación exacta de texto o página; se validan identidad y límites al guardar.
6. Las menciones no crean ni confirman Relaciones semánticas.

## Tareas

- [x] Migración de metadatos, definiciones, menciones y ubicación de evidencia.
- [x] Servicio y contrato API con control de Cuenta, validación y revisión concurrente.
- [x] Biblioteca para editar propiedades, insertar enlaces y explorar referencias.
- [x] Editor de Relaciones con procedencia de citas.
- [x] Pruebas focalizadas con PostgreSQL; lint, build y sincronización OpenAPI.

## Alcance y continuidad

Esta historia construye un grafo de referencias de notas, separado del grafo semántico de Relaciones. La IA de Epic 4 podrá usar ambas capas como contexto, siempre con consentimiento y alcance explícitos. Importación o exportación de bóvedas Obsidian, backlinks históricos de todas las versiones y una vista de grafo global quedan fuera de esta entrega.

## Verificación

- API: lint, build, contrato y pruebas focalizadas con PostgreSQL.
- Web: lint, build y contrato generado.

## Referencias

- `_bmad-output/planning-artifacts/epics.md`, Story 3.5.
- [Propiedades de Obsidian](https://obsidian.md/help/properties), [enlaces internos](https://obsidian.md/help/links) y [backlinks](https://obsidian.md/help/link-notes).
