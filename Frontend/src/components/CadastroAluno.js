import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CadastroAlunos() {
    const [aluno, setAluno] = useState({
        nome: '',
        dataNascimento: '',
        idade: 0,
        cpf: '',
        rgIdentidade: '',
        nomePai: '',
        nomeMae: '',
        endereco: '',
        numEndereco: 0,
        cidade: '',
        estado: '',
        bairro: '',
        telefone: '',
        celular: '',
        alergia: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno({ ...aluno, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://projeto-escolar-api.onrender.com/alunos', aluno);

            console.log('Response:', response);

        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            // Exibir mensagem de erro ao usuário
        }
    };

    return (
        <div className="pagina-principal-container">
        <div className="pagina-principal-sidebar">
            <h2>Menu</h2>
            <ul>
            {/* Adicionar links conforme necessário */}
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
            <li>
                <Link to="/cadastro-frequencia">Cadastro de Frequência</Link>
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
            <form onSubmit={handleSubmit}>
                {/* Adicione campos do formulário conforme necessário */}
                <label htmlFor="nome">Nome:</label>
                <input 
                    type="text" 
                    name="nome" 
                    value={aluno.nome} 
                    onChange={handleChange} required 
                />
                <br />
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input type="date" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} required />
                <br />
                <label htmlFor="idade">Idade:</label>
                <input type="number" name="idade" value={aluno.idade} onChange={handleChange} required />
                <br />
                <label htmlFor="cpf">CPF:</label>
                <input type="text" name="cpf" value={aluno.cpf} onChange={handleChange} required />
                <br />
                {/* Outros campos do formulário aqui */}

                <button type="submit">Cadastrar Aluno</button>
            </form>
        </div>
        </div>
    );
}

export default CadastroAlunos;
