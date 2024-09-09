import React, { useState, useEffect } from 'react';
import { getAlimentacao } from '../api'; // Função que busca as opções de alimentação do backend
import './FormPage3.css'; // Certifique-se de que o caminho está correto

const FormPage3 = ({ formData, setFormData, previousPage, handleSubmit }) => {
  const [alimentacaoOptions, setAlimentacaoOptions] = useState({ tipoAlimentacao: [], alimentos: {} });
  const [selectedTipo, setSelectedTipo] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAlimentacao = async () => {
      try {
        const response = await getAlimentacao();

        setAlimentacaoOptions({
          tipoAlimentacao: Object.keys(response), 
          alimentos: response 
        });
      } catch (error) {
        console.error("Erro ao buscar dados de alimentação:", error);
      }
    };
    fetchAlimentacao();
  }, []);

  const handleTypeChange = (event) => {
    const tipoSelecionado = event.target.value;
    setSelectedTipo(tipoSelecionado);

    setFormData(prevData => ({
      ...prevData,
      tipoAlimentacao: tipoSelecionado,
      alimentosSelecionados: [] 
    }));
  };

  const handleFoodChange = (food) => {
    setFormData(prevData => {
      const newSelections = prevData.alimentosSelecionados.includes(food)
        ? prevData.alimentosSelecionados.filter(item => item !== food)
        : [...prevData.alimentosSelecionados, food];
      return { ...prevData, alimentosSelecionados: newSelections };
    });
  };

  const validatePage3 = () => {
    let newErrors = {};
    if (!formData.tipoAlimentacao) newErrors.tipoAlimentacao = "Tipo de Alimentação é obrigatório.";
    if (formData.alimentosSelecionados.length === 0) newErrors.alimentosSelecionados = "Selecione pelo menos um alimento.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePage3()) {
      handleSubmit(); 
    }
  };

  return (
    <div className="form-container">
      <h2>Página 3</h2>

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
