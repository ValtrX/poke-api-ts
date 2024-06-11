import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  pokemonCount: number;
  pokemonsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({  pokemonCount, pokemonsPerPage, currentPage, setCurrentPage  }) => {

  const totalPages = Math.ceil(pokemonCount / pokemonsPerPage);
  const [searchParams, setSearchParams] = useSearchParams({ pokePagination: '' });

  const handlePageChange = (page: number) => {

    const zeroBasedPage = page - 1; // Convertir 1-basado a 0-basado
    if (zeroBasedPage < 0) {
      setSearchParams((params) => {
        params.delete('pokePagination');
        return params;
      });
      setCurrentPage(0);
    } else if (zeroBasedPage >= totalPages) {
      setSearchParams((prev) => {
        prev.set('pokePagination', (totalPages - 1).toString());
        return prev;
      }, { replace: true });
      setCurrentPage(totalPages - 1);
    } else {
      setSearchParams((prev) => {
        if (page === 1) {
          prev.delete('pokePagination'); // Eliminar el parámetro para la página 1
        } else {
          prev.set('pokePagination', page.toString());
        }
        return prev;
      }, { replace: true });
      setCurrentPage(zeroBasedPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const delta = 2; // Número de páginas a mostrar a cada lado del número actual

    for (let i = 0; i < totalPages; i++) {
      // Si la página está dentro del rango visible o es la primera/última página
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i + 1); // Convertir 0-basado a 1-basado para mostrar
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.map((page, index) => (
      <li key={index}>
        {typeof page === 'number' ? (
          <button
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page - 1} // Comparar con 0-basado
          >
            {page}
          </button>
        ) : (
          <span>{page}</span>
        )}
      </li>
    ));
  };

  return (
    <div>
        <h1>PAGINATION HERE: {searchParams && searchParams.get("pokePagination") ? searchParams.get("pokePagination") : null}</h1>
        <ul>
          <li>
            <button
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === 0}
            >
              anterior
            </button>
          </li>
          {renderPagination()}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 2)}
              disabled={currentPage >= totalPages - 1}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
  )
}
