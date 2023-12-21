import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginCadastro from "../components/LoginCadastro.js";
import CadastroUsuario from "../components/CadastroUsuario.js";
import RecuperarSenha from '../components/RecuperarSenha';
import PaginaPrincipal from '../components/PaginaPrincipal';
import CadastroAluno from "../components/CadastroAluno";
import CadastroProfessor from "../components/CadastroProfessor";
// import CadastroDisciplina from "../components/CadastroDisciplina";
// import CadastroFrequencia from "../components/CadastroFrequencia";
// import CadastroProgramacao from "../components/CadastroProgramacao";
// import CadastroTurma from "../components/CadastroTurma";


export const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/paginaPrincipal" element={<PaginaPrincipal />} />
        <Route path="/cadastro-alunos" element={<CadastroAluno />} />
        <Route path="/cadastro-professores" element={<CadastroProfessor />} />
        {/*<Route path="/cadastro/disciplina" element={<CadastroDisciplina />} /> */}
        
        {/* Adicionar mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
};
