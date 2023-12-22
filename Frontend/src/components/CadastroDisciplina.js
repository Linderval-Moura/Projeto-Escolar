import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CadastroDisciplina() {
  const [disciplina, setDisciplina] = useState({
    nome: '',
    requisito: '',
    horario: '',
    cargaHoraria: 0,
  });

  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showList) {
      // Carrega a lista de disciplinas ao montar o componente
      fetchDisciplinas();
    }
  }, [showList]);

  const fetchDisciplinas = async () => {
    try {
      const response = await axios.get('https://projeto-escolar-api.onrender.com/disciplinas');
      setDisciplinas(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de disciplinas:', error);
    }
  };

  const handleSelectDisciplina = async (id) => {
    try {
      const response = await axios.get(`https://projeto-escolar-api.onrender.com/disciplinas/${id}`);
      setSelectedDisciplina(response.data);
      setShowDetails(true);
      setShowList(false);
    } catch (error) {
      console.error('Erro ao obter detalhes da disciplina:', error);
    }
  };

  const handleDeleteDisciplina = async (id) => {
    try {
      const response = await axios.delete(`https://projeto-escolar-api.onrender.com/disciplinas/${id}`);
      console.log('Disciplina deletada:', response.data);
      // Atualiza a lista de disciplinas após a exclusão
      fetchDisciplinas();
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina((prevDisciplina) => ({ ...prevDisciplina, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://projeto-escolar-api.onrender.com/disciplinas', disciplina);

      console.log('Response:', response);

      if (response.status === 200) {
        // Cadastro bem-sucedido
        alert('Disciplina cadastrada!');
        // Atualiza a lista de disciplinas após o cadastro
        fetchDisciplinas();
        // Mostra a lista após o cadastro
        setShowList(true);
        // Limpa os dados da disciplina após o cadastro
        setDisciplina({
          nome: '',
          requisito: '',
          horario: '',
          cargaHoraria: 0,
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowList(false);
    setShowDetails(false);
  };

  const handleShowList = () => {
    setShowForm(false);
    setShowList(true);
    setShowDetails(false);
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
            <Link to="/cadastro-alunos">Cadastro de Alunos</Link>
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
        {showForm && (
          <form onSubmit={handleSubmit}>
            {/* Formulário de cadastro */}
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
            <input
              type="number"
              name="cargaHoraria"
              value={disciplina.cargaHoraria}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Cadastrar Disciplina</button>
            <button type="button" onClick={handleShowList}>
              Lista de Disciplinas
            </button>
          </form>
        )}

        {showList && (
          <>
            {/* Lista de disciplinas */}
            <h2>Lista de Disciplinas</h2>
            <ul>
              {disciplinas.map((disciplina) => (
                <li key={disciplina._id}>
                  {disciplina.nome} -{' '}
                  <button type="button" onClick={() => handleSelectDisciplina(disciplina._id)}>
                    Detalhes
                  </button>{' '}
                  <button type="button" onClick={() => handleDeleteDisciplina(disciplina._id)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleShowForm}>
              Voltar
            </button>
          </>
        )}

        {showDetails && (
          <>
            {/* Detalhes da disciplina */}
            <h2>Detalhes da Disciplina</h2>
            <p>Nome: {selectedDisciplina?.nome}</p>
            <p>Requisito: {selectedDisciplina?.requisito}</p>
            <p>Horário: {selectedDisciplina?.horario}</p>
            <p>Carga Horária: {selectedDisciplina?.cargaHoraria}</p>

            {/* Adicione outros detalhes conforme necessário */}
            <button type="button" onClick={handleShowList}>
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CadastroDisciplina;
