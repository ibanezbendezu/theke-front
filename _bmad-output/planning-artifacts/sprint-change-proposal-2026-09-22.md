# Propuesta de cambio de sprint — ejecución local de la historia 1.1

Fecha: 2026-09-22  
Alcance: menor  
Historia afectada: 1.1 — Acceder al espacio privado
Estado: aprobado por el usuario el 2026-09-22

## 1. Resumen del problema

La historia 1.1 quedó bloqueada por dos gates externos que no aportan valor al flujo actual de desarrollo individual: publicar `@theke/contracts` en GitHub Packages y ejecutar un smoke test en Vercel/Railway. El objetivo inmediato es ejecutar `theke-web` y `theke-api` localmente, usar Clerk real y conectar el backend a PostgreSQL administrado por Neon, sin instalar PostgreSQL, Docker ni Supabase.

## 2. Análisis de impacto

- **Epic 1:** conserva su alcance funcional; solo cambia el gate de la historia 1.1.
- **Historias futuras:** sin cambios ni reordenamiento.
- **PRD y UX:** sin conflictos ni modificaciones.
- **Arquitectura:** GitHub Packages y despliegues independientes permanecen como objetivo previo a un entorno compartido o productivo; dejan de bloquear el desarrollo local.
- **Código funcional:** sin cambios previstos.
- **Configuración y documentación:** ajustar ejemplos y pasos para Clerk + Neon, manteniendo secretos fuera de Git.

## 3. Enfoque recomendado

Aplicar un ajuste directo de esfuerzo y riesgo bajos. La API seguirá siendo la única conexión a PostgreSQL, OpenAPI seguirá siendo la fuente contractual y Orval continuará generando el cliente web. En esta etapa, la coherencia se comprobará localmente mediante versión y digest idénticos, sin publicar el paquete.

No se recomienda rollback ni redefinir el MVP. Supabase queda explícitamente fuera de alcance.

## 4. Cambios aprobados

### Historia 1.1

- Sustituir la publicación obligatoria en GitHub Packages por verificación local de versión, contenido y digest del OpenAPI entre ambos repositorios.
- Sustituir el smoke de Vercel/Railway por un smoke local de `theke-web` + `theke-api` usando Clerk real y PostgreSQL en Neon.
- Registrar GitHub Packages y despliegue externo como trabajo diferido previo al primer entorno compartido, no como gate de esta historia.

### Configuración y documentación

- Usar placeholders seguros en los archivos `.env`.
- Documentar `DATABASE_URL` de Neon con TLS en `theke-api`.
- Documentar la ejecución de `drizzle/0001_account_identity.sql` mediante Neon SQL Editor.
- No añadir Docker, Supabase, dependencias ni scripts de despliegue.

## 5. Handoff de implementación

Clasificación: **menor**.  
Responsable: Developer agent.

Secuencia:

1. Actualizar la historia 1.1 y su registro de cambios.
2. Ajustar `.env` y README de ambos repositorios solo donde resulte necesario.
3. Ejecutar lint, build, pruebas y validación contractual.
4. Con credenciales configuradas localmente por el usuario, ejecutar el smoke Clerk + Neon sin registrar secretos.

Éxito significa que ambas aplicaciones arrancan localmente, `/v1/me` aprovisiona una sola terna `User/Account/Membership` en Neon, las rutas privadas se protegen y el contrato local no presenta drift.
