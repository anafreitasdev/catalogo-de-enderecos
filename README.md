# Catálogo de Endereços

Um sistema moderno e responsivo para gerenciamento de endereços, construído com Vue 3, TypeScript e Tailwind CSS. Aplicação **offline-first** com banco de dados local SQLite no browser.

## 🚀 Funcionalidades

- **CRUD Completo** - Criar, ler, atualizar e deletar endereços
- **Validação de CEP** - Integração automática com API ViaCEP
- **Persistência Local** - Banco SQLite no browser com IndexedDB
- **Funcionalidade Offline** - Aplicação funciona sem internet
- **Internacionalização** - Suporte para Português e Inglês
- **Interface Moderna** - Design responsivo com Tailwind CSS
- **Vue 3 + Composition API** - Código limpo e performático
- **Responsivo** - Funciona perfeitamente em todos os dispositivos
- **Sistema de Rotas** - Navegação fluida entre páginas
- **Gerenciamento de Estado** - Pinia para estado global
- **TypeScript** - Tipagem estática para maior robustez
- **PWA Ready** - Preparado para Progressive Web App

## 🛠️ Stack Tecnológica

### **Frontend Core**
- **Vue 3.4+** - Framework progressivo com Composition API
- **TypeScript 5.3+** - Tipagem estática e melhor DX
- **Vue Router 4** - Roteamento oficial do Vue para SPA

### **Gerenciamento de Estado**
- **Pinia 3** - Store oficial do Vue 3, sucessor do Vuex
- **Composables** - Lógica reutilizável e organizada

### **UI/UX & Styling**
- **Tailwind CSS 3.4+** - Framework utility-first
- **Sass/SCSS** - Pré-processador CSS com variáveis e mixins
- **PostCSS** - Processamento automático de CSS

### **Build & Development**
- **Vite 5** - Build tool ultra-rápido da equipe Vue
- **Vue TSC** - Type checking para Vue
- **Vitest** - Framework de testes para Vite

### **Persistência de Dados**
- **SQL.js** - Motor SQLite rodando no browser
- **IndexedDB** - Armazenamento persistente no navegador
- **SQLite** - Banco relacional local com queries nativas

### **Internacionalização**
- **Vue I18n 9** - Sistema de internacionalização completo
- **Suporte Multi-idioma** - PT-BR (padrão) e Inglês

### **Integrações Externas**
- **ViaCEP API** - Serviço brasileiro de consulta de CEPs
- **Fetch API** - Comunicação HTTP moderna

## 📋 Pré-requisitos

- **Node.js 18.0.0+** (testado com Node.js 18.20.4)
- **npm 9+** ou **yarn 1.22+**
- **Navegador moderno** com suporte a ES6+ e IndexedDB

## 🚀 Como Executar

### **Instalação**
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd catalogo-enderecos

# Instale as dependências
npm install
```

### **Desenvolvimento**
```bash
# Execute em modo desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

### **Produção**
```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CardAddress.vue     # Card de endereço
│   ├── InputComponent.vue  # Input customizado
│   └── LoadingComponent.vue # Componente de loading
├── pages/              # Páginas da aplicação
│   └── AddressList/    # Lista de endereços
│       ├── AddressListPage.vue
│       └── components/
│           ├── AddressModal.vue    # Modal de endereço
│           └── AddressTable.vue    # Tabela de endereços
├── router/             # Configuração de rotas
│   ├── index.ts
│   └── routes/
│       └── AdressRoutes.ts
├── stores/             # Stores do Pinia
│   ├── index.ts
│   └── AddressStore.ts # Store de endereços
├── database/           # Sistema de persistência
│   ├── composables/
│   │   └── useCatalogo.ts # Composable do catálogo
│   └── db/
│       └── sqlite.ts   # Configuração SQLite
├── services/           # Serviços externos
│   └── viacep.service.ts # API ViaCEP
├── models/             # Interfaces TypeScript
│   ├── AddressInterface.ts
│   └── ViacepInterface.ts
├── composables/        # Lógica reutilizável
│   └── usePageTitle.ts
├── locales/            # Arquivos de tradução
│   ├── pt.json        # Português
│   └── en.json        # Inglês
├── assets/             # Recursos estáticos
├── style.scss          # Estilos globais + Tailwind
├── i18n.ts            # Configuração i18n
├── main.ts            # Ponto de entrada
└── App.vue            # Componente raiz
```

## 🗄️ Banco de Dados

### **Estrutura da Tabela**
```sql
CREATE TABLE enderecos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cep TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  street TEXT NOT NULL,
  number TEXT NOT NULL
);

CREATE INDEX idx_enderecos_cep ON enderecos (cep);
```

### **Características**
- **SQLite no Browser** - Queries SQL nativas
- **Persistência IndexedDB** - Dados salvos localmente
- **Funcionalidade Offline** - Sem dependência de servidor
- **Performance** - Índices otimizados para consultas

## 🌐 Internacionalização (i18n)

### **Idiomas Suportados**
- **Português (pt)** - Idioma padrão
- **Inglês (en)** - Idioma de fallback

### **Uso nos Componentes**
```vue
<template>
  <h1>{{ $t('address.title') }}</h1>
  <button>{{ $t('common.save') }}</button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>
```

## 🔌 API ViaCEP

### **Funcionalidades**
- **Validação de CEP** - Formato brasileiro (8 dígitos)
- **Preenchimento Automático** - Endereço completo via API
- **Tratamento de Erros** - Validação robusta
- **Fallback** - Funciona offline com dados salvos

### **Endpoint**
```
GET https://viacep.com.br/ws/{cep}/json/
```

## 📱 Funcionalidades da Aplicação

### **Gestão de Endereços**
- ✅ **Criar** - Adicionar novos endereços
- ✅ **Listar** - Visualizar todos os endereços
- ✅ **Atualizar** - Editar endereços existentes
- ✅ **Deletar** - Remover endereços
- ✅ **Buscar** - Filtros e ordenação

### **Validação e UX**
- ✅ **Validação de CEP** - Formato brasileiro
- ✅ **Preenchimento Automático** - Via API ViaCEP
- ✅ **Máscaras de Input** - Formatação automática
- ✅ **Feedback Visual** - Loading states e mensagens
- ✅ **Responsivo** - Mobile-first design

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (Vite)
npm run build        # Build para produção (Vue TSC + Vite)
npm run preview      # Preview do build de produção
```

## 🔧 Configurações

### **Vite**
- Plugin Vue 3
- Alias `@` para `./src`
- HMR ultra-rápido
- Build otimizado

### **Tailwind CSS**
- Configuração padrão
- Purge automático
- Responsivo por padrão

### **TypeScript**
- Configuração Vue 3
- Strict mode habilitado
- Path mapping configurado

## 🚀 Deploy

### **Build de Produção**
```bash
npm run build
```

### **Arquivos Gerados**
- `dist/` - Aplicação otimizada
- `dist/index.html` - Entry point
- `dist/assets/` - CSS/JS otimizados

### **Servidor Web**
- Qualquer servidor estático
- Nginx, Apache, Vercel, Netlify
- **PWA Ready** - Service workers

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### **Padrões de Código**
- **Vue 3 Composition API**
- **TypeScript** para tipagem
- **ESLint** para qualidade
- **Prettier** para formatação

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Issues** - Reporte bugs e sugestões
- **Documentação** - Vue 3, Pinia, Tailwind CSS
- **Comunidade** - Vue.js Brasil

---

**Desenvolvido usando Vue 3, TypeScript e Tailwind CSS**
