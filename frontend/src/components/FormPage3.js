import React, { useState, useEffect } from 'react';
import { getAlimentacao } from '../api'; // Função que busca as opções de alimentação do backend
import './FormPage3.css'; // Certifique-se de que o caminho está correto

const FormPage3 = ({ formData, setFormData, previousPage, handleSubmit }) => {
  const [alimentacaoOptions, setAlimentacaoOptions] = useState({ tipoAlimentacao: [], alimentos: {} });
  const [selectedTipo, setSelectedTipo] = useState('');
  const [errors, setErrors] = useState({});

  // Função para buscar dados de alimentação
  useEffect(() => {
    const fetchAlimentacao = async () => {
      try {
        const response = await getAlimentacao();
        // Ajuste o formato dos dados conforme necessário
        setAlimentacaoOptions({
          tipoAlimentacao: Object.keys(response), // Obtendo os tipos de alimentação a partir das chaves do objeto
          alimentos: response // Dados dos alimentos
        });
      } catch (error) {
        console.error("Erro ao buscar dados de alimentação:", error);
      }
    };
    fetchAlimentacao();
  }, []);

  // Manipula a mudança no dropdown do tipo de alimentação
  const handleTypeChange = (event) => {
    const tipoSelecionado = event.target.value;
    setSelectedTipo(tipoSelecionado);

    // Atualiza o estado com o tipo de alimentação selecionado
    setFormData(prevData => ({
      ...prevData,
      tipoAlimentacao: tipoSelecionado,
      alimentosSelecionados: [] // Limpa as seleções quando o tipo de alimentação muda
    }));
  };

  // Manipula a mudança nos checkboxes dos alimentos
  const handleFoodChange = (food) => {
    setFormData(prevData => {
      const newSelections = prevData.alimentosSelecionados.includes(food)
        ? prevData.alimentosSelecionados.filter(item => item !== food)
        : [...prevData.alimentosSelecionados, food];
      return { ...prevData, alimentosSelecionados: newSelections };
    });
  };

  // Validação para a página 3
  const validatePage3 = () => {
    let newErrors = {};
    if (!formData.tipoAlimentacao) newErrors.tipoAlimentacao = "Tipo de Alimentação é obrigatório.";
    if (formData.alimentosSelecionados.length === 0) newErrors.alimentosSelecionados = "Selecione pelo menos um alimento.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePage3()) {
      handleSubmit(); // Submete o formulário na última página
    }
  };

  return (
    <div className="form-container">
      <h2>Página 3</h2>

      {/* Dropdown para selecionar Tipo de Alimentação */}
      <div className="form-group">
        <label><b>Selecione seu tipo de Alimentação</b></label>
        <select
          value={formData.tipoAlimentacao}
          onChange={handleTypeChange}
        >
          <option value="">Selecione um tipo de alimentação</option>
          {alimentacaoOptions.tipoAlimentacao.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        {errors.tipoAlimentacao && <p className="error-text">{errors.tipoAlimentacao}</p>}
      </div>

      <div className="form-group">
        <label><b>Preencha os tipos de alimento que você consome diariamente:</b></label>
        {selectedTipo && alimentacaoOptions.alimentos[selectedTipo] && alimentacaoOptions.alimentos[selectedTipo].map((food) => (
          <div key={food}>
            <input
              type="checkbox"
              checked={formData.alimentosSelecionados.includes(food)}
              onChange={() => handleFoodChange(food)}
            />
            <label>{food}</label>
          </div>
        ))}
        {errors.alimentosSelecionados && <p className="error-text">{errors.alimentosSelecionados}</p>}
      </div>

      <div className="form-buttons">
        <button onClick={previousPage}>Anterior</button>
        <button onClick={handleNext}>Enviar</button>
      </div>
    </div>
  );
};

export default FormPage3;
