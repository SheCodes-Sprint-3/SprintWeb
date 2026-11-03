# SprintWeb

Projeto desenvolvido para a Sprint 3, do challenge do 1.°ano do curso de Engenharia de Software da FIAP, em parceria com a empresa JOVI.

## Tecnologias utilizadas

- React
- Node.js
- CSS3
- React Router DOM (navegação entre páginas)
- Vite 
- ESLint 

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** 
- **Git**

Você pode confirmar as instalações rodando no terminal:

```bash
node -v
npm -v
git --version
```

## Como instalar as dependências

```bash
# Clone o repositório por meio do terminal de comando
git clone https://github.com/SheCodes-Sprint-3/SprintWeb.git

# Acesse a pasta do projeto
cd SprintWeb

# Instale as dependências
npm install
```

## Como executar o projeto

Ainda dentro da pasta do projeto, execute o comando abaixo no terminal:
```bash
npm run dev
```

O projeto será executado em `http://localhost:5173`.

Agora é só navegar e conhecer o ecossistema do JoviClass!

Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

## Usuários e senhas para teste

O projeto não possui sistema de autenticação. A aplicação carrega direto na tela inicial, com dados fixos no código (usuário fictício "Helena") e o progresso salvo no localStorage do navegador.

## Uso de Inteligência Artificial no projeto

As ferramentas de Inteligência Artificial foram utilizadas em pontos pontuais do desenvolvimento do projeto, principalmente para revisar erros de digitação no código e na documentação, além de auxiliar no entendimento de tecnologias que a equipe ainda não havia utilizado na prática anteriormente,  como o React Router DOM, necessárias para replicar o sistema proposto pela equipe, para o Challenge em parceiria com a JOVI, no React. O uso da IA serviu como apoio ao aprendizado e à revisão, e todo o código e conteúdo final foi escrito e validado pela equipe.


## Link do Deploy (Vercel)

[Link do Vercel](https://sprint-web-flame.vercel.app/)

---

Desenvolvido por: 

Amanda Oliveira Lourenço - RM: 572572 

Giovanna Lopes Scalzone - RM: 572285 

Letícia Brandão Couto - RM: 569516 

Nayra Sousa Duarte - RM: 573815 

Paloma do Carmo Dantas - RM: 569995 


# SprintWeb — JoviClass

Projeto desenvolvido para a Sprint 4 do challenge do 1.º ano do curso de Engenharia de Software da FIAP, em parceria com a empresa JOVI. Esta entrega é a evolução do projeto da Sprint 3, mantendo a solução do Challenge (JoviClass), agora integrada de forma completa ao React, com autenticação, rotas privadas, hooks customizados, Tailwind CSS e consumo de API.

## Tecnologias utilizadas

- React
- Vite
- React Router DOM (rotas públicas e privadas)
- Tailwind CSS
- MockAPI (API mockada, consumida via `fetch`)
- lucide-react (ícones)
- ESLint
- Node.js
- Git + Vercel (versionamento e deploy)

## Funcionalidades

- Landing page de apresentação do JoviClass.
- Login com autenticação simulada e rotas privadas (só acessa o app quem estiver logado).
- Painel inicial, matérias, anotações e arquivos, calendário, comunidades, perfil e câmera.
- Notificações carregadas da API.
- Layout responsivo para Desktop, Tablet e Mobile.

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js**
- **Git**

Você pode confirmar as instalações rodando no terminal:

```
node -v
npm -v
git --version
```

## Como instalar as dependências

```
# Clone o repositório
git clone https://github.com/SheCodes-Sprint-3/SprintWeb.git

# Acesse a pasta do projeto
cd SprintWeb

# Instale as dependências
npm install
```

## Variáveis de ambiente

O projeto consome uma API mockada no MockAPI. A URL dela é lida da variável `VITE_API_URL`.

Crie um arquivo chamado `.env` na raiz do projeto com este conteúdo:

```
VITE_API_URL=https://6ae3c34a933120ae20f9270b.mockapi.io/api/v1
```

## Como executar o projeto

Ainda dentro da pasta do projeto, execute:

```
npm run dev
```

O projeto será executado em `http://localhost:5173`.

Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

Outros comandos úteis:

```
npm run build     # gera a versão de produção
npm run preview   # serve a versão de produção localmente
npm run lint      # verifica o código com o ESLint
```

## Back-end e API

O projeto **não possui back-end próprio**, então não há servidor para subir. Os dados vêm da API mockada no MockAPI, com os recursos:

| Recurso | Campos | Uso |
|---|---|---|
| `usuarios` | `email`, `senha` | login |


As matérias, anotações e o progresso do usuário são salvos no `localStorage` do navegador.

## Usuários e senhas para teste

O login é **simulado, para fins didáticos**: o app consulta o recurso `usuarios` da MockAPI e confere e-mail e senha no próprio front-end. Em um sistema real, essa validação seria feita no back-end.

| E-mail | Senha |
|---|---|
| teste@sprint.com | Shecodes@2026 |

Todas as páginas, exceto a landing page e o login, exigem estar logado. Sem login, o app redireciona para `/login`.

## Uso de Inteligência Artificial no projeto

As ferramentas de Inteligência Artificial foram utilizadas em pontos pontuais do desenvolvimento do projeto, principalmente para revisar erros de digitação no código e na documentação, além de auxiliar no entendimento de tecnologias que a equipe ainda não havia utilizado na prática anteriormente,  como o React Router DOM, necessárias para replicar o sistema proposto pela equipe, para o Challenge em parceiria com a JOVI, no React. O uso da IA serviu como apoio ao aprendizado e à revisão, e todo o código e conteúdo final foi escrito e validado pela equipe.


## Deploy (Vercel)

O projeto é publicado na Vercel a partir do repositório do GitHub. O arquivo `vercel.json` redireciona todas as rotas para o `index.html`, para que o React Router funcione ao recarregar a página, e a variável `VITE_API_URL` está configurada no painel da Vercel.

[Link do Deploy na Vercel](https://sprint-web3.vercel.app/)

---

Desenvolvido por:

Amanda Oliveira Lourenço - RM: 572572

Giovanna Lopes Scalzone - RM: 572285

Letícia Brandão Couto - RM: 569516

Nayra Sousa Duarte - RM: 573815

Paloma do Carmo Dantas - RM: 569995