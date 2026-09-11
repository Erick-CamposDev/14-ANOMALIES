<div align="center">

<img src="frontend/public/assets/images/14-Anomalies-logo.png" alt="14 Anomalies" width="700">

# 14 Anomalies

### Um jogo de enigmas inspirado em _Do Not Believe His Lies_

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-red?style=for-the-badge)](https://github.com/SEU_USUARIO/SEU_REPOSITORIO)
[![Frontend](https://img.shields.io/badge/frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=white)](frontend/)
[![Backend](https://img.shields.io/badge/backend-Express-000000?style=for-the-badge&logo=express&logoColor=white)](backend/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Aviso de spoilers

Este repositório contém spoilers, respostas e dados relacionados a alguns enigmas.

Recomenda-se jogar o jogo antes de consultar os arquivos do projeto, principalmente:

- `backend/src/data/riddles.json`;
- `backend/src/constants/expectedRiddles.ts`;
- `backend/src/data/reward.ts`;
- arquivos de serviços, repositories e validação de respostas.

Antes de começar, também é recomendado assistir aos dois vídeos que apresentam a história de Obcaozwo 14. Eles ajudam a entender o contexto, a origem da persona e os acontecimentos relacionados aos enigmas.

- [História de Obcaozwo 14 - Parte 1](https://youtu.be/FeG5BFLc0Cs?si=7k0FII4i9yIa9ceT)
- História de Obcaozwo 14 - Parte 2: `ADICIONE_O_LINK_DO_SEGUNDO_VIDEO`

---

## Links importantes

| Recurso            | Link                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| Jogar online       | [Jogue o 14 ANOMALIES](https://14-anomalies.vercel.app/)                                          
| API                | [API](https://one4-anomalies-1.onrender.com/14anomalies/progress/8f3c1a72-6d94-4e58-b7a1-29c4f0e85d63) |                                              |
| História - Parte 1 | [Assistir no YouTube](https://youtu.be/FeG5BFLc0Cs?si=7k0FII4i9yIa9ceT) |
| História - Parte 2 | `placeholder`                                      |

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Objetivo](#objetivo)
- [Demonstração](#demonstração)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como o frontend funciona](#como-o-frontend-funciona)
- [Como o backend funciona](#como-o-backend-funciona)
- [API](#api)
- [Banco de dados](#banco-de-dados)
- [Configuração local](#configuração-local)
- [Scripts disponíveis](#scripts-disponíveis)
- [Deploy](#deploy)
- [Status do projeto](#status-do-projeto)
- [Game Preview](#game-preview)
- [Autor](#autor)
- [Licença](#licença)

---

## Sobre o projeto

**14 Anomalies** é um jogo de enigmas criado para desafiar amigos que participaram de um servidor Realms de Minecraft em janeiro de 2026.

O jogo é baseado na persona fictícia **Obcaozwo 14**, também conhecida como **Olho Anômalo**. A persona foi criada para gerar mistério, construir uma narrativa e apresentar enigmas relacionados à história do personagem.

A experiência combina:

- Enigmas textuais;
- Imagens;
- Áudios;
- Vídeos do Youtube;
- Códigos e mensagens criptografadas;
- Elementos visuais de terror e mistério;
- Uma narrativa relacionada ao universo de Minecraft;
- Sistema de progresso individual;
- Recompensa liberada após a conclusão dos 14 enigmas.

---

## Objetivo

O objetivo do jogo é resolver as 14 anomalias na ordem correta.

Cada resposta correta permite que o jogador avance para o próximo enigma. Depois de concluir todos os desafios, uma recompensa final é liberada.

O backend impede que o jogador acesse ou responda enigmas futuros antes de concluir os anteriores.

---

## Demonstração

### Identidade visual

<div align="center">

<img src="frontend/public/assets/images/14-Anomalies-logo.png" alt="Logo 14 Anomalies" width="650">

<br><br>

<img src="frontend/public/assets/images/Anomaly-Eye.png" alt="Olho Anômalo" width="500">

</div>

### Recursos visuais

Alguns dos recursos utilizados na experiência estão disponíveis em:

- `frontend/public/assets/images`;
- `frontend/public/assets/audio`;

Imagens utilizadas incluem:

- `14-Anomalies-BG.png`;
- `14-Anomalies-logo.png`;
- `anomaly-binary.png`;
- `Anomaly-Eye-Closed.png`;
- `Anomaly-Eye.png`;
- `common-image.png`;
- `Crimson Eye.png`;
- `eye-minecraft-mountain.png`;
- `flags.jpeg`;
- `inspect.png`;
- `serious-eye.png`.

Vídeos disponíveis nos assets:

- `BLINKING.mp4`;
- `DISCUSSION.mp4`;
- `STRANGE.mp4`.

---

## Tecnologias utilizadas

### Frontend

- React 19;
- TypeScript;
- Vite;
- React Router;
- React Spinners;
- Typed.js;
- ESLint;
- CSS.

### Backend

- Node.js;
- TypeScript;
- Express 5;
- Prisma ORM;
- PostgreSQL;
- Zod;
- CORS;
- pg;
- tsx;
- tsup.

### Banco de dados

- PostgreSQL;
- Prisma ORM;
- UUIDs para identificação dos jogadores;
- Migrations do Prisma;
- Relação entre jogadores e progresso.

---

## Estrutura do projeto

```text
14-anomalies/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── enums/
│   │   ├── generated/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── css/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## Como o frontend funciona

O frontend é uma aplicação React desenvolvida com Vite.

Rotas principais:

| Rota               | Descrição            |
| ------------------ | -------------------- |
| `/`                | Tela inicial         |
| `/anomaly/:number` | Página de um enigma  |
| `/secret`          | Página secreta       |
| `/reward`          | Página da recompensa |
| `/error/:status`   | Página de erro       |

Fluxo principal:

1. O jogador acessa a tela inicial;
2. O frontend gera um UUID para identificar o jogador;
3. O UUID é salvo no `localStorage`;
4. O frontend cria o progresso do jogador na API;
5. O jogador é direcionado para o primeiro enigma;
6. A resposta é enviada para o backend;
7. Em caso de acerto, o progresso é atualizado;
8. O jogador avança para o próximo enigma;
9. Ao concluir os 14 enigmas, a recompensa é liberada.

A comunicação com o backend é feita por meio da função `fetchAPI`.

A URL da API é configurada pela variável:

```env
VITE_API_URL=http://localhost:5000
```

Em produção, essa variável deve apontar para a URL real da API.

---

## Como o backend funciona

O backend foi desenvolvido com Express e TypeScript, seguindo uma divisão em camadas:

- **Routes:** definem os endpoints;
- **Controllers:** recebem e encaminham as requisições;
- **Services:** concentram as regras de negócio;
- **Repositories:** realizam operações no banco;
- **Models:** definem os formatos dos dados;
- **Middlewares:** validam as requisições;
- **Prisma:** realiza a comunicação com o PostgreSQL.
- **Schemas:** Define ZodSchemas para a middleware.

O backend controla:

- Criação de jogadores;
- Recuperação de progresso;
- Atualização de progresso;
- Validação das respostas;
- Bloqueio de enigmas futuros;
- Reset do progresso;
- Liberação da recompensa final.

As respostas dos enigmas não são enviadas pelo endpoint público. O backend remove esse campo antes de responder ao frontend.

---

## API

A API utiliza o prefixo:

```text
/14anomalies
```

### Criar progresso de um jogador

```http
POST /14anomalies/start/:id
```

Cria um jogador e inicia seu progresso.

Exemplo:

```http
POST /14anomalies/start/UUID_DO_JOGADOR
```

---

### Consultar progresso

```http
GET /14anomalies/progress/:id
```

Retorna o progresso atual do jogador.

Exemplo de resposta:

```json
{
  "id": "uuid-do-jogador",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "progress": {
    "id": "uuid-do-progresso",
    "currentState": 3,
    "hasFinished": false,
    "playerId": "uuid-do-jogador"
  }
}
```

---

### Consultar um enigma

```http
GET /14anomalies/anomaly/:id/:playerId
```

Retorna o conteúdo público de um enigma.

Exemplo:

```http
GET /14anomalies/anomaly/1/UUID_DO_JOGADOR
```

A resposta do enigma não é enviada nessa rota.

O jogador recebe uma resposta de erro caso tente acessar um enigma que ainda não foi liberado.

---

### Enviar resposta

```http
POST /14anomalies/anomaly/:id/:playerId
```

Envia a resposta de um enigma.

Corpo da requisição:

```json
{
  "answer": "resposta do jogador"
}
```

A resposta é validada com Zod e comparada com a resposta armazenada pelo backend.

Possíveis resultados:

- Resposta correta;
- Resposta incorreta;
- Enigma já concluído;
- Tentativa de responder um enigma futuro;
- Jogador inexistente;
- Progresso inexistente.

---

### Atualizar progresso

```http
PATCH /14anomalies/progress/:id
```

Atualiza o progresso do jogador.

Esse endpoint é utilizado pelo fluxo do jogo após a conclusão de um enigma.

---

### Obter recompensa

```http
GET /14anomalies/reward/:playerId
```

Retorna a recompensa final.

A recompensa só é liberada quando os 14 enigmas forem concluídos.

---

### Resetar progresso

```http
POST /14anomalies/reset/:playerId
```

Reseta o progresso do jogador e permite jogar novamente desde o início.

---

## Banco de dados

O banco utiliza PostgreSQL com Prisma ORM.

### Modelo `Player`

Representa o jogador.

| Campo       | Tipo     | Descrição                      |
| ----------- | -------- | ------------------------------ |
| `id`        | UUID     | Identificador único do jogador |
| `createdAt` | DateTime | Data de criação                |
| `updatedAt` | DateTime | Data da última atualização     |
| `progress`  | Relação  | Progresso associado ao jogador |

### Modelo `Progress`

Representa o progresso do jogador.

| Campo          | Tipo    | Descrição                        |
| -------------- | ------- | -------------------------------- |
| `id`           | UUID    | Identificador único do progresso |
| `currentState` | Int     | Estado ou enigma atual           |
| `hasFinished`  | Boolean | Indica se o jogo foi concluído   |
| `playerId`     | UUID    | Relação com o jogador            |

A relação entre `Player` e `Progress` é de um para um.

O conteúdo dos enigmas fica armazenado nos arquivos:

```text
backend/src/data/riddles.json
backend/src/data/reward.ts
```

O banco é utilizado principalmente para armazenar jogadores e seus respectivos progressos.

---

## Configuração local

### Pré-requisitos

- Node.js;
- npm;
- PostgreSQL;
- Git.

### Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd 14-anomalies
```

### Configurar o backend

```bash
cd backend
npm install
```

Configure o arquivo `.env`:

```env
PORT=5000
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

Inicie o backend:

```bash
npm run dev
```

O servidor ficará disponível em:

```text
http://localhost:5000
```

### Configurar o frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Configure o arquivo `.env.development`:

```env
VITE_API_URL=http://localhost:5000
```

Inicie o frontend:

```bash
npm run dev
```

---

## Scripts disponíveis

### Frontend

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run lint
```

Executa a análise estática do código.

```bash
npm run preview
```

Executa uma prévia da build de produção.

### Backend

```bash
npm run dev
```

Inicia o servidor usando tsx.

```bash
npm run watch
```

Inicia o servidor com reinicialização automática.

```bash
npm run build
```

Gera a build do backend usando tsup.

```bash
npm run start
```

Gera a build e inicia o servidor.

---

## Deploy

### Frontend

URL do jogo:

```text
https://14-anomalies.vercel.app/
```

### Backend

URL da API:

```text
https://one4-anomalies-1.onrender.com/14anomalies/progress/8f3c1a72-6d94-4e58-b7a1-29c4f0e85d63
```

Depois de realizar o deploy, configure a variável do frontend:

```env
VITE_API_URL=https://URL_REAL_DA_API
```

O arquivo `.env.production` possui atualmente um endereço de exemplo:

```env
VITE_API_URL=https://localhost:5000
```

Esse valor deve ser substituído pela URL real da API publicada.

---

## Tipos de enigmas

O projeto suporta os seguintes tipos de conteúdo:

```ts
type RiddleContent = "text" | "audio" | "urlVideo" | "image";
```

Cada enigma pode conter:

- Texto principal;
- Conteúdo multimídia;
- Dica;
- Texto alternativo;
- Nível necessário;
- Resposta protegida.

O jogador deve resolver os enigmas na ordem correta. O sistema verifica o nível requerido antes de liberar cada desafio.

---

## Arquitetura

```text
React + Vite
      |
      | HTTP / JSON
      v
Express + TypeScript
      |
      | Prisma ORM
      v
PostgreSQL
```

A divisão permite que:

- O frontend cuide da experiência do jogador;
- O backend controle as regras e respostas;
- O banco armazene os jogadores e seus progressos;
- Os enigmas sejam protegidos contra acesso antecipado;
- Frontend e backend sejam publicados separadamente.

---

## Status do projeto

O projeto possui:

- Frontend em React;
- Backend em Express;
- Banco PostgreSQL;
- Sistema de criação de jogadores;
- Sistema de progresso;
- Validação de respostas;
- Bloqueio de fases futuras;
- Reset de progresso;
- Recompensa final;
- Enigmas com texto, imagem, áudio e vídeo.

---

## Game Preview

<div align="center">
<img width="500px" alt="Tela inicial do jogo" src="frontend/public/assets/images/project-imgs/Initial-Screen.jpg"/>

<br></br>

<img width="500px" alt="Tela do enigma" src="frontend/public/assets/images/project-imgs/anomaly-screen.jpg"/>

<br></br>

<img width="500px" alt="Tela do enigma" src="frontend/public/assets/images/project-imgs/attempt-modal.jpg"/>

</div>

---

## Autor

Desenvolvido por **Erick Campos**.

Projeto criado para expandir a história de Obcaozwo 14 e desafiar os jogadores que participaram do servidor Realms de Minecraft em janeiro de 2026.

---

## Licença

Este projeto está sob a licença MIT.
