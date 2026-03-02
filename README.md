# API Express 

## Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js v18+)
- **Framework:** Express.js (v5.2.1)
- **ORM:** Prisma (v6.x)
- **Banco de Dados:** SQLite

## Dependências

- express
- cors
- @prisma/client
- prisma (dev dependency)

## Como rodar o projeto localmente

### 1️⃣ Clone o repositório
```bash
git clone <url-do-seu-repositorio>
```

### 2️⃣ Acesse a pasta do projeto
```bash
cd nome-da-pasta
```

### 3️⃣ Instale as dependências
```bash
npm install
```

### 4️⃣ Crie as tabelas no banco de dados com Prisma
```bash
npx prisma db push
```

### 5️⃣ Inicie o servidor
```bash
npm run dev
```

## Acesso à API

A API estará disponível em:

http://localhost:3001

