import { useState, useEffect } from 'react';

function useFetchRowCount(apiEndpoint) {
  const [rowCount, setRowCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the row count from the provided API endpoint
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const totalRowCount = result[0].total;
        setRowCount(totalRowCount);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { rowCount, isLoading, error };
}

export default useFetchRowCount;
