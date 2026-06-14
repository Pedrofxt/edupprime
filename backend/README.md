# EduPrime Backend

Setup e execução local (Windows / Linux / Mac)

1. Instalar dependências

```bash
cd backend
npm install
```

2. Gerar cliente Prisma e executar migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Iniciar servidor em desenvolvimento

```bash
npm run dev
```

Variáveis de ambiente: veja `.env` no diretório `backend`.

Para executar com Docker compose, verifique `docker-compose.yml` na raiz.
