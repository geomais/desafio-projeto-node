# GeoProjetoDigital

API em Node.js e TypeScript para simular uma plataforma de aprovação digital de projetos imobiliários e urbanísticos. Possibilitando consultar projetos, status de análise e documentos obrigatórios usando autenticação fake por header.

## Contexto funcional

Empresas e profissionais cadastram projetos digitais para análise, e cada projeto pertence obrigatoriamente a uma empresa.

A visualização dos projetos deve respeitar o perfil do usuário autenticado:

- Usuários comuns visualizam apenas os projetos vinculados à própria empresa.
- Usuários com perfil admin podem visualizar projetos de todas as empresas.

Cada projeto possui documentos obrigatórios que precisam ser enviados para que a análise possa avançar. Por isso, o status exibido na interface do projeto pode ser diferente do status real armazenado no projeto.

A regra de exibição do status é:

- Se o projeto estiver com status real "em análise", mas ainda possuir algum documento obrigatório pendente, exibir com o status "documentos pendentes".
- Se todos os documentos obrigatórios estiverem enviados, a listagem deve exibir o status real do projeto.
- Para projetos que não estejam "em análise", deve então exibir o status real do projeto.

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

Foram reportadas duas inconsistências no comportamento de visualização de projetos digitais.

A primeira está relacionada ao contexto do usuário. Em alguns fluxos, os projetos parecem respeitar corretamente o usuário autenticado, mas há suspeita de que esse comportamento não esteja consistente em todas as formas de consulta.

A segunda está relacionada ao status exibido. Em alguns fluxos, o status parece seguir corretamente as regras de exibição, considerando também a situação dos documentos obrigatórios, mas há suspeita de divergência em outras consultas do projeto.

O objetivo é investigar os fluxos, identificar possíveis causas e propor uma correção.

## Fluxo esperado da aplicação

- A tela de listagem consumiria `GET /projects`.
- A tela de detalhe consumiria `GET /projects/:id`.
- A aba de documentos consumiria `GET /projects/:id/documents`.
- O usuário autenticado é identificado pelo header `x-user-id`.
