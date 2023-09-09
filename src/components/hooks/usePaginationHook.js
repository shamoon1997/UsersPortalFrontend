import { useState, useEffect } from 'react';

function usePagination(
  apiEndpoint,
  currentPage,
  searchValue,
  selectedRadio,
  callSearch
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response;
        if (searchValue && selectedRadio) {
          response = await fetch(
            `${apiEndpoint}?page=${currentPage}&searchValue=${searchValue}&searchColumn=${selectedRadio}`
          );
        } else {
          response = await fetch(`${apiEndpoint}?page=${currentPage}`);
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiEndpoint, currentPage, callSearch]); // Update when apiEndpoint or currentPage changes

  return { data, isLoading, error };
}

export default usePagination;
