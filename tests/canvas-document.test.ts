import { describe, expect, it } from 'vitest';
import { migrateCanvasDocument } from '../src/data/canvasDocument';

describe('migración de documentos del canvas', () => {
  it('convierte el esquema anterior de forma determinista', () => {
    const old = { schemaVersion: 0, nodes: [], edges: [] };
    expect(migrateCanvasDocument(old)).toEqual({ schemaVersion: 1, nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } });
    expect(old).toEqual({ schemaVersion: 0, nodes: [], edges: [] });
  });
  it('rechaza documentos incompletos sin migrarlos parcialmente', () => {
    expect(() => migrateCanvasDocument({ schemaVersion: 0, nodes: [] })).toThrow('incompleto');
    expect(() => migrateCanvasDocument({ schemaVersion: 2, nodes: [], edges: [] })).toThrow('compatible');
  });
});
