# GeoProjetoDigital

API em Node.js e TypeScript para simular uma plataforma de aprovação digital de projetos imobiliários e urbanísticos.

## Contexto funcional

Empresas e profissionais cadastram projetos digitais para aprovação. Cada projeto pertence a uma empresa e possui documentos obrigatórios para análise. Usuários comuns visualizam projetos vinculados à própria empresa, enquanto usuários com perfil administrativo global possuem uma visão ampla do ambiente.

O status apresentado na listagem considera a situação dos documentos obrigatórios quando o projeto está em análise.

## Como rodar com Docker

Suba a API com:

```bash
docker compose up --build
```

A API ficará disponível em:

```text
http://localhost:3000
```

Também é possível executar comandos dentro do container:

```bash
docker compose run --rm api npm install
docker compose run --rm api npm run build
docker compose run --rm api npm run dev
```

## Como rodar build com Docker

```bash
docker compose run --rm api npm run build
```

## Como rodar localmente com npm

Esta é uma alternativa para ambientes que já possuem Node.js e npm instalados:

```bash
npm install
npm run build
npm start
```

Para desenvolvimento local:

```bash
npm run dev
```

## Usuários disponíveis

A autenticação é simulada pelo header `x-user-id`.

| Usuário | Perfil | Empresa |
| --- | --- | --- |
| `user-north` | `USER` | Construtora Norte |
| `user-south` | `USER` | Urbaniza Sul |
| `user-admin` | `ADMIN_GLOBAL` | Sem empresa vinculada |

## Endpoints disponíveis

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Verifica a saúde da API |
| `GET` | `/projects` | Lista projetos disponíveis para o usuário autenticado |
| `GET` | `/projects/:id` | Retorna detalhes de um projeto |
| `GET` | `/projects/:id/documents` | Lista documentos de um projeto |

## Exemplos de curl

Health:

```bash
curl http://localhost:3000/health
```

Listar projetos como usuário comum da Construtora Norte:

```bash
curl -H "x-user-id: user-north" http://localhost:3000/projects
```

Listar projetos como usuário comum da Urbaniza Sul:

```bash
curl -H "x-user-id: user-south" http://localhost:3000/projects
```

Listar projetos como admin:

```bash
curl -H "x-user-id: user-admin" http://localhost:3000/projects
```

Buscar detalhe de projeto:

```bash
curl -H "x-user-id: user-north" http://localhost:3000/projects/project-palmeiras
```

Listar documentos de projeto:

```bash
curl -H "x-user-id: user-north" http://localhost:3000/projects/project-palmeiras/documents
```

## Cenário reportado

Foi reportada uma inconsistência no comportamento de visualização de projetos digitais. A listagem de projetos parece respeitar o contexto do usuário autenticado e apresenta uma visão consolidada do status, mas há suspeita de comportamento divergente ao acessar detalhes diretamente pela API. O objetivo é investigar o fluxo, identificar possíveis causas e propor uma correção.

## Fluxo esperado da aplicação

- A tela de listagem consumiria `GET /projects`.
- A tela de detalhe consumiria `GET /projects/:id`.
- A aba de documentos consumiria `GET /projects/:id/documents`.
- O usuário autenticado é identificado pelo header `x-user-id`.
