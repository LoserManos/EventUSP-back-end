# EventUSP - Front-end

O EventUSP é o aplicativo mobile de uma rede social voltada para a divulgação, descoberta e engajamento em eventos universitários. Desenvolvido em React Native com o ecossistema Expo, o aplicativo permite que os estudantes visualizem a programação, confirmem presença e interajam com a comunidade.

## Requisitos de Ambiente

Para executar este projeto localmente, você precisa ter as seguintes ferramentas instaladas em seu sistema operacional:

* **Node.js**: Versão 22.x LTS (ou superior)
* **NPM**: Versão 10.x (ou gerenciador compatível através do FNM/NVM)
* **Expo Go**: Aplicativo atualizado em seu dispositivo móvel SDK versão 55
* **Android Studio**: Opcional, caso prefira rodar através de um emulador virtual em vez de um celular físico.

## Instruções de Instalação e Execução

Siga as etapas abaixo a partir do seu terminal para configurar e iniciar o projeto:

### 1. Clonar o repositório e acessar o diretório
```bash
git clone git@github.com:LoserManos/EventUSP-back-end.git
cd EventUSP-back-end/front-end
```

### 2. Instalar as dependências do Node
Após intastalar os requisitos de ambiente, Certifique-se de que os arquivos de configuração (`package.json`) estão na raiz do diretório atual e execute:
```bash
npm install
```

### 3. Inicializar o servidor de desenvolvimento do Expo
Para iniciar o empacotador de arquivos e gerar o painel de controle do projeto, execute:
```bash
npx expo start
```
Se precisar limpar o cache de inicializações anteriores, utilize a flag de limpeza:
```bash
npx expo start -c
```

### 4. Executar o aplicativo no dispositivo

* **No celular físico:** Abra o aplicativo Expo Go no seu smartphone e escaneie o código QR exibido no terminal.
* **No emulador Android:** Com o emulador do Android Studio previamente aberto, pressione a tecla `a` no terminal onde o Expo está rodando para que a instalação ocorra automaticamente.

## Conexão com o Backend

O aplicativo consome uma API REST construída em FastAPI. A configuração da URL base deve ser ajustada exclusivamente no arquivo centralizador de requisições localizado em `src/services/api.ts`.
