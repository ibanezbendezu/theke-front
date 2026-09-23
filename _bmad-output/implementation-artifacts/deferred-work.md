- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-acceder-al-espacio-privado.md`
  summary: Evitar que breadcrumbs con percent-encoding malformado rompan el shell.
  evidence: `decodeURIComponent` puede lanzar; el comportamiento ya existía antes de la historia 1.1.
- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-acceder-al-espacio-privado.md`
  summary: Endurecer `onConnectEnd` cuando el target no sea un Element.
  evidence: El cast permite `classList` sobre targets incompatibles; el comportamiento es preexistente.
- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-acceder-al-espacio-privado.md`
  summary: Endurecer conexiones táctiles sin un primer touch disponible.
  evidence: El acceso a `touches[0]` puede producir coordenadas indefinidas; el comportamiento es preexistente.
- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-acceder-al-espacio-privado.md`
  summary: Limpiar `connectingNodeId` al cancelar el menú de conexión.
  evidence: Cerrar el menú sin crear un nodo conserva la referencia; el comportamiento es preexistente.
