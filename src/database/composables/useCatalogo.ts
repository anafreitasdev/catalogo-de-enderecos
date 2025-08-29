// src/composables/useCatalogo.ts
import { ref } from "vue";
import { initDB, exec, selectAll, saveToIndexedDB } from "../db/sqlite";

export interface Endereco {
  id?: number;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
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
        "SELECT id, cep, state, city, neighborhood, street, number FROM enderecos ORDER BY id DESC"
      );
    } catch (e: any) {
      erro.value = e?.message ?? String(e);
    } finally {
      carregando.value = false;
    }
  }

  async function adicionar(cep: string, state: string, city: string, neighborhood: string, street: string, number: string) {
    await initDB();
    exec("INSERT INTO enderecos (cep, state, city, neighborhood, street, number) VALUES (?, ?, ?, ?, ?, ?)", 
         [cep, state, city, neighborhood, street, number]);
    await saveToIndexedDB(); 
    await listar();
  }

  async function atualizar(id: number, cep: string, state: string, city: string, neighborhood: string, street: string, number: string) {
    await initDB();
    exec("UPDATE enderecos SET cep = ?, state = ?, city = ?, neighborhood = ?, street = ?, number = ? WHERE id = ?", 
         [cep, state, city, neighborhood, street, number, id]);
    await saveToIndexedDB(); 
    await listar();
  }

  async function remover(id: number) {  
    await initDB();
    exec("DELETE FROM enderecos WHERE id = ?", [id]);
    await saveToIndexedDB(); 
    await listar();
  }

  return { enderecos, carregando, erro, listar, adicionar, atualizar, remover };
}
