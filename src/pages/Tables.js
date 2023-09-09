import React, { useState, useEffect } from 'react';

import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';

import usePagination from '../components/hooks/usePaginationHook';
import useFetchRowCount from '../components/hooks/useFetchRowCount';

function Tables() {
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);

  const [totalResults, setTotalResults] = useState();

  const [searchValue, setSearchValue] = useState();

  const [selectedRadio, setSelectedRadio] = useState('');

  const [callSearch, setCallSearch] = useState();

  // pagination setup
  const resultsPerPage = 20;

  const { data, isLoading, error } = usePagination(
    'https://users-portal-backend.vercel.app/api/data',
    pageTable1,
    searchValue,
    selectedRadio,
    callSearch
  );
  const { rowCount } = useFetchRowCount(
    'https://users-portal-backend.vercel.app/api/data/rows'
  );

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(data);
  }, [isLoading, error]);

  useEffect(() => {
    setTotalResults(rowCount);
  }, [rowCount]);

  // Function to handle the search button click
  const handleSearch = () => {
    if (searchValue && selectedRadio) {
      // Perform the search functionality here
      console.log(`Searching for "${searchValue}" in ${selectedRadio}`);
      setCallSearch((prevCallSearch) => !prevCallSearch);
    } else {
      // Show an error message or handle empty search here
      alert('Please enter a search term and select a radio button.');
    }
  };

  return (
    <>
      <PageTitle>Users</PageTitle>

      <SectionTitle>Users Data</SectionTitle>
      <div className="flex mb-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search Users..."
            className="w-full p-2 border rounded-md mr-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Radio Buttons */}
        <div className="flex items-center mr-2">
          <label className="mr-2">
            <input
              type="radio"
              name="radioGroup"
              value="NAMA"
              checked={selectedRadio === 'NAMA'}
              onChange={() => setSelectedRadio('NAMA')}
            />
            NAMA
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="radioGroup"
              value="IC"
              checked={selectedRadio === 'IC'}
              onChange={() => setSelectedRadio('IC')}
            />
            IC
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="radioGroup"
              value="HP"
              checked={selectedRadio === 'HP'}
              onChange={() => setSelectedRadio('HP')}
            />
            HP
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup"
              value="ALAMAT"
              checked={selectedRadio === 'ALAMAT'}
              onChange={() => setSelectedRadio('ALAMAT')}
            />
            ALAMAT
          </label>
        </div>

        {/* Search Button */}
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <TableContainer className="mb-8">
        {/* Users Table */}
        <Table>
          <TableHeader>
            <tr>
              <TableCell>id</TableCell>
              <TableCell>NAMA</TableCell>
              <TableCell>IC</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>ALAMAT</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              dataTable1.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.NAMA}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.IC}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.HP}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.ALAMAT}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>loading....</>
            )}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Tables;
