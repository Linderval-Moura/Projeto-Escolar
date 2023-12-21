import React from 'react';
import { Link } from 'react-router-dom';
import './cssComponents/PaginaPrincipal.css';

function PaginaPrincipal() {
  // Adicione aqui a lógica necessária para as ações dos botões

  return (
    <div className="pagina-principal-container">
      <div className="pagina-principal-sidebar">
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/cadastro-alunos">Cadastro de Alunos</Link>
          </li>
          <li>
            <Link to="/cadastro-professores">Cadastro de Professores</Link>
          </li>
          <li>
            <Link to="/cadastro-disciplinas">Cadastro de Disciplinas</Link>
          </li>
          <h2></h2>
          <li>
            <Link to="/">Sair e voltar para Login</Link>
          </li>
        </ul>
      </div>
      <div className="pagina-principal-content">
        {/* Conteúdo principal aqui */}
        <h1>Bem-vindo à Página Principal</h1>
        {/* Adicione mais conteúdo conforme necessário */}
      </div>
    </div>
  );
}

export default PaginaPrincipal;
