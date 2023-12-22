import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno({ ...aluno, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://projeto-escolar-api.onrender.com/alunos', aluno);

            console.log('Response:', response);

            if (response.status === 200) {
                // Cadastro bem-sucedido
                alert('Aluno cadastrado!');
            }

        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
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
            <h1>Cadastro de Alunos</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" value={aluno.nome} onChange={handleChange} required />
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
                <input type="number" name="numEndereco" value={aluno.numEndereco} onChange={handleChange} />
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
            </form>
        </div>
        </div>
    );
}

export default CadastroAlunos;
