import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAlimentacao = async () => {
  try {
    const response = await axios.get(`${backendUrl}/getAlimentacao`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados de alimentação:', error);
    throw error;
  }
};

export const submitFormulario = async (formData) => {
  try {
    const response = await axios.post(`${backendUrl}/submitFormulario`, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao submeter o formulário:', error);
    throw error;
  }
};
