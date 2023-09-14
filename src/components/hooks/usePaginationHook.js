import { useState, useEffect } from 'react';

function usePagination(apiEndpoint, currentPage, selectedData, callSearch) {
  const [data, setData] = useState([]);
  const [rowsCount, setRowsCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let rows;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response;
        if (selectedData && callSearch) {
          response = await fetch(
            `${apiEndpoint}?page=${currentPage}&searchValue=${JSON.stringify(
              selectedData
            )}`
          );
          let countRows = await fetch(`${apiEndpoint}/rows/data`);
          rows = await countRows.json();
          rows = rows[0].total;
          console.log('rows: ', rows);
          setRowsCount(rows);
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
  }, [apiEndpoint, currentPage, selectedData, callSearch]); // Update when apiEndpoint or currentPage changes

  return { data, isLoading, error, rowsCount };
}

export default usePagination;
