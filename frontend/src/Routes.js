import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Faq from './pages/Faq';
import Loja from './pages/Loja';
import ProdutoDetails from './pages/ProdutoDetails';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import MinhaConta from './pages/MinhaConta';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import TrocasEDevolucoes from './pages/TrocasEDevolucoes';

import { ProtectedRoute } from './components/ProtectedRoute';
import PedidoDetails from './pages/PedidoDetails';
import VerificarEmail from './pages/VerificarEmail';
import ConfirmarEmail from './pages/ConfirmarEmail';
import SolicitarRedefinicao from './pages/EsqueciSenha/SolicitarRedefinicao';
import RedefinirSenha from './pages/EsqueciSenha/RedefinirSenha';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/sobre" Component={Sobre} />
        <Route path="/contato" Component={Contato} />
        <Route path="/perguntas" Component={Faq} />
        <Route path="/login" Component={Login} />
        <Route path="/esqueci-senha" Component={SolicitarRedefinicao} />
        <Route path="/redefinir-senha" Component={RedefinirSenha} />
        <Route path="/cadastro" Component={Cadastro} />
        <Route path="/cadastro/verificar-email" Component={VerificarEmail} />
        <Route path="/confirmar-email" Component={ConfirmarEmail} />
        <Route path="/loja" Component={Loja} />
        <Route path="/pedido/:id" Component={PedidoDetails} />
        <Route path="/produto/:id" Component={ProdutoDetails} />
        <Route path="/politica-privacidade" Component={PoliticaPrivacidade} />
        <Route path="/trocas-e-devolucoes" Component={TrocasEDevolucoes} />

        <Route path="/carrinho" element={
          <ProtectedRoute>
            <Carrinho /> 
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <MinhaConta /> 
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard /> 
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    );
}

export default Routas;
