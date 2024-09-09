import React from 'react';

const FormSummary = ({ formData, handleSubmit }) => {
  const { 
    nome = '', 
    matriculaCpf = '', 
    cargo = '', 
    cidade = '', 
    estado = '', 
    dadosCorretos = '', 
    titularidade = '', 
    telefone = '', 
    email = '', 
    dataNascimento = { dia: '', mes: '', ano: '' },
    sexo = '',
    peso = '', 
    altura = '', 
    pressaoSistolica = '', 
    pressaoDiastolica = '', 
    opcoesSelecionadas = [],
    tipoAlimentacao = "",
    alimentosSelecionados = []
  } = formData;

  return (
    <div>
      <h2>Resumo do Formulário</h2>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Matrícula/CPF:</strong> {matriculaCpf}</p>
      <p><strong>Cargo:</strong> {cargo}</p>
      <p><strong>Cidade:</strong> {cidade}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <p><strong>Dados Corretos:</strong> {dadosCorretos}</p>
      <p><strong>Titularidade:</strong> {titularidade}</p>
      <p><strong>Telefone:</strong> {telefone}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Data de Nascimento:</strong> {dataNascimento.dia}/{dataNascimento.mes}/{dataNascimento.ano}</p>
      <p><strong>Sexo:</strong> {sexo}</p>
      <p><strong>Peso:</strong> {peso}</p>
      <p><strong>Altura:</strong> {altura}</p>
      <p><strong>Pressão Sistólica:</strong> {pressaoSistolica}</p>
      <p><strong>Pressão Diastólica:</strong> {pressaoDiastolica}</p>

      <h3>Opções Selecionadas (Página 2)</h3>
      <ul>
        {opcoesSelecionadas.length > 0 ? (
          opcoesSelecionadas.map((opcao, index) => (
            <li key={index}>{opcao}</li>
          ))
        ) : (
          <li>Nenhuma opção selecionada.</li>
        )}
      </ul>

      <h3>Alimentação (Página 3)</h3>
      <p><strong>Tipo de Alimentação:</strong> {tipoAlimentacao || 'Não selecionado'}</p>
      <p><strong>Alimentos Selecionados:</strong></p>
      <ul>
        {alimentosSelecionados.length > 0 ? (
          alimentosSelecionados.map((alimento, index) => (
            <li key={index}>{alimento}</li>
          ))
        ) : (
          <li>Nenhum alimento selecionado.</li>
        )}
      </ul>

      <button onClick={handleSubmit}>Submeter Formulário</button>
    </div>
  );
};

export default FormSummary;
