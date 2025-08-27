# Catálogo de Endereços

Um sistema moderno e responsivo para gerenciamento de endereços, construído com Vue 3, TypeScript e Tailwind CSS.

## Funcionalidades

- **Internacionalização** - Suporte para Português e Inglês
- **Interface Moderna** - Design responsivo com Tailwind CSS
- **Vue 3 + Composition API** - Código limpo e performático
- **Responsivo** - Funciona perfeitamente em todos os dispositivos
- **Sistema de Rotas** - Navegação fluida entre páginas
- **Gerenciamento de Estado** - Pinia para estado global

## Tecnologias

- **Frontend**: Vue 3 + TypeScript
- **Estilização**: Tailwind CSS
- **Roteamento**: Vue Router 4
- **Internacionalização**: Vue i18n
- **Gerenciamento de Estado**: Pinia
- **Build Tool**: Vite
- **Linting**: ESLint + TypeScript

## Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd catalogo-enderecos

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── router/             # Configuração de rotas
├── stores/             # Stores do Pinia
├── locales/            # Arquivos de tradução
├── assets/             # Recursos estáticos
├── style.scss          # Estilos globais + Tailwind
├── main.ts             # Ponto de entrada
└── App.vue             # Componente raiz
```

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run test         # Executar testes
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
