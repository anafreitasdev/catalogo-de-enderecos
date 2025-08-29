// src/composables/useCatalogo.ts
import { ref } from "vue";
import { initDB, exec, selectAll, saveToIndexedDB } from "../db/sqlite";

export interface Endereco {
  id?: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  criado_em?: string;
}

export function useCatalogo() {
  const enderecos = ref<Endereco[]>([]);
  const carregando = ref<boolean>(true);
  const erro = ref<string | null>(null);

  async function listar() {
    carregando.value = true;
    erro.value = null;
    try {
      await initDB();
      enderecos.value = selectAll<Endereco>(
        "SELECT id, cep, estado, cidade, bairro, rua, numero, criado_em FROM enderecos ORDER BY id DESC"
      );
      console.log(enderecos.value);
    } catch (e: any) {
      erro.value = e?.message ?? String(e);
    } finally {
      carregando.value = false;
    }
  }

  async function adicionar(cep: string, estado: string, cidade: string, bairro: string, rua: string, numero: string) {
    await initDB();
    exec("INSERT INTO enderecos (cep, estado, cidade, bairro, rua, numero) VALUES (?, ?, ?, ?, ?, ?)", 
         [cep, estado, cidade, bairro, rua, numero]);
    await saveToIndexedDB(); // persist after write
    await listar();
  }

  async function atualizar(id: number, cep: string, estado: string, cidade: string, bairro: string, rua: string, numero: string) {
    await initDB();
    exec("UPDATE enderecos SET cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ? WHERE id = ?", 
         [cep, estado, cidade, bairro, rua, numero, id]);
    await saveToIndexedDB(); // persist after write
    await listar();
  }

  async function remover(id: number) {  
    await initDB();
    exec("DELETE FROM enderecos WHERE id = ?", [id]);
    await saveToIndexedDB(); // persist after write
    await listar();
  }

  return { enderecos, carregando, erro, listar, adicionar, atualizar, remover };
}
