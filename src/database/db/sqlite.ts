import initSqlJs from "sql.js";
import type { Database, SqlJsStatic } from "sql.js";

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

const IDB_NAME = "VueSqliteDB";
const IDB_STORE = "db";
const IDB_KEY = "sqlite-binary";

function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const idb = req.result;
      if (!idb.objectStoreNames.contains(IDB_STORE)) {
        idb.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveToIndexedDB(): Promise<void> {
  if (!db) return;
  const data = db.export();
  const idb = await openIDB();
  await new Promise<void>((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(IDB_STORE).put(data, IDB_KEY);
  });
  idb.close();
}

async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  const idb = await openIDB();
  const res: Uint8Array | null = await new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, "readonly");
    const store = tx.objectStore(IDB_STORE);
    const getReq = store.get(IDB_KEY);
    getReq.onsuccess = () => resolve(getReq.result ?? null);
    getReq.onerror = () => reject(getReq.error);
  });
  idb.close();
  return res;
}

export type FileHandle = any;
let currentHandle: FileHandle | null = null;

export function getCurrentHandle() {
  return currentHandle;
}


async function ensureSQL() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`
    });
  }
}

async function ensureSchema() {
  if (!db) return;
  db.run(`
    CREATE TABLE IF NOT EXISTS enderecos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cep TEXT NOT NULL,
      estado TEXT NOT NULL,
      cidade TEXT NOT NULL,
      bairro TEXT NOT NULL,
      rua TEXT NOT NULL,
      numero TEXT NOT NULL,
      criado_em TEXT DEFAULT (datetime('now'))
    );
  `);
}


export async function initDB(): Promise<Database> {
  if (db) return db;
  await ensureSQL();

  const bytes = await loadFromIndexedDB();
  db = bytes ? new SQL!.Database(bytes) : new SQL!.Database();
  await ensureSchema();
  return db!;
}


export function exec(sql: string, params: any[] = []) {
  if (!db) throw new Error("DB not initialized");
  db.run(sql, params);
}

export function selectAll<T = any>(sql: string, params: any[] = []): T[] {
  if (!db) throw new Error("DB not initialized");
  const stmt = db.prepare(sql);
  const out: T[] = [];
  try {
    stmt.bind(params);
    while (stmt.step()) {
      out.push(stmt.getAsObject() as T);
    }
  } finally {
    stmt.free();
  }
  return out;
}
