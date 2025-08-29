// src/db/sqlite.ts
import initSqlJs, { type Database } from "sql.js";


// 🔑 chave para persistência no IndexedDB
const IDB_KEY = "meu-db.sqlite";
let db: Database | null = null;

// Utilitário simples de IndexedDB (sem libs externas)
function idbGet(key: string): Promise<Uint8Array | null> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open("SQLJS_IDB", 1);
    open.onupgradeneeded = () => {
      open.result.createObjectStore("files");
    };
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as Uint8Array) ?? null);
      req.onerror = () => reject(req.error);
    };
  });
}

function idbSet(key: string, data: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open("SQLJS_IDB", 1);
    open.onupgradeneeded = () => {
      open.result.createObjectStore("files");
    };
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      const req = store.put(data, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    };
  });
}

export async function initDB(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    // usa CDN oficial do sql.js
    locateFile: (f) => `https://sql.js.org/dist/${f}`,
  });

  // tenta carregar dump do IndexedDB
  const saved = await idbGet(IDB_KEY);
  db = saved ? new SQL.Database(saved) : new SQL.Database();

  // === MIGRAÇÕES/SCHEMA ===
  // usamos PRAGMA user_version para controlar versões do schema
  const ver = db.exec("PRAGMA user_version;")[0]?.values?.[0]?.[0] as number | undefined;
  const version = Number.isFinite(ver) ? (ver as number) : 0;

  if (version < 1) {
    // cria tabela enderecos (se ainda não existir)
    db.run(`
      CREATE TABLE IF NOT EXISTS enderecos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cep TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        street TEXT NOT NULL,
        "number" TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_enderecos_cep ON enderecos (cep);
      PRAGMA user_version = 1;
    `);
    await saveToIndexedDB(); // persiste schema
  }

  return db!;
}

// Execução de comandos (INSERT/UPDATE/DELETE/DDL)
export function exec(sql: string, params: (string | number | null)[] = []): void {
  if (!db) throw new Error("DB não inicializado. Chame initDB() antes.");
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    while (stmt.step()) {
      // Para statements que retornam linhas, apenas itera (sem uso).
    }
  } finally {
    stmt.free();
  }
}

// Consulta que retorna array tipado
export function selectAll<T = any>(sql: string, params: (string | number | null)[] = []): T[] {
  if (!db) throw new Error("DB não inicializado. Chame initDB() antes.");
  const stmt = db.prepare(sql);
  const rows: T[] = [];
  try {
    stmt.bind(params);
    const cols = stmt.getColumnNames();
    while (stmt.step()) {
      const row: any = {};
      const values = stmt.getAsObject() as Record<string, unknown>;
      // garante ordem/nomes por coluna
      cols.forEach((c) => (row[c] = values[c]));
      rows.push(row as T);
    }
  } finally {
    stmt.free();
  }
  return rows;
}

// Exporta e salva o DB inteiro no IndexedDB
export async function saveToIndexedDB(): Promise<void> {
  if (!db) throw new Error("DB não inicializado. Chame initDB() antes.");
  const data = db.export(); // Uint8Array
  await idbSet(IDB_KEY, data);
}

// Opcional: reset total (útil para testes)
export async function resetDB(): Promise<void> {
  db = null;
  const SQL = await initSqlJs({
    locateFile: (f) => `https://sql.js.org/dist/${f}`,
  });
  db = new SQL.Database();
  db.run("PRAGMA user_version = 0;");
  await saveToIndexedDB();
}
