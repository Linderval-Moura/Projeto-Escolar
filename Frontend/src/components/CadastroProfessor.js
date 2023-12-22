import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function CadastroProfessor() {
  const [professor, setProfessor] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    graduacao: '',
    estadoCivil: '',
    endereco: '',
    numEndereco: 0,
    cidade: '',
    bairro: '',
    celular: '',
  });

  const [professores, setProfessores] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showList) {
      // Carrega a lista de professores ao montar o componente
      fetchProfessores();
    }
  }, [showList]);

  const fetchProfessores = async () => {
    try {
      const response = await axios.get('https://projeto-escolar-api.onrender.com/professores');
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de professores:', error);
    }
  };

  const handleSelectProfessor = async (id) => {
    try {
      const response = await axios.get(`https://projeto-escolar-api.onrender.com/professores/${id}`);
      setSelectedProfessor(response.data);
      setShowDetails(true);
      setShowList(false);
    } catch (error) {
      console.error('Erro ao obter detalhes do professor:', error);
    }
  };

  const handleDeleteProfessor = async (id) => {
    try {
      const response = await axios.delete(`https://projeto-escolar-api.onrender.com/professores/${id}`);
      console.log('Professor deletado:', response.data);
      // Atualiza a lista de professores após a exclusão
      fetchProfessores();
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor((prevProfessor) => ({ ...prevProfessor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://projeto-escolar-api.onrender.com/professores', professor);

      console.log('Response:', response);

      if (response.status === 200) {
        // Cadastro bem-sucedido
        alert('Professor cadastrado!');
        // Atualiza a lista de professores após o cadastro
        fetchProfessores();
        // Mostra a lista após o cadastro
        setShowList(true);
        // Limpa os dados do professor após o cadastro
        setProfessor({
          nome: '',
          dataNascimento: '',
          cpf: '',
          graduacao: '',
          estadoCivil: '',
          endereco: '',
          numEndereco: 0,
          cidade: '',
          bairro: '',
          celular: '',
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
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
            <Link to="/cadastro-alunos">Cadastro de Alunos</Link>
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
        <h1>Cadastro de Professores</h1>
        {showForm && (
          <form onSubmit={handleSubmit}>
            {/* Formulário de cadastro */}
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" value={professor.nome} onChange={handleChange} required />
            <br />
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={professor.dataNascimento}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="cpf">CPF:</label>
            <input type="text" name="cpf" value={professor.cpf} onChange={handleChange} required />
            <br />
            <label htmlFor="graduacao">Graduação:</label>
            <input type="text" name="graduacao" value={professor.graduacao} onChange={handleChange} />
            <br />
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <input type="text" name="estadoCivil" value={professor.estadoCivil} onChange={handleChange} />
            <br />
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" name="endereco" value={professor.endereco} onChange={handleChange} />
            <br />
            <label htmlFor="numEndereco">Número do Endereço:</label>
            <input
              type="number"
              name="numEndereco"
              value={professor.numEndereco}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" name="cidade" value={professor.cidade} onChange={handleChange} />
            <br />
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" name="bairro" value={professor.bairro} onChange={handleChange} />
            <br />
            <label htmlFor="celular">Celular:</label>
            <input type="text" name="celular" value={professor.celular} onChange={handleChange} />
            <br />
            <button type="submit">Cadastrar Professor</button>
            <button type="button" onClick={handleShowList}>
              Lista de Professores
            </button>
          </form>
        )}

        {showList && (
          <>
            {/* Lista de professores */}
            <h2>Lista de Professores</h2>
            <ul>
              {professores.map((professor) => (
                <li key={professor._id}>
                  {professor.nome} -{' '}
                  <button type="button" onClick={() => handleSelectProfessor(professor._id)}>
                    Detalhes
                  </button>{' '}
                  <button type="button" onClick={() => handleDeleteProfessor(professor._id)}>
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
            {/* Detalhes do professor */}
            <h2>Detalhes do Professor</h2>
            <p>Nome: {selectedProfessor?.nome}</p>
            <p>Data de Nascimento: {selectedProfessor ? format(new Date(selectedProfessor.dataNascimento), 'dd/MM/yyyy') : ''}</p>
            <p>CPF: {selectedProfessor?.cpf}</p>
            <p>Graduação: {selectedProfessor?.graduacao}</p>
            <p>Estado Civil: {selectedProfessor?.estadoCivil}</p>
            <p>Endereço: {selectedProfessor?.endereco}</p>
            <p>Número do Endereço: {selectedProfessor?.numEndereco}</p>
            <p>Cidade: {selectedProfessor?.cidade}</p>
            <p>Bairro: {selectedProfessor?.bairro}</p>
            <p>Celular: {selectedProfessor?.celular}</p>

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

export default CadastroProfessor;
