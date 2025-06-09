# F.refugio - Plataforma de Conexão para Refugiados, ONGs e Voluntários

[![Backend](https://img.shields.io/badge/backend-Java%20SpringBoot-blue)](https://github.com/GeisilaCosta/B.IntegrAcao.git)
[![Frontend](https://img.shields.io/badge/frontend-React%20Vite-brightgreen)](https://github.com/GeisilaCosta/B.refugio-frontend)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📖 Descrição do Projeto

B.refugio é uma aplicação web que conecta refugiados, ONGs e voluntários para facilitar o acesso e oferta de serviços essenciais como educação, saúde, apoio jurídico, entre outros. O objetivo é promover inclusão social e reduzir desigualdades, alinhado aos ODS 4, 10 e 16 da ONU.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- **React 18 + Vite**
- **React Router Dom**
- **Bootstrap 5**
- **Framer Motion** (animações suaves)
- **Context API** para autenticação, tema e idiomas
- **Axios** para comunicação HTTP
- **Styled-Components & SCSS**
- Deploy: Vercel ([https://brefugio-frontend.vercel.app](https://brefugio-frontend.vercel.app))

## 📂 Estrutura do Projeto
- ### Frontend

src/
├── components/ # Componentes reutilizáveis (Navbar, Sidebar, Modais)
├── context/ # Contextos React (Auth, Theme, i18n)
├── pages/ # Páginas principais (Home, Dashboard, Usuarios, Servicos, Profile)
├── services/ # Configuração do Axios
├── styles/ # SCSS e temas
├── i18n/ # Arquivos de tradução JSON
└── App.tsx # Rotas e Providers

## ⚙️ Funcionalidades

### Frontend

- Login e cadastro com validação
- Dashboard para gerenciamento de usuários e serviços
- Busca, paginação e filtros avançados
- Modais para criar, editar, excluir e feedback de sucesso
- Dark Mode com animações via Framer Motion
- Troca de idiomas com animações suaves
- Menu lateral com navegação e filtros dinâmicos
- Perfil do usuário para edição de dados pessoais
- Comunicação segura com backend via Axios e JWT

- ## 📦 Como Rodar o Projeto

- ### Frontend

- Instale dependências:

bash
Copiar
Editar
npm install
Execute:

bash
Copiar
Editar
npm run dev
Acesse a aplicação em http://localhost:3000.

🌐 Deploy
Backend: https://brefugio-backend.onrender.com

Frontend: https://brefugio-frontend.vercel.app

🤝 Contribuição
Contribuições são bem-vindas! Para colaborar:

Fork este repositório.

Crie sua branch (git checkout -b feature/nova-funcionalidade).

Faça commit das alterações (git commit -m 'Adicionar nova funcionalidade').

Push para a branch (git push origin feature/nova-funcionalidade).

Abra um Pull Request.

📄 Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Considerações Finais
Este projeto é uma aplicação full-stack moderna que utiliza as melhores práticas de desenvolvimento e arquitetura. Possui uma experiência de usuário acessível, responsiva e segura, respeitando os princípios do ODS e a necessidade de inclusão digital para refugiados e comunidades vulneráveis.
