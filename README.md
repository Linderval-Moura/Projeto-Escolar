# Projeto Escolar

Este é um projeto de um sistema escolar com funcionalidades para o cadastro de alunos, professores, disciplinas e usuários, além de autenticação, recuperação de senha e upload de arquivos. A aplicação é dividida em duas partes principais: o **Backend** e o **Frontend**.

## Estrutura do Projeto

### Backend
A pasta do backend contém a lógica principal do servidor, incluindo rotas, conexões com o banco de dados e manipulação de arquivos.

```
Backend/
├── src/
│   ├── uploads/                # Diretório para armazenar os arquivos carregados
│   ├── server.js               # Arquivo principal do servidor
│   ├── .gitignore              # Arquivo para ignorar arquivos no controle de versão
│   ├── eng.traineddata         # Arquivo do Tesseract para reconhecimento de texto em inglês
│   ├── index.html              # Página HTML principal para o backend
│   ├── index.js                # Arquivo de inicialização do backend
│   └── por.traineddata         # Arquivo do Tesseract para reconhecimento de texto em português
├── package-lock.json           # Dependências do backend
├── package.json                # Configuração e dependências do backend
└── .env                        # Variáveis de ambiente (como a conexão com o MongoDB)
```

### Frontend
A pasta do frontend contém o código da interface do usuário. O projeto é baseado em React e inclui componentes reutilizáveis, rotas e estilo.

```
Frontend/
├── public/
│   ├── favicon.ico             # Ícone do site
│   ├── index.html              # Página HTML principal
│   ├── logo192.png             # Logo para resolução 192px
│   ├── logo512.png             # Logo para resolução 512px
│   ├── manifest.json           # Configurações do manifest do PWA
│   └── robots.txt              # Configuração de SEO
├── src/
│   ├── components/             # Componentes reutilizáveis da interface
│   │   ├── CadastroAluno.js    # Componente para cadastro de alunos
│   │   ├── CadastroDisciplina.js # Componente para cadastro de disciplinas
│   │   ├── CadastroProfessor.js  # Componente para cadastro de professores
│   │   ├── CadastroUsuario.js   # Componente para cadastro de usuários
│   │   ├── LoginCadastro.js     # Componente para login e cadastro
│   │   ├── PaginaPrincipal.js   # Componente da página principal
│   │   ├── RecuperarSenha.js    # Componente para recuperação de senha
│   ├── hooks/                  # Hooks customizados
│   │   └── use-saveDate.js      # Hook para salvar dados
│   ├── routes/                 # Arquivo de rotas
│   │   └── routers.js           # Arquivo de definição de rotas
│   ├── App.css                 # Estilos principais da aplicação
│   ├── App.js                  # Arquivo principal do React
│   ├── App.test.js             # Testes da aplicação
│   ├── index.css               # Estilos globais
│   ├── index.js                # Ponto de entrada da aplicação React
│   ├── logo.svg                # Logo em formato SVG
│   ├── main.js                 # Ponto de inicialização do React
│   ├── reportWebVitals.js      # Relatório de métricas da aplicação
│   ├── setupTests.js           # Configuração de testes
│   └── vite.config.js          # Configurações do Vite
├── .gitignore                  # Arquivo para ignorar arquivos no controle de versão
├── package-lock.json           # Dependências do frontend
├── package.json                # Configuração e dependências do frontend
└── eslintrc.cjs                # Configuração do ESLint
```

## Funcionalidades

### Backend

- **Cadastro de usuários**: Permite o registro de novos usuários, com verificação de email duplicado.
- **Login de usuários**: Permite que usuários existentes façam login.
- **Recuperação de senha**: Geração de token para recuperação de senha.
- **Cadastro e manipulação de alunos**: Permite cadastrar, atualizar e excluir alunos.
- **Upload de arquivos**: Utiliza o `multer` para gerenciar uploads de imagens e documentos.
- **OCR com Tesseract.js**: Utiliza a biblioteca Tesseract.js para realizar OCR em imagens.

### Frontend

- **Interface de cadastro e login**: Permite que os usuários cadastrem-se, façam login e recuperem senhas.
- **Páginas de gerenciamento de alunos**: Tela para adicionar, editar e excluir alunos.
- **Componentes reutilizáveis**: Componentes modulares para facilitar a manutenção e reutilização de código.

## Como Rodar o Projeto

### Backend

1. Instale as dependências do backend:

   ```bash
   cd Backend
   npm install
   ```

2. Crie um arquivo `.env` com as variáveis de ambiente necessárias, como a conexão com o banco de dados MongoDB. Exemplo:

   ```
   CONNECTIONSTRING=mongodb://localhost:27017/projeto-escolar
   JWT_SECRET=seu-segredo-de-token
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. Instale as dependências do frontend:

   ```bash
   cd Frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse a aplicação no seu navegador em [http://localhost:3000](http://localhost:3000).

## Tecnologias Utilizadas

### Backend

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criar APIs.
- **Mongoose**: ORM para MongoDB.
- **Multer**: Middleware para manipulação de arquivos.
- **Tesseract.js**: Biblioteca de OCR para extração de texto de imagens.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários.
- **CORS**: Para habilitar requisições entre origens diferentes.

### Frontend

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build para React.
- **CSS**: Estilização da interface.

## Contribuição

Contribuições são bem-vindas! Para contribuir, siga os seguintes passos:

1. Fork este repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b feature/nome-da-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Faça push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob licença. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.