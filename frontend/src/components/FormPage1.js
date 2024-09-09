import React, { useState } from 'react';
import './FormPage1.css'; // Certifique-se de que o caminho está correto


const FormPage1 = ({ formData, setFormData, nextPage }) => {
  const [errors, setErrors] = useState({});

  const estados = [
    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", 
    "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", 
    "RO", "RR", "RS", "SC", "SE", "SP", "TO"
  ];

  const pressaoOpcoes = [
    "- Nenhum -", "Menor que 120", "De 120 a 129", "De 130 a 139", 
    "De 140 a 159", "De 160 a 179", "180 ou maior"
  ];

  // Valida os campos da página 1
  const validatePage1 = () => {
    let newErrors = {};

    // Validações obrigatórias
    if (!formData.nome || typeof formData.nome !== 'string') newErrors.nome = "Nome é obrigatório e deve ser uma string.";
    if (!formData.matriculaCpf || typeof formData.matriculaCpf !== 'string') newErrors.matriculaCpf = "Matrícula/CPF é obrigatório.";
    if (!formData.cargo || typeof formData.cargo !== 'string') newErrors.cargo = "Cargo é obrigatório.";
    if (!formData.cidade || typeof formData.cidade !== 'string') newErrors.cidade = "Cidade é obrigatória.";
    if (!formData.estado || !estados.includes(formData.estado)) newErrors.estado = "Estado é obrigatório e deve ser válido.";
    if (!formData.telefone || typeof formData.telefone !== 'string') newErrors.telefone = "Telefone é obrigatório.";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Email é obrigatório e deve conter '@'.";
    if (!formData.peso || isNaN(formData.peso)) newErrors.peso = "Peso é obrigatório e deve ser um número.";
    if (!formData.altura || isNaN(formData.altura)) newErrors.altura = "Altura é obrigatória e deve ser um número.";

    // Se "Os dados estão corretos?" for "Não", o usuário não pode avançar
    if (formData.dadosCorretos === "não") newErrors.dadosCorretos = "Não é possível prosseguir sem que os dados estejam corretos.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(errors)

  // Chama a função de validação e avança para a próxima página se não houver erros
  const handleNext = () => {
    if (validatePage1()) {
      nextPage();
    }
  };

  // Função para atualizar a data de nascimento
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      dataNascimento: {
        ...formData.dataNascimento,
        [name]: value
      }
    });
  };

  return (
    <div className="form-container">
      <h2>Página 1</h2>

      {/* Campo Nome */}
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
        {errors.nome && <p className="error-text">{errors.nome}</p>}
      </div>

      {/* Campo Matrícula/CPF */}
      <div className="form-group">
        <label>Matrícula/CPF:</label>
        <input
          type="text"
          value={formData.matriculaCpf}
          onChange={(e) => setFormData({ ...formData, matriculaCpf: e.target.value })}
        />
        {errors.matriculaCpf && <p className="error-text">{errors.matriculaCpf}</p>}
      </div>

      {/* Campo Cargo */}
      <div className="form-group">
        <label>Cargo</label>
        <input
          type="text"
          value={formData.cargo}
          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
        />
        {errors.cargo && <p className="error-text">{errors.cargo}</p>}
      </div>

      {/* Campo Cidade */}
      <div className="form-group">
        <label>Cidade</label>
        <input
          type="text"
          value={formData.cidade}
          onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
        />
        {errors.cidade && <p className="error-text">{errors.cidade}</p>}
      </div>

      {/* Campo Estado */}
      <div className="form-group">
        <label>Estado</label>
        <select
          value={formData.estado}
          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        >
          <option value="">Selecione o estado</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
        {errors.estado && <p className="error-text">{errors.estado}</p>}
      </div>

      {/* Campo Dados Corretos */}
      <div className="form-group-sub">
        <label><b>Os dados acima estão corretos?</b></label>
        <div className='radio-group'>
          <label>
            <input
              type="radio"
              name="dadosCorretos"
              value="sim"
              checked={formData.dadosCorretos === "sim"}
              onChange={(e) => setFormData({ ...formData, dadosCorretos: e.target.value })}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="dadosCorretos"
              value="não"
              checked={formData.dadosCorretos === "não"}
              onChange={(e) => setFormData({ ...formData, dadosCorretos: e.target.value })}
            />
            Não
          </label>
        </div>
        {errors.dadosCorretos && <p className="error-text">{errors.dadosCorretos}</p>}
      </div>

      {/* Campo Titularidade */}
      <div className="form-group-sub">
        <label><b>Titularidade</b></label>
        <div className='radio-group'>
          <label>
            <input
              type="radio"
              name="titularidade"
              value="Titular"
              checked={formData.titularidade === "Titular"}
              onChange={(e) => setFormData({ ...formData, titularidade: e.target.value })}
            />
            Titular
          </label>
          <label>
            <input
              type="radio"
              name="titularidade"
              value="Dependente"
              checked={formData.titularidade === "Dependente"}
              onChange={(e) => setFormData({ ...formData, titularidade: e.target.value })}
            />
            Dependente
          </label>
        </div>
        {errors.titularidade && <p className="error-text">{errors.titularidade}</p>}
      </div>

      {/* Campo Telefone */}
      <div className="form-group">
        <label>Telefone com DDD</label>
        <input
          type="text"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        />
        {errors.telefone && <p className="error-text">{errors.telefone}</p>}
      </div>

      {/* Campo Email */}
      <div className="form-group">
        <label>E-mail:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      {/* Campo Data de Nascimento */}
      <div className="form-group">
        <label>Data de Nascimento:</label>
        <div className="date-controls">
          <select
            name="dia"
            value={formData.dataNascimento?.dia || ''}
            onChange={handleDateChange}
          >
            <option value="">Dia</option>
            {[...Array(31).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            name="mes"
            value={formData.dataNascimento?.mes || ''}
            onChange={handleDateChange}
          >
            <option value="">Mês</option>
            {[...Array(12).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            name="ano"
            value={formData.dataNascimento?.ano || ''}
            onChange={handleDateChange}
          >
            <option value="">Ano</option>
            {[...Array(100).keys()].map(i => (
              <option key={i + 1900} value={i + 1900}>{i + 1900}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Campo Sexo */}
      <div className="form-group-sub">
        <label><b>Sexo Biológico</b></label>
        <div className='radio-group'>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Masculino"
              checked={formData.dadosSexo === "Masculino"}
              onChange={(e) => setFormData({ ...formData, dadosSexo: e.target.value })}
            />
            Masculino
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Feminino"
              checked={formData.dadosSexo === "Feminino"}
              onChange={(e) => setFormData({ ...formData, dadosSexo: e.target.value })}
            />
            Feminino
          </label>
        </div>
      </div>

      {/* Campo Peso */}
      <div className="form-group">
        <label>Peso</label>
        <input
          type="number"
          value={formData.peso}
          onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
        />
        {errors.peso && <p className="error-text">{errors.peso}</p>}
      </div>

      {/* Campo Altura */}
      <div className="form-group">
        <label>Altura (em cm)</label>
        <input
          type="number"
          value={formData.altura}
          onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
        />
        {errors.altura && <p className="error-text">{errors.altura}</p>}
      </div>

      {/* Seção de Pressão Arterial */}
      <div className="pressao-arial-container">
        <div className="pressao-arial-title">Pressão Arterial</div>
        <div className="pressao-arial-subtitle">
          Informe sua pressão arterial sistólica e diastólica abaixo. Caso não saiba, marque a opção correspondente.
        </div>
        <div className="form-group">
          <label>Pressão Sistólica:</label>
          <select
            className="pressao-arial-select"
            value={formData.pressaoSistolica}
            onChange={(e) => setFormData({ ...formData, pressaoSistolica: e.target.value })}
          >
            {pressaoOpcoes.map((opcao) => (
              <option key={opcao} value={opcao}>{opcao}</option>
            ))}
          </select>
          <label>Pressão Diastólica:</label>
          <select
            className="pressao-arial-select"
            value={formData.pressaoDiastolica}
            onChange={(e) => setFormData({ ...formData, pressaoDiastolica: e.target.value })}
          >
            {pressaoOpcoes.map((opcao) => (
              <option key={opcao} value={opcao}>{opcao}</option>
            ))}
          </select>
        </div>
        <div className="pressao-arial-checkbox">
          <label>
            <input
              type="checkbox"
              checked={formData.naoSabePressao}
              onChange={(e) => setFormData({ ...formData, naoSabePressao: e.target.checked })}
            />
            Não sei
          </label>
        </div>
      </div>

      <div className="form-group">
        <button onClick={handleNext}>Próximo</button>
      </div>
    </div>
  );
};

export default FormPage1;
