import React, { useState, useEffect } from 'react';

import PageTitle from '../components/Typography/PageTitle';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  WindmillContext,
} from '@windmill/react-ui';

import { useContext } from 'react';
import usePagination from '../components/hooks/usePaginationHook';
import useFetchRowCount from '../components/hooks/useFetchRowCount';
import { exportToCSV } from '../utils/demo/exportCSV';

function Tables() {
  const { mode } = useContext(WindmillContext);
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);

  const [totalResults, setTotalResults] = useState();

  const [nameSearch, setnameSearch] = useState();
  const [postcodeSearch, setPostCodeSearch] = useState();
  const [IcSearch, setIcSearch] = useState();
  const [AlamatSearch, setAlamatSearch] = useState();
  const [stateSearch, setStateSearch] = useState();

  const [selectedData, setSelectedData] = useState('');

  const [callSearch, setCallSearch] = useState();

  // pagination setup
  const resultsPerPage = 20;

  const handleSearch = () => {
    if (
      !nameSearch &&
      !postcodeSearch &&
      !IcSearch &&
      !AlamatSearch &&
      !stateSearch
    ) {
      alert('Enter any input field');
      return;
    }
    var selectedFieldsToSearch = {};
    if (nameSearch) {
      // eslint-disable-next-line no-unused-vars
      selectedFieldsToSearch = {
        ...selectedFieldsToSearch,
        NAMA: nameSearch,
      };
    }
    if (postcodeSearch) {
      // eslint-disable-next-line no-unused-vars
      selectedFieldsToSearch = {
        ...selectedFieldsToSearch,
        POSKOD: postcodeSearch,
      };
    }
    if (IcSearch) {
      // eslint-disable-next-line no-unused-vars
      selectedFieldsToSearch = {
        ...selectedFieldsToSearch,
        IC: IcSearch,
      };
    }
    if (AlamatSearch) {
      // eslint-disable-next-line no-unused-vars
      selectedFieldsToSearch = {
        ...selectedFieldsToSearch,
        ALAMAT: AlamatSearch,
      };
    }
    if (stateSearch) {
      // eslint-disable-next-line no-unused-vars
      selectedFieldsToSearch = {
        ...selectedFieldsToSearch,
        STATE: stateSearch,
      };
    }

    setSelectedData({
      ...selectedFieldsToSearch,
    });
    setCallSearch(true);
    console.log('In this field');
  };

  const { data, isLoading, error, rowsCount } = usePagination(
    'https://users-portal-backend.vercel.app/api/data',
    pageTable1,
    selectedData,
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
    console.log(data.data);
    setDataTable1(data.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error]);

  useEffect(() => {
    setTotalResults(rowCount);
  }, [rowCount]);

  return (
    <>
      <PageTitle>Users Data</PageTitle>
      <div className="flex mb-4">
        {/* First Column */}
        <div className="flex-1 mr-4">
          {/* First Input */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md mb-2"
            value={nameSearch}
            onChange={(e) => setnameSearch(e.target.value)}
          />

          {/* Second Input */}
          <input
            type="number"
            placeholder="POSTCODE"
            className="w-full p-2 border rounded-md"
            value={postcodeSearch}
            onChange={(e) => setPostCodeSearch(e.target.value)}
          />

          {/* Buttons in the first column */}
          <div className="flex mt-2">
            <button
              className="p-2 bg-blue-500 text-white rounded-md mr-2"
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              className="p-2 bg-green-500 text-white rounded-md"
              onClick={() => {
                exportToCSV(dataTable1, 'exported_data.csv');
              }}
            >
              Export
            </button>
          </div>
          <div
            style={{
              'margin-top': '5px',
              color: mode === 'dark' ? 'white' : 'black',
            }}
            className="font-semibold"
          >
            Total Results: {rowsCount ?? totalResults}
          </div>
        </div>

        {/* Second Column */}
        <div className="flex-1">
          {/* First Input */}
          <input
            type="text"
            placeholder="IC"
            className="w-full p-2 border rounded-md mb-2"
            value={IcSearch}
            onChange={(e) => setIcSearch(e.target.value)}
          />

          {/* Second Input */}
          <input
            type="text"
            placeholder="ALAMAT"
            className="w-full p-2 border rounded-md mb-2"
            value={AlamatSearch}
            onChange={(e) => setAlamatSearch(e.target.value)}
          />

          {/* Third Input */}
          <input
            type="text"
            placeholder="STATE"
            className="w-full p-2 border rounded-md"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
          />
        </div>
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
              <TableCell>POSKOD</TableCell>
              <TableCell>State</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              dataTable1?.map((user, i) => (
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
                  <TableCell>
                    <span className="text-sm">{user.POSKOD}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.STATE}</span>
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
            totalResults={rowsCount ?? totalResults}
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
