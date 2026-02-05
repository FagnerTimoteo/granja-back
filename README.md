# 🐔 Granja Backend

Backend em Node.js com Express e PostgreSQL para gerenciamento de
dados da granja.

---

## 📦 Pré-requisitos

- Node.js (v16+)
- Docker e Docker Compose
- npm

---

## 🚀 Como Começar

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Configure o banco de dados com Docker

Inicie o PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Este comando irá:

- Criar um container PostgreSQL baseado na imagem `postgres:15`
- Configurar o banco de dados `granja_db`
- Expor a porta `5432`
- Armazenar os dados em um volume persistente

**Verificar se o container está rodando:**

```bash
docker ps
```

Você deve ver um container com o nome `granja-postgres`.

### 3️⃣ Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto `granja-back` com a seguinte configuração:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/granja_db"
```

### 4️⃣ Crie as tabelas do banco com Prisma

Execute o comando para executar as migrations e criar as tabelas:

```bash
npx prisma migrate dev
```

Ou se preferir apenas aplicar as migrations existentes sem criar novas:

```bash
npx prisma migrate deploy
```

**Visualizar os dados do banco (opcional):**

```bash
npx prisma studio
```

---

## 🛠️ Desenvolvimento

Para rodar o servidor em modo desenvolvimento com auto-reload (nodemon):

```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

---

---

## 🛑 Parando o Docker

Para parar os containers Docker:

```bash
docker-compose down
```

Para parar e remover tudo (incluindo volumes):

```bash
docker-compose down -v
```

---

### 📦 Tecnologias Utilizadas:

1. Node.js
2. Express
3. PostgreSQL
4. Prisma (ORM)
5. MQTT
6. CORS
7. Nodemon (dev)
8. Docker

---

## 📝 Próximos Passos

1. Configure as variáveis de ambiente no `.env`
2. Inicie o Docker com `docker-compose up -d`
3. Execute `npx prisma migrate dev` para criar as tabelas
4. Comece o desenvolvimento com `npm start`
