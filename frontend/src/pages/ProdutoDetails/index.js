import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import api from '../../hooks/useApi';

import Header from '../Componentes/Header';
import AvaliacaoForm from '../Componentes/AvaliaçãoForm';
import Footer from '../Componentes/Footer';

import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import whatsapp from '../../utils/redes/whatsapp-logo-white.png';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './ProdutoDetails.css';

const ProdutoDetails = () => {
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const { id } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    getProduto();
    getAvaliacoes();
    // eslint-disable-next-line
  }, [id]);

  const aumentar = () => setQuantidade(q => q + 1);
  const diminuir = () => setQuantidade(q => (q > 1 ? q - 1 : 1));

  const adicionarAoCarrinho = () => {
    navigate('/carrinho')
  };

  const compartilharNoWhatsApp = () => {
    const url = window.location.href;
    const mensagem = `Confira esse produto que achei na InfinityCell Store: ${produto.nome} - R$ ${produto.preco}\n${url}`;
    const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  const renderEstrelas = (media) => {
    const estrelas = [];
  
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        i <= Math.floor(media)
          ? <IoIosStar key={i} color="#ffc107" style={{ marginRight: '5' }} />
          : <IoIosStarOutline key={i} color="#555" style={{ marginRight: '5'}} />
      );
    }
  
    return estrelas;
  };

  const getAvaliacoes = async () => {
    try {
      const response = await api.get(`/avaliacoes/${id}`);
      setAvaliacoes(response.data);
    } catch (error) {
      console.log("Erro ao lsitar avaliações", error);
    }
  };

  const delAvaliacao = async (avaliacaoId) => {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: 'Você tem certeza que deseja excluir sua avaliação?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              await api.delete(`/avaliacoes/del/${avaliacaoId}`);
              getAvaliacoes();
              console.log('apagado id:', avaliacaoId)
            } catch (error) {
              console.log("Erro ao apagar a avaliação:", error);
            }
          }
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    });
  };

  const adicionarAvaliacao = () => {
    getAvaliacoes();
  };

  if (!produto) return <div>Produto não encontrado</div>;

  return (
    <div className='detalhes'>
      <Header />

      <div className="detalhes-container-detail">
        <button className="btn-voltar-details" onClick={() => navigate(-1)}>&larr; Voltar</button>
        <section className='hero-details'>
          <div className="imagens-section-detail">
            <div className="imagem-principal-detail">
              <img
                src={produto.imagens[imagemSelecionada]}
                alt={produto.nome}
                className="imagem-zoom-detail-detail"
                />
            </div>
            <div className="carrossel-miniaturas-detail">
              {produto.imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Miniatura ${idx}`}
                  className={`miniatura ${idx === imagemSelecionada ? 'ativa' : ''}`}
                  onClick={() => setImagemSelecionada(idx)}
                  />
              ))}
            </div>
          </div>

          <div className="info-section-detail">
            <h2 className="titulo-detail">{produto.nome}</h2>
            <br />{renderEstrelas(produto.avaliacao_media)}
            <p className="descricao-detail">{produto.descricao}</p>
            <p className="preco-detail">R$ {produto.preco}</p>

            <div className="quantidade-detail">
              <button className='btn-detail' onClick={diminuir}>-</button>
              <input className='input-detail' type="text" value={quantidade} readOnly />
              <button className='btn-detail' onClick={aumentar}>+</button>
            </div>

            <button className="botao-carrinho-detail" onClick={adicionarAoCarrinho}>
              Adicionar ao Carrinho
            </button>

            <button className="botao-whatsapp" onClick={compartilharNoWhatsApp}>
              Compartilhar 
              <img src={whatsapp} alt='whatsapp' />
            </button>
          </div>

          {/* <div className="frete-section">
            <label htmlFor="cep">Calcular Frete:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              placeholder="Digite seu CEP"
              maxLength="9"
              onChange={handleCepChange}
            />
            <button onClick={calcularFrete}>Calcular</button>
            {frete && (
              <p>Frete: R$ {frete.valor} - Entrega em até {frete.prazo} dias úteis</p>
            )}
          </div> */}

          <div className="formas-pagamento">
            <h4>Formas de Pagamento</h4>
            <ul>
              <li>💳 Cartão de Crédito (até 3x sem juros)</li>
              <li>💵 Pix (5% de desconto)</li>
              <li>🏦 Boleto Bancário</li>
            </ul>
          </div>
        </section>
      

        <section className="secao-avaliacoes">
          <h2 className='section-title-av'>Avaliações</h2>
          {avaliacoes.length === 0 ? (
            <p>Seja o primeiro a avaliar este produto!</p>
          ) : (
            <ul className="lista-avaliacoes">
              {avaliacoes.map((avaliacao, index) => {
                return (
                  <li key={index} className="item-avaliacao">
                    <div className='avaliacao'>
                      <div className='header-av'>
                        <strong>{avaliacao.usuario_nome}</strong>
                        <div className="estrelas">
                          {[...Array(avaliacao.avaliacao)].map((_, i) => (
                            <span key={i} style={{ color: '#ffc107', fontSize: '1.2em', marginRight: '2px' }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className='coments'>{avaliacao.comentario}</p>
                    </div>
                    {avaliacao.usuario_id === usuario.id ?
                      <BsTrash3 className='lixeira' onClick={() => {delAvaliacao(avaliacao.id)}} /> : <></>
                    }
                  </li>
                  );
              })}
            </ul>
          )}

          <AvaliacaoForm onSubmit={adicionarAvaliacao} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProdutoDetails;
