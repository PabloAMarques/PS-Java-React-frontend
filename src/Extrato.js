import React, { useState, useEffect } from 'react';
import Transferencia from './Transferencia';
import './Extrato.css';

function Extrato() {
  const [transferencias, setTransferencias] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
  const [transferenciasFiltradas, setTransferenciasFiltradas] = useState([]);

  const fetchTransferencias = () => {
    let url = 'http://localhost:8080/extrato';

    if (dataInicio || dataFim || nomeOperador) {
      url += '?';

      if (dataInicio) {
        url += `dataInicio=${dataInicio}&`;
      }
      if (dataFim) {
        url += `dataFim=${dataFim}&`;
      }
      if (nomeOperador) {
        url += `nomeOperador=${nomeOperador}&`;
      }

      // Remove o último '&' caso exista
      url = url.slice(0, -1);
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTransferencias(data);
        setTransferenciasFiltradas(data);
      })
      .catch(error => console.error('Erro ao obter transferências:', error));
  };

  useEffect(() => {
    fetchTransferencias();
  }, [dataInicio, dataFim, nomeOperador]);

  const filtrarTransferencias = () => {
    let filtradas = transferencias;

    if (dataInicio) {
      filtradas = filtradas.filter(transferencia => transferencia.dataTransferencia >= dataInicio);
    }
    if (dataFim) {
      filtradas = filtradas.filter(transferencia => transferencia.dataTransferencia <= dataFim);
    }
    if (nomeOperador) {
      filtradas = filtradas.filter(transferencia => transferencia.nomeOperadorTransacao === nomeOperador);
    }

    setTransferenciasFiltradas(filtradas);
  };

  return (
    <div className="container">
      <h1>Extrato Bancário</h1>
      <div className="input-container">
        <div className="input-group">
          <label>Data Início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={e => setDataInicio(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Data Fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={e => setDataFim(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Nome do Operador:</label>
          <input
            type="text"
            value={nomeOperador}
            onChange={e => setNomeOperador(e.target.value)}
          />
        </div>
      </div>
      <button className="search-button" onClick={filtrarTransferencias}>Pesquisar</button>
      <div className="result-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data de Transferência</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Nome do Operador</th>
              <th>ID da Conta</th>
              <th>Nome do Responsável</th>
            </tr>
          </thead>
          <tbody>
            {transferenciasFiltradas.map(transferencia => (
              <Transferencia key={transferencia.id} transferencia={transferencia} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Extrato;
