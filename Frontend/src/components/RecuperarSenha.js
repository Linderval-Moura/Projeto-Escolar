// RecuperarSenha.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './cssComponents/LoginCadastroCSS.css'; // Importe seu arquivo CSS

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para recuperar senha no backend (substituir com a chamada real à API)
    try {
      // Substituir 'url_do_backend/recuperar-senha' com a URL real para recuperar senha
      const response = await axios.post('http://localhost:3001/usuarios/recuperar-senha', {
        email,
      });

      if (response.status === 200) {
        setSucesso(true);
      }
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      setErro(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <br />
          <button type="submit">Recuperar Senha</button>
        </form>
        {sucesso && <p className="sucesso-recuperacao">Um email foi enviado com instruções para recuperar sua senha.</p>}
        {erro && <p className="erro-recuperacao">Erro ao processar. Verifique se o email está correto. Ou cadastre-se novamente.</p>}
        <p>
          Voltar para a página de{' '}
          <Link to="/">login</Link>.
        </p>
      </div>
    </div>
  );
}

export default RecuperarSenha;
