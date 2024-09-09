import React from 'react';

const FormNavigation = ({ currentPage, totalPages, previousPage, nextPage }) => {
  return (
    <div>
      {currentPage > 1 && <button onClick={previousPage}>Página Anterior</button>}
      {currentPage < totalPages && <button onClick={nextPage}>Próxima Página</button>}
    </div>
  );
};

export default FormNavigation;
