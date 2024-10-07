# UpClick - Gerenciador ToDo List

UpClick é um projeto de gerenciamento de tarefas (ToDo List) desenvolvido utilizando Vue 3, Vite, Pinia e Element-Plus. O projeto oferece uma interface moderna e responsiva para a criação, edição e exclusão de tarefas.

### 🖥️ Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript progressivo para a construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida e moderna para projetos web.
- **Pinia**: Biblioteca de gerenciamento de estado para Vue.
- **Element-Plus**: Biblioteca de componentes UI para Vue 3.
- **Storybook**: Ferramenta para documentação de componentes.
- **Firebase**: Utilizado para autenticação e persistência de dados.
    - **Firebase Authentication**: Gerencia a autenticação de usuários.
    - **Firebase Realtime Database**: Armazena e sincroniza dados em tempo real.
    - **Firebase Hosting**: Hospeda o projeto com segurança e desempenho.

#### 🗂️ Estrutura do Projeto
    .
    ├── components          # Componentes de interface
        ├── base            # Componentes Genéricos
        └── pages           # Componentes de Páginas
    ├── router              # Configuração de rotas
    ├── stores              # Configuração de estados globais
    ├── services            # Serviços de comunicação com a API Firebase
    └── views               # Páginas da aplicação

### ⚙️ Funcionalidades

- **Autenticação de Usuários**: Login e registro de usuários utilizando Firebase Authentication.
- **Recuperação de senha**: Recuperação de senha por e-mail, por meio do serviço firebase.
- **Gerenciamento de Tarefas**: Criação, edição e exclusão de tarefas.
- **Persistência de Dados**: As tarefas são armazenadas e sincronizadas em tempo real utilizando Firebase Realtime Database.
- **Interface Intuitiva**: Utilização de Element-Plus para uma interface de usuário amigável e responsiva.
- **Documentação de componentes**: Utilização do Storybook para documentação de componentes.

### ☁️ Hospedagem

O projeto está hospedado no Firebase Hosting, garantindo alta disponibilidade e desempenho.<br> 
E pode ser acessado através do link: [https://upclick-9f7f5.web.app/](https://upclick-9f7f5.web.app/).

#### 📝 Dados de Acesso

Para acessar, será necessário um email e senha válidos (previamente cadastrados). Abaixo, seguem três usuários criados apenas com o propósito de teste das funcionalidades do projeto:

```
1º Opção de usuário (já cadastrado):

email: upclick1@hotmail.com
senha: Andre12345678
```

```
2º  Opção de usuário (já cadastrado):
email: clickdown98@hotmail.com
senha: 12345678Andre
```

```
3º  Opção de usuário (já cadastrado):
email: clickcomup@hotmail.com
senha: Andre12345 
```

> Quando clicar na opção de recuperação de senha, coloque o email e senha acima no form apresentado e acesse a caixa de mensagens no [outlook.com](https://outlook.com): <br>


### 🚀 Como Executar o Projeto

1. No terminal clone o repositório.

```bash
$ git clone git@github.com:AndreNascimento1998/Up-Click.git
```

2. Acesse o site [https://firebase.google.com/](https://firebase.google.com/) clique em Vamos começar (Get Started).

3. Crie um projeto

4. Coloque um nome no projeto e clique em continuar.

5. Vá em Authentication e clique em Vamos Começar (Get Started).

6. Escolha em Provedores nativos, E-mail e senha e clique.

7. Ative a autenticação por e-mail e senha.

8. Clique em Usuário e adicione usuário (E-mail e senha).

9. Vá em criação Realtime Database e clique em Criar banco de dados.

10. Opção de banco padrão Us, Regras de segurança coloque iniciar modo de teste e ative. 

11. Na engrenagem do projeto vá em Configurações do projeto.

12. Na aba Geral, vá até a parte de suas aplicações e clique em adicionar aplicativo web.

13. Coloque um nome para o aplicativo e clique em registrar aplicativo.

14. Copie o código do SDK e cole no arquivo .env-example.

16. Renomeie o arquivo .env-example para .env.

17. No terminal instale as dependências do projeto.

```bash
$ npm install
```

18. No terminal execute o projeto.

```bash
$ npm run dev
```

19. Acesse o projeto em seu navegador.

```bash
http://localhost:5173
```

23. Logue com o usuário criado no Firebase e faça todas as operações disponíveis no projeto.

21. Para acessar o Storybook, execute o comando no terminal.

```bash
$ npm run storybook
```

22. Acesse o Storybook em seu navegador.

```bash
http://localhost:6006
```



### 📚 Decisões de Projeto

- **Vue 3 + composition API**: Utilização do Vue 3 e Composition API para facilitar a criação de componentes reutilizáveis e a manutenção do código.
- **Vite**: Ferramenta de build rápida e moderna para projetos web.
- **Typescript**: Utilização de Typescript para garantir tipagem estática e facilitar a manutenção do código.
- **Element-Plus**: Biblioteca de componentes UI para Vue 3, projetada para Vue 3 com melhor desempenho, suporte a TypeScript e uma comunidade ativa.
- **Firebase**: Oferece uma ampla gama de serviços integrados e suporte a dados em tempo real.
- **Storybook**: Ferramenta para documentação de componentes genérico da aplicação.
- **Firebase Hosting**: Hospeda o projeto com segurança e desempenho.
- **Responsividade**: Utilização de Grid Layout, Flexbox e componentes do Element-Plus para garantir uma interface responsiva.
- **Arquitetura**: A arquitetura atual foi escolhida para organizar o código de forma clara e eficiente. As `views` contêm o `index` do arquivo, servindo como ponto de entrada para as páginas. As `pages` são usadas para abstrair a lógica, mantendo o código mais limpo e organizado. A pasta `base` é destinada à criação de componentes genéricos reutilizáveis.

### ♻️ CI/CD

O projeto utiliza GitHub Actions para a crição de pipelines de CI/CD. Foi configurada a esteira para realizar a avaliação da estrutura de código e build nas aberturas, além de garantir um processo automatizado e seguro para o deploy.

> Esse fluxo, embora simples, garante que o código submetido esteja consistente e compilável.

**Fluxo 1: Abertura de PRs:**

- Avaliação de Estrutura de Dependências: Garante que todos os pacotes necessários para o build sejam instalados sem conflitos.
- Build: Execução do processo de build para verificar se o código compila corretamente.

**Fluxo 2: Merge com a Branch Master:**

- Avaliação de Estrutura de Dependências: Garante que todos os pacotes necessários para o build sejam instalados sem conflitos.
- Build: Execução do processo de build para verificar se o código compila corretamente.
- Deploy: Publicação dos artefatos em um ambiente de produção no Firebase Hosting.