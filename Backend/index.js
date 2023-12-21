require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const moment = require('moment');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:3000',
                        'https://projeto-escolar-eta.vercel.app', 
                        'https://projeto-escolar-eta.vercel.app/cadastrousuario',
];

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

// Conexão com o MongoDB
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Base de dados conectada!');
    app.emit('pronto');
  })
  .catch(e => console.log(e)
);

// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar o multer para lidar com uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const { parseISO, format } = require('date-fns'); 

// // Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "src/public")));


// Esquema para a tabela de usuários
const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  token: String,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

const jwt = require('jsonwebtoken');

// Endpoint para cadastrar um novo usuário (registro)
app.post('/usuarios/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Novo usuário
    const novoUsuario = new Usuario({ nome, email, senha });

    // Gera um token para o usuário (este token será necessário para recuperar a senha)
    const token = jwt.sign({ userId: usuarioSalvo._id }, process.env.JWT_SECRET); // 'never' significa que o token não expira

    // Salva o token no usuário
    novoUsuario.token = token;

    // Salva o usuário no banco de dados
    const usuarioSalvo = await novoUsuario.save();

    res.status(200).json({ usuario: usuarioSalvo, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});


// Endpoint para realizar o login
app.post('/usuarios/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email, senha }); // Verifique se o usuário existe e se a senha está correta

    if (usuario) {
      // Aqui você pode gerar um token JWT para autenticação
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});


// Endpoint para recuperar a senha
app.post('/usuarios/recuperar-senha', async (req, res) => {
  try {
    const { email } = req.body;

    // Verifique se o e-mail está cadastrado
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'E-mail não cadastrado' });
    }

    // Gere um token de recuperação de senha (você pode usar bibliotecas como jsonwebtoken para isso)
    const token = 'token_gerado_pelo_backend';

    // Envie o token para o e-mail do usuário (você pode usar bibliotecas como nodemailer para isso)
    // Aqui estou apenas simulando o envio de token no console
    console.log(`Token de recuperação de senha: ${token}`);

    return res.status(200).json({ message: 'Token enviado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao processar a recuperação de senha' });
  }
});


// Esquema para a tabela de alunos
const AlunoSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: Date,
  cpf: String,
  nomePai: String,
  nomeMae: String,
  endereco: String,
  numEndereco: Number,
  cidade: String,
  bairro: String,
  celular: String,
  alergia: String,
});

const Aluno = mongoose.model('Aluno', AlunoSchema);

// Endpoint para cadastrar um novo aluno
app.post('/alunos', async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    const alunoSalvo = await novoAluno.save();
    res.status(200).json(alunoSalvo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar aluno' });
  }
});

// Endpoint para atualizar informações de um aluno
app.put('/alunos/:id', async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(alunoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar aluno' });
  }
});

// Endpoint para deletar um aluno
app.delete('/alunos/:id', async (req, res) => {
  try {
    const alunoDeletado = await Aluno.findByIdAndDelete(req.params.id);
    res.status(200).json(alunoDeletado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar aluno' });
  }
});

// Esquema para a tabela de professores
const ProfessorSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: Date,
  cpf: String,
  graduacao: String,
  estadoCivil: String,
  endereco: String,
  numEndereco: Number,
  cidade: String,
  bairro: String,
  celular: String,
});

const Professor = mongoose.model('Professor', ProfessorSchema);

// Endpoint para cadastrar um novo professor
app.post('/professores', async (req, res) => {
  try {
    const novoProfessor = new Professor(req.body);
    const professorSalvo = await novoProfessor.save();
    res.status(200).json(professorSalvo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar professor' });
  }
});

// Endpoint para atualizar informações de um professor
app.put('/professores/:id', async (req, res) => {
  try {
    const professorAtualizado = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(professorAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar professor' });
  }
});

// Endpoint para deletar um professor
app.delete('/professores/:id', async (req, res) => {
  try {
    const professorDeletado = await Professor.findByIdAndDelete(req.params.id);
    res.status(200).json(professorDeletado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar professor' });
  }
});


// Rotas
app.on('pronto', () => {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
  });
});