// Importe as bibliotecas necessárias
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from "react-router-dom";
import './cssComponents/LoginCadastroCSS.css';

function LoginCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState(false); // Novo estado para controlar a mensagem de erro
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para verificar login no backend (substituir com a chamada real à API)
    try {
      // Substituir 'url_do_backend/login' com a URL real de autenticação
      const response = await axios.post('http://localhost:3001/usuarios/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        // Login bem-sucedido, redirecionar para a página principal
        history.push('/paginaPrincipal');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErroLogin(true); // Definir o estado para true em caso de erro
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Tela de Login e Cadastro</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        {/* Exibir a mensagem de erro se o login falhar */}
        {erroLogin && <p className="erro-login">Erro ao fazer login. Verifique suas credenciais.</p>}
        <p>
          Ainda não tem uma conta?{' '}
          <Link to="/cadastrousuario">Cadastre-se aqui</Link>.
        </p>
        <p>
          Esqueceu sua senha?{' '}
          <Link to="/recuperar-senha">Recupere aqui</Link>.
        </p>
      </div>
    </div>
  );
}

export default LoginCadastro;
