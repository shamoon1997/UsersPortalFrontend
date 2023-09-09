import React from 'react';
import InfoCard from '../components/Cards/InfoCard';
import PageTitle from '../components/Typography/PageTitle';
import { PeopleIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import useFetchRowCount from '../components/hooks/useFetchRowCount';

function Dashboard() {
  const { rowCount } = useFetchRowCount(
    'https://users-portal-backend.vercel.app/api/data/rows'
  );
  console.log('rowCount', rowCount);
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {rowCount ? (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Records" value={rowCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      ) : (
        <div>
          <p>loading....</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;
