// Importe as bibliotecas necessárias
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './cssComponents/LoginCadastroCSS.css'; // Importe seu arquivo CSS

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroCadastro, setErroCadastro] = useState(false); // Novo estado para controlar a mensagem de erro
  const navigate = useNavigate();

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para cadastrar usuário no backend (substituir com a chamada real à API)
    try {
      // Substituir 'url_do_backend/cadastro' com a URL real de cadastro
      const response = await axios.post('https:/projeto-escolar-api.onrender.com/usuarios/cadastro', {
      nome,
      email,
      senha,
      });
  
      console.log('Response:', response);

      if (response.status === 200) {
        // Cadastro bem-sucedido, redirecionar para a página principal
        alert('Cadastro bem-sucedido! Faça o Login');
        navigate('/');
      }

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      if (error.response) {
        // O servidor respondeu com um status de erro
        if (error.response.status === 400) {
          // Código de erro 400: Bad Request
          alert('E-mail já cadastrado! Recupere sua senha ou use outro e-mail!');
        }

      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        alert('Erro na comunicação com o servidor. Tente novamente mais tarde.');
      }

      setErroCadastro(true); // Definir o estado para true em caso de erro
    }
  };


  return (
    <div className="cadastro-container">
      <div className="cadastro-content">
        <h1>Tela de Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={handleNomeChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <br />
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
        {/* Exibe a mensagem de erro se o cadastro falhar */}
        {erroCadastro && <p className="erro-cadastro">Erro ao cadastrar usuário. Verifique os dados informados.</p>}
        <p>
          Já tem uma conta?{' '}
          <Link to="/">Faça login aqui</Link>.
        </p>
      </div>
    </div>
  );
}

export default CadastroUsuario;
