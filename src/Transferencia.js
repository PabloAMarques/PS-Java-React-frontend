import React from 'react';

function Transferencia({ transferencia }) {
  return (
    <tr>
      <td>{transferencia.id}</td>
      <td>{transferencia.dataTransferencia}</td>
      <td>{transferencia.valor}</td>
      <td>{transferencia.tipo}</td>
      <td>{transferencia.nomeOperadorTransacao}</td>
      <td>{transferencia.conta.id}</td>
      <td>{transferencia.conta.nomeResponsavel}</td>
    </tr>
  );
}

export default Transferencia;
