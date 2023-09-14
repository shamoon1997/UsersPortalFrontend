export const exportToCSV = (data, fileName) => {
  // Create an array of CSV rows
  const csvRows = [];

  // Extract headers from the first object in the data array
  const header = Object.keys(data[0]);

  // Add the header row to the CSV rows
  csvRows.push(header.join(','));

  // Iterate over the data and create rows for each object
  data.forEach((row) => {
    const rowData = header.map((key) => {
      let value = row[key];

      // Check if the value contains a comma and needs to be wrapped in double quotes
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`;
      }

      return value;
    });

    csvRows.push(rowData.join(','));
  });

  // Combine the rows into a CSV content string
  const csvContent = csvRows.join('\n');

  // Create a data URI for the CSV content
  const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName);

  // Trigger the download
  link.click();
};
