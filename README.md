<h1 align="center" >
  <img alt="happy" title="happy" src="./front-end/src/images/Logo.svg" />
</h1>

<p align="center">Leve felicidade para o mundo, visite orfanatos e mude o dia de muitas crianças. NLW#3</p>

<h4 align="center"> 
	🚧  ReadMe em construção...  🚧
</h4>

<p align="center">
 <a href="#-sobre">Sobre</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-executando-o-happy">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autora">Autora</a> 
</p>

---

## 💡 Sobre

Essa aplicação permite que, se você faz parte de um orfanato, cadastre ele no mapa e caso você queira visitar um orfanato e fazer o dia de muitas crianças mais feliz, este é o lugar que vai encontrar os orfanatos mais perto de você, na cidade do Rio de Janeiro.

Este projeto foi construído durante a terceira edição do evento Next Level Week da [Rocketseat](https://rocketseat.com.br/).

---

## 🎨 Layout


### Web

<p align="center">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/landing.png" width="1000px">

  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/map.png" width="1000px">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/create-orphanage.png" width="1000px">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/orfanato-criado.png" width="1000px">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/acesso-restrito.png" width="1000px">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/adminpanel1.png" width="1000px">
  <img alt="Happy Web" title="Happy Web" src="./ReadmeImages/adminpanel2.png" width="1000px">
</p>

---

## 💻 Executando o Happy

### Pré-requisitos

É necessário ter instalado na sua máquina para execução desse projeto:
- NodeJS
- Gerenciador de pacotes (Npm ou Yarn) 

> Em breve mais detalhes...

### ♊ Clonando o Repositório

```bash

$ git clone https://github.com/johnldev/happy

# entre na pasta do projeto

$ cd happy

```
### 💻 Rodando o Happy web

Entre na pasta

```bash

$ cd front-end

```
Instale as dependências

```bash

$ yarn

# ou, caso use npm

$ npm install

```

Rode a aplicação

```bash

$ yarn start

# ou, caso use npm

$ npm start

```

Caso você tenha uma conta no [mapbox](https://www.mapbox.com/), pode usar seu token para utilizar o mapa da aplicação. No entanto, se você não quiser 
ter este trabalho, sem problemas, por padrão já tem um mapa configurado para uso.

Caso queira, vá para a seção do <a href="#-mapbox">Mapbox</a>.

### 🌐 Rodando o Servidor

### Antes de começar

1. Instale o postgresSQL localmente(Não recomendado) ou através do docker(Recomendado);
  *  Caso opte por instalar o docker este é um tutorial de instalação para todos os sistemas operacionais;

  [![Docker](https://www.ortussolutions.com/__media/logos/docker.png)](https://www.notion.so/Instala-o-do-Docker-8230846ae2c547b2988f2aca91fc1edf)


3. Com o docker instalado será necessário criar um container para isso devemos digitar no terminal:
`docker run --name nome_do_container -e POSTGRES_PASSWORD=senha_que_será_usada_no_.env -p 5432:5432  -d postgres`
o retorno será o nome do container caso o comando tenha sucesso;
4. Com o container criado, o proximo passo é acessar o banco de dados através de um software de sua escolha(recomendo dbeaver) e criar uma database e guarde o nome pois ele será utilizado no .env
5. Agora com o repositório clonado você deverá criar um arquivo .env na raiz do projeto utilizando como exemplo o arquivo .env-exemple;
6. Instale as dependências utilizando o npm ou o yarn: `npm install` ou ` yarn`;
7. Vamos rodar as migrações para deixar seu banco de dados no formato correto, digite no console:
 `yarn typeorm migration:run` ou `npm run dev:server` e todas as migrações devem ser rodadas e está tudo pronto para os testes.
8. Por ultimo, é só iniciar a api digitando no console:`yarn dev:server` ou `npm run dev:server

### 📱 Rodando o Happy mobile 

> Em breve...

<br>

Se tudo deu certo, o app deve estar disponível agora! 👩‍🔧

---

## 🗺 Mapbox

Siga as instruções para usar o mapbox no lugar do openstreetmap.

- Em "https://account.mapbox.com/", copie seu token.
- Na raiz do projeto crie um arquivo chamado ".env"
- Dentro desse arquivo, digite "REACT_APP_MAPBOX_TOKEN =" e cole seu token logo depois.
- Entre no arquivo "OrphanagesMap.tsx", descomente o trecho de código correspondente as linhas 34, 35 e 36.
- No mesmo arquivo, comente a linha 32.

Se você fez tudo corretamente, estás usando a API do mapbox com seu Token na página do mapa. 😄

---

## 🛠️ Tecnologias

As ferramentas usadas no desenvolvimento do projeto.

#### Backend:
> Em breve...

#### Web
- Typescript
- ReactJS ⚛️
- React Router Dom
- React Icons
- Leaflet 🍃
- API do Mapbox 🗺️

#### Mobile:
> Em breve...

---
