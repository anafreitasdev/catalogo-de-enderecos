import type { IViaCep } from '../models/ViacepInterface';

const BASE_URL = 'https://viacep.com.br/ws';

export const ViaCepService = {
  async searchByZipCode(cep: string): Promise<IViaCep> {
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      
      if (cepLimpo.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      const response = await fetch(`${BASE_URL}/${cepLimpo}/json/`);
      
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data: IViaCep = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
};
