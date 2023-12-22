import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CadastroDisciplina() {
  const [disciplina, setDisciplina] = useState({
    nome: '',
    requisito: '',
    horario: '',
    cargaHoraria: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://projeto-escolar-api.onrender.com/disciplinas', disciplina);

      console.log('Response:', response);

      if (response.status === 200) {
        // Cadastro bem-sucedido
        alert('Disciplina cadastrada!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);
    }
  };

  return (
    <div className="pagina-principal-container">
      <div className="pagina-principal-sidebar">
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/paginaPrincipal">Página Principal</Link>
          </li>
          <h2></h2>
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
          {/* Outros links aqui */}
        </ul>
      </div>
      <div className="pagina-principal-content">
        <h1>Cadastro de Disciplinas</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input type="text" name="nome" value={disciplina.nome} onChange={handleChange} required />
          <br />
          <label htmlFor="requisito">Requisito:</label>
          <input type="text" name="requisito" value={disciplina.requisito} onChange={handleChange} />
          <br />
          <label htmlFor="horario">Horário:</label>
          <input type="text" name="horario" value={disciplina.horario} onChange={handleChange} />
          <br />
          <label htmlFor="cargaHoraria">Carga Horária:</label>
          <input type="number" name="cargaHoraria" value={disciplina.cargaHoraria} onChange={handleChange} required />
          <br />

          <button type="submit">Cadastrar Disciplina</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroDisciplina;
