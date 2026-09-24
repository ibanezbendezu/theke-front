---
title: 'Buscar y filtrar la biblioteca'
type: 'feature'
created: '2026-09-24'
status: 'done'
---

## Intent

Encontrar Recursos por título, tipo, Proyecto y Carpeta sin perder el contexto al paginar o abrir un detalle.

## Constraints

- La búsqueda y todos los filtros se combinan dentro de la Cuenta autenticada.
- La paginación conserva orden estable por fecha e identificador.
- Los filtros viven en la URL para sobrevivir a navegación y regreso.
- Los resultados anteriores permanecen visibles durante una actualización.
- Biblioteca vacía y consulta sin coincidencias son estados diferentes.

## Tasks

- [x] Búsqueda parcial por título y filtros combinables en la API.
- [x] Filtros por tipo, Proyecto y Carpeta con validación.
- [x] Cursor estable que conserva la consulta activa.
- [x] Controles accesibles, filtros retirables y contador de resultados.
- [x] Estados diferenciados de carga, actualización, error y cero coincidencias.
- [x] Contrato y cliente sincronizados con pruebas focalizadas.
