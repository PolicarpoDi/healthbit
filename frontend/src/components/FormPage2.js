import React, { useState } from 'react';
import './FormPage2.css';

const questions = [
  { title: "Diabetes", options: ["Tenho", "Não tenho", "Não sei"] },
  { title: "Problemas Cardíacos", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] },
  { title: "Pressão Alta", options: ["Tenho", "Não tenho", "Não sei"] },
  { title: "Asma", options: ["Tenho", "Não tenho"] },
  { title: "Depressão", options: ["Tenho", "Não tenho"] },
  { title: "Ansiedade", options: ["Tenho", "Não tenho"] },
  { title: "Colesterol Alto", options: ["Tenho", "Não tenho", "Não sei"] },
  { title: "Dores nas Costas", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] },
  { title: "Dores nas Articulações", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] },
  { title: "Dores de Cabeça", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] },
  { title: "Câncer", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] },
  { title: "Infecções Sexualmente Transmissíveis", options: ["Tenho", "Não tenho", "Já tive, mas me curei"] }
];

const FormPage2 = ({ formData, setFormData, nextPage, previousPage }) => {
  const [responses, setResponses] = useState(formData.opcoesSelecionadas || {});
  const [errorMessage, setErrorMessage] = useState("");

  const handleOptionChange = (questionIndex, option) => {
    setResponses(prevResponses => {
      const currentOptions = prevResponses[`question${questionIndex}`] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter(o => o !== option)
        : [...currentOptions, option];
      return {
        ...prevResponses,
        [`question${questionIndex}`]: updatedOptions
      };
    });
  };

  const handlePrevious = () => {
    previousPage();
  };

  const handleNext = () => {
    const allQuestionsAnswered = questions.every((_, index) =>
      (responses[`question${index}`] || []).length > 0
    );

    if (allQuestionsAnswered) {
      setFormData(prevData => ({
        ...prevData,
        opcoesSelecionadas: responses
      }));
      nextPage();
    } else {
      setErrorMessage("Por favor, responda todas as questões antes de prosseguir.");
    }
  };

  return (

    <div className="form-container">
      <h2>Página 2</h2>

          <div className='doencas-container'>
            <div className="doencas-title">Preencha apenas as doenças que você tem ou já teve</div>
            <div className="doencas-subtitle">
              (Você pode selecionar mais de um campo em cada resposta)
            </div>
            <div className="form-grid">
              {questions.map((question, index) => (
                <div key={index} className="form-col">
                  <div className="question-title">{question.title}</div>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="checkbox"
                        name={`question${index}`}
                        value={option}
                        checked={(responses[`question${index}`] || []).includes(option)}
                        onChange={() => handleOptionChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <br />
            <label>
              Outros:
              <input
                type="text"
                value={responses.other || ''}
                onChange={(e) => setResponses(prev => ({ ...prev, other: e.target.value }))}
              />
            </label>
            <div className="form-divider"></div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="form-buttons">
            <button type="button" onClick={handlePrevious}>Anterior</button>
            <button type="button" onClick={handleNext}>Próximo</button>
          </div>

      </div>
  );
};

export default FormPage2;
