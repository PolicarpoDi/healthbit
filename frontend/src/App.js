import React, { useState } from 'react';
import FormPage1 from './components/FormPage1';
import FormPage2 from './components/FormPage2';
import FormPage3 from './components/FormPage3'; 
import FormSummary from './components/FormSummary';
import { submitFormulario } from './api'; 

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    matriculaCpf: '',
    cargo: '',
    cidade: '',
    estado: '',
    dadosCorretos: '',
    titularidade: '',
    telefone: '',
    email: '',
    dataNascimento: { dia: '', mes: '', ano: '' },
    sexo: '',
    peso: '',
    altura: '',
    pressaoSistolica: '',
    pressaoDiastolica: '',
    opcoesSelecionadas: [], 
    tipoAlimentacao: '',     
    alimentosSelecionados: [] 
  });

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    try {
      await submitFormulario(formData);
      console.log('Formulário submetido com sucesso!');
      setCurrentPage(1);
    } catch (error) {
      console.error('Erro ao submeter o formulário:', error);
    }
  };

  return (
    <div className="form-container">
      {currentPage === 1 && (
        <FormPage1
          formData={formData}
          setFormData={setFormData}
          nextPage={nextPage}
        />
      )}
      {currentPage === 2 && (
        <FormPage2
          formData={formData}
          setFormData={setFormData}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
      {currentPage === 3 && (
        <FormPage3
          formData={formData}
          setFormData={setFormData}
          previousPage={previousPage}
          handleSubmit={handleSubmit}
        />
      )}
      {currentPage === 4 && (
        <FormSummary
          formData={formData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;
