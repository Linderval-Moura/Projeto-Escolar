import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor({ ...professor, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://projeto-escolar-api.onrender.com/professores', professor);

            console.log('Response:', response);

            if (response.status === 200) {
                // Cadastro bem-sucedido
                alert('Professor cadastrado!');
            }

        } catch (error) {
            console.error('Erro ao cadastrar professor:', error);
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" value={professor.nome} onChange={handleChange} required />
                    <br />
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input type="date" name="dataNascimento" value={professor.dataNascimento} onChange={handleChange} required />
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
                    <input type="number" name="numEndereco" value={professor.numEndereco} onChange={handleChange} />
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
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor;
