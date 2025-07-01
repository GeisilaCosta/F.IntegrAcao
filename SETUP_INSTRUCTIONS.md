# Instruções de Setup - IntegrAção

## 🎯 Configuração Completa para Windows

### 📋 Pré-requisitos

1. **Java 17+** (para o backend)
   - Download: https://adoptium.net/
   - Verificar: `java -version`

2. **Node.js 16+** (para o frontend)
   - Download: https://nodejs.org/
   - Verificar: `node --version`

3. **MySQL 8.0+** (banco de dados)
   - Download: https://dev.mysql.com/downloads/mysql/
   - Ou use XAMPP: https://www.apachefriends.org/

4. **IDEs**
   - Eclipse IDE for Enterprise Java Developers
   - Visual Studio Code

---

## 🗄️ Configuração do Banco de Dados

### 1. Criar Database
```sql
CREATE DATABASE integracao_db;
CREATE USER 'integracao_user'@'localhost' IDENTIFIED BY 'integracao_pass';
GRANT ALL PRIVILEGES ON integracao_db.* TO 'integracao_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configurar application.properties (Backend)
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/integracao_db
spring.datasource.username=integracao_user
spring.datasource.password=integracao_pass
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# JWT Configuration
app.jwtSecret=integracaoSecretKey2024
app.jwtExpirationMs=86400000
```

---

## 🔧 Setup do Backend (Eclipse)

### 1. Importar Projeto
1. Abra o Eclipse
2. File > Import > Existing Maven Projects
3. Selecione a pasta `IntegrAcao` (backend)
4. Clique em Finish

### 2. Configurar Maven
1. Clique com botão direito no projeto
2. Maven > Reload Projects
3. Maven > Update Project (Force Update)

### 3. Executar Aplicação
1. Clique com botão direito em `IntegrAcaoApplication.java`
2. Run As > Java Application
3. Verificar no console: "Started IntegrAcaoApplication"
4. Testar: http://localhost:8080/api/swagger-ui.html

### 4. Verificar Logs
- Console do Eclipse mostrará logs da aplicação
- Verificar se não há erros de conexão com banco

---

## 💻 Setup do Frontend (VSCode)

### 1. Abrir Projeto
1. Abra o VSCode
2. File > Open Folder
3. Selecione a pasta `integracao-frontend`

### 2. Instalar Extensões Recomendadas
O VSCode sugerirá automaticamente as extensões. Clique em "Install All".

Ou instale manualmente:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

### 3. Instalar Dependências
Abra o terminal no VSCode (Ctrl + `) e execute:
```bash
npm install
```

### 4. Configurar Variáveis de Ambiente
Crie arquivo `.env` na raiz do projeto frontend:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=IntegrAção
REACT_APP_VERSION=1.0.0
```

### 5. Executar Aplicação
```bash
npm run dev
```
Acesse: http://localhost:5173

---

## 🔗 Integração Frontend + Backend

### 1. Testar Conexão
1. Backend rodando em: http://localhost:8080/api
2. Frontend rodando em: http://localhost:5173
3. Swagger UI: http://localhost:8080/api/swagger-ui.html

### 2. Configurar CORS (se necessário)
No backend, arquivo `WebSecurityConfig.java` já está configurado para aceitar requisições do frontend.

### 3. Testar APIs
Use o Swagger UI ou Postman para testar os endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/ofertas
- GET /api/pedidos

---

## 🚀 Scripts Úteis

### Backend (Maven)
```bash
# Limpar e compilar
mvn clean compile

# Executar testes
mvn test

# Gerar JAR
mvn clean package

# Executar aplicação
mvn spring-boot:run
```

### Frontend (npm)
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Verificar dependências
npm audit
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Backend não inicia
1. Verificar se MySQL está rodando
2. Verificar credenciais do banco
3. Verificar se porta 8080 está livre
4. Verificar logs no console do Eclipse

#### Frontend não carrega
1. Verificar se Node.js está instalado
2. Executar `npm install` novamente
3. Verificar se porta 5173 está livre
4. Verificar console do navegador (F12)

#### Erro de CORS
1. Verificar configuração no backend
2. Verificar URL da API no frontend
3. Testar endpoints no Swagger primeiro

#### Banco de dados
1. Verificar se MySQL está rodando
2. Testar conexão com MySQL Workbench
3. Verificar se database foi criada
4. Verificar permissões do usuário

---

## 📱 Funcionalidades Implementadas

### Backend (Spring Boot)
- ✅ Autenticação JWT
- ✅ CRUD completo para todas entidades
- ✅ Sistema de roles (USER, SUPPORTER, ADMIN)
- ✅ API REST documentada com Swagger
- ✅ Validações e tratamento de erros
- ✅ Sistema de avaliações
- ✅ Chat/mensagens
- ✅ Painel administrativo

### Frontend (React)
- ✅ Interface moderna e responsiva
- ✅ Internacionalização (PT, EN, ES)
- ✅ Gráficos e estatísticas
- ✅ Chat interativo
- ✅ Formulários de contato
- ✅ Seletor de idiomas
- ✅ Design system consistente

---

## 🎯 Próximos Passos

1. **Conectar Frontend com Backend**
   - Implementar autenticação
   - Conectar formulários
   - Adicionar loading states

2. **Melhorias de UX**
   - Adicionar notificações
   - Implementar busca avançada
   - Adicionar filtros

3. **Deploy**
   - Configurar para produção
   - Deploy do backend (Heroku/AWS)
   - Deploy do frontend (Vercel/Netlify)

---

## 📞 Suporte

Para dúvidas:
1. Verificar logs no console das IDEs
2. Usar DevTools do navegador (F12)
3. Consultar documentação do Swagger
4. Verificar README de cada projeto

**Boa sorte com o desenvolvimento! 🚀**
