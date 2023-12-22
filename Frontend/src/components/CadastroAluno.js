import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function CadastroAlunos() {
  const [aluno, setAluno] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    nomePai: '',
    nomeMae: '',
    endereco: '',
    numEndereco: 0,
    cidade: '',
    bairro: '',
    celular: '',
    alergia: '',
  });

  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showList) {
      // Carrega a lista de alunos ao montar o componente
      fetchAlunos();
    }
  }, [showList]);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('https://projeto-escolar-api.onrender.com/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de alunos:', error);
    }
  };

  const handleSelectAluno = async (id) => {
    try {
      const response = await axios.get(`https://projeto-escolar-api.onrender.com/alunos/${id}`);
      setSelectedAluno(response.data);
      setShowDetails(true);
      setShowList(false);
    } catch (error) {
      console.error('Erro ao obter detalhes do aluno:', error);
    }
  };

  const handleDeleteAluno = async (id) => {
    try {
      const response = await axios.delete(`https://projeto-escolar-api.onrender.com/alunos/${id}`);
      console.log('Aluno deletado:', response.data);
      // Atualiza a lista de alunos após a exclusão
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prevAluno) => ({ ...prevAluno, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://projeto-escolar-api.onrender.com/alunos', aluno);

      console.log('Response:', response);

      if (response.status === 200) {
        // Cadastro bem-sucedido
        alert('Aluno cadastrado!');
        // Atualiza a lista de alunos após o cadastro
        fetchAlunos();
        // Mostra a lista após o cadastro
        setShowList(true);
        // Limpa os dados do aluno após o cadastro
        setAluno({
          nome: '',
          dataNascimento: '',
          cpf: '',
          nomePai: '',
          nomeMae: '',
          endereco: '',
          numEndereco: 0,
          cidade: '',
          bairro: '',
          celular: '',
          alergia: '',
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
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
        <h1>Cadastro de Alunos</h1>
        {showForm && (
          <form onSubmit={handleSubmit}>
            {/* Formulário de cadastro */}
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" value={aluno.nome} onChange={handleChange} required />
            <br />
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={aluno.dataNascimento}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="idade">Idade:</label>
            <input type="number" name="idade" value={aluno.idade} onChange={handleChange} required />
            <br />
            <label htmlFor="cpf">CPF:</label>
            <input type="text" name="cpf" value={aluno.cpf} onChange={handleChange} required />
            <br />
            <label htmlFor="nomePai">Nome do Pai:</label>
            <input type="text" name="nomePai" value={aluno.nomePai} onChange={handleChange} />
            <br />
            <label htmlFor="nomeMae">Nome da Mãe:</label>
            <input type="text" name="nomeMae" value={aluno.nomeMae} onChange={handleChange} />
            <br />
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" name="endereco" value={aluno.endereco} onChange={handleChange} />
            <br />
            <label htmlFor="numEndereco">Número do Endereço:</label>
            <input
              type="number"
              name="numEndereco"
              value={aluno.numEndereco}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" name="cidade" value={aluno.cidade} onChange={handleChange} />
            <br />
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" name="bairro" value={aluno.bairro} onChange={handleChange} />
            <br />
            <label htmlFor="celular">Celular:</label>
            <input type="text" name="celular" value={aluno.celular} onChange={handleChange} />
            <br />
            <label htmlFor="alergia">Alergia:</label>
            <input type="text" name="alergia" value={aluno.alergia} onChange={handleChange} />
            <br />
            {/* Outros campos do formulário aqui */}
            <button type="submit">Cadastrar Aluno</button>
            <button type="button" onClick={handleShowList}>
              Lista de Alunos
            </button>
          </form>
        )}

        {showList && (
          <>
            {/* Lista de alunos */}
            <h2>Lista de Alunos</h2>
            <ul>
              {alunos.map((aluno) => (
                <li key={aluno._id}>
                  {aluno.nome} -{' '}
                  <button type="button" onClick={() => handleSelectAluno(aluno._id)}>
                    Detalhes
                  </button>{' '}
                  <button type="button" onClick={() => handleDeleteAluno(aluno._id)}>
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
            {/* Detalhes do aluno */}
            <h2>Detalhes do Aluno</h2>
            <p>Nome: {selectedAluno?.nome}</p>
            <p>Data de Nascimento: {selectedAluno ? format(new Date(selectedAluno.dataNascimento), 'dd/MM/yyyy') : ''}</p>
            <p>CPF: {selectedAluno?.cpf}</p>
            <p>Nome do Pai: {selectedAluno?.nomePai}</p>
            <p>Nome da Mãe: {selectedAluno?.nomeMae}</p>
            <p>Endereço: {selectedAluno?.endereco}</p>
            <p>Número do Endereço: {selectedAluno?.numEndereco}</p>
            <p>Cidade: {selectedAluno?.cidade}</p>
            <p>Bairro: {selectedAluno?.bairro}</p>
            <p>Celular: {selectedAluno?.celular}</p>
            <p>Alergia: {selectedAluno?.alergia}</p>

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

export default CadastroAlunos;
