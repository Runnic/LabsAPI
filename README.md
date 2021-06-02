# Labs API

Projeto desenvolvido para seleção da **WA Project**.  
O projeto consiste em uma restAPI que cadastre laboratórios e exames em **lote** e relacione esses dois se necessário.  
Desenvolvi esse projeto utilizando [Typescript](https://www.typescriptlang.org/) com o serviço em nuvem de banco de dados 
[MongoDB Atlas](https://www.mongodb.com/) e arquitetura **DDD (Domain-Driven Design)**.  
Também utilizei o [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) para manter uma boa organização de código.

### Acessando a API.

A API está hospedada no serviço de Cloud **Heroku**: [LabsAPI](https://labs-api-wa-project.herokuapp.com/)   
Para testar a API recomendo utilizar a ferramenta [Insominia](https://insomnia.rest/download).
Acesse o seguinte **botão** para importar a **coleção** do Insominia com todas as rotas já configuradas:  

[![Execute no Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Labs%20API&uri=https%3A%2F%2Flabs-api-wa-project.herokuapp.com%2Finsomnia-download)

Ou se preferir baixe o arquivo [insomnia.json](https://labs-api-wa-project.herokuapp.com/insomnia-download).

#### Documentação

A documentação foi gerada através do plugin [Insomnia Documenter](https://github.com/jozsefsallai/insomnia-documenter) e pode ser acessada [aqui.](https://labs-api-wa-project.herokuapp.com/docs/)
### Executando Localmente:

O projeto ja está pronto para ser executado localmente seguindo uma das duas opções abaixo (Docker ou Yarn).

Se achar necessário é possivel configurar um **link** de acesso do [MongoDB Atlas](https://www.mongodb.com/) apenas criando um arquivo **.env** na raiz do projeto e inserindo a seguinte linha:

> MONGODB_ATLAS_CONNECTION_URL= _Seu link de acesso do MongoDB Atlas_

Caso não configure o projeto utilizara um link de acesso pré-configurado.

Precisando alguma credêncial entre em contato comigo pelo email: <ph.luna.vieira@gmail.com>

#### Docker

Para executar localmente utilizando o **Docker** é necessário ter [Docker](https://www.docker.com/) e o [Docker Composer](https://docs.docker.com/compose/)
instalados e configurados em seu sistema.   
Verifique se a porta **:7777** está disponível e em seguida acesse a pasta raíz do projeto e execute o comando:

```bash
    yarn docker
``` 

E acesse normalmente através do link http://localhost:7777/.   

**\*Obs:** O container gerado contem uma versão de desenvolvimento apenas e irá funcionar exatamente como um servidor de desenvolvimento. 

---
#### Yarn

Para executar localmente utilizando o método tradicional é necessário ter instalado o [Node.JS](https://nodejs.org) no seu computador e o gerenciador de pacotes [Yarn](https://yarnpkg.com/).
Em seguida execute o seguinte comando no terminal do seu SO na **pasta raiz do projeto** para instalar todas as dependências:

```bash
yarn
```

E ems seguida execute o seguinte comando para iniciar um servidor de desenvolvimento:

```bash
yarn dev
```

E acesse normalmente através do link http://localhost:7777/.  

---
### Gerando Build

Esse projeto utiliza [Typescript](https://www.typescriptlang.org/) como linguagem de desenvolvimento portanto é necessário transpilar o código para Javascript se for executar o projeto em algum ambiente que não reconheça Typescript.
Por isso configurei o transpilador [BabelJs](https://babeljs.io/).

Para transpilar apenas digite o seguinte comando no terminal do seu SO:

```bash
yarn build
```

Esse comando ira gerar uma pasta chamada **"Dist"** na raiz do projeto com o código transpilado para **Javascript**.

Em seguida apenas execute o seguinte comando para executar localmente:

```bash
yarn start
```

E acesse normalmente através do link http://localhost:7777/.  