---
title: 'Cargar uno o varios archivos de forma segura'
type: 'feature'
created: '2026-09-23'
status: 'done'
---

## Intent

Incorporar archivos a la Biblioteca con progreso y resultado individual, manteniéndolos privados e inutilizables hasta superar validación y análisis antimalware.

## Constraints

- Hasta 20 archivos por lote, 250 MiB por archivo y 5 GiB reservados por Cuenta.
- URL PUT firmada y breve hacia una key de cuarentena única; `finalize` fija un snapshot distinto.
- ClamAV privado por INSTREAM, límites de 250 MiB, firmas actualizadas y fallo cerrado.
- Promoción a key limpia derivada del hash solamente después de validar tamaño, tipo y malware.
- Encolado pg-boss dentro de la misma transacción que confirma el Upload, con reintentos y DLQ.

## Tasks

- [x] Esquema y migración aditiva de Uploads y metadatos de archivos.
- [x] API idempotente, cuota, URLs firmadas, snapshot de cuarentena y cancelación.
- [x] Worker pg-boss con validación, hash, ClamAV, promoción y dead-letter queue.
- [x] MinIO y ClamAV locales gratuitos mediante Docker Compose.
- [x] Tray web con selección/arrastre, progreso, cancelación y fallos independientes.
- [x] Contrato OpenAPI y cliente sincronizados.
- [x] Pruebas focalizadas de idempotencia, aislamiento, archivo limpio y EICAR.
