import type { GridColDef } from '@mui/x-data-grid';
import PageWithLoader from '../../Components/PageWithLoader/PageWithLoader';
import { TransactionDataGrid } from '../../Components/Transactions/TransactionDataGrid';
import { useState } from 'react';
import type { Expenses } from '../../utils/Types';
import React from 'react';
import { useLoaderData } from 'react-router';

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    sortable: false,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    sortable: false,
  },
  {
    field: 'payement_name',
    headerName: 'Payement name',
    flex: 2,
    sortable: false,
  },
  {
    field: 'method',
    headerName: 'Method',
    flex: 1,
    sortable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1.5,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (item) => {
      return (
        <div className="flex items-center justify-center flex-1 h-[100%]">
          <div className="text-[#59E5A9] bg-[rgba(89,229,169,0.41)] flex items-center justify-center rounded-[30px] h-[26px] w-[150px] ">
            {item.value}
          </div>
        </div>
      );
    },
    sortable: false,
  },
  {
    field: 'option',
    headerName: '...',
    flex: 0.3,
    renderCell: (item) => {
      return (
        <div className="text-[23px] cursor-pointer font-bold">{item.value}</div>
      );
    },
    renderHeader: () => {
      return <div className="text-[30px] font-bold">...</div>;
    },
    sortable: false,
  },
];



export type Transaction = {
  id: number;
  date: string;
  amount: string;
  payement_name: string;
  method: string;
  category: string;
  status: string;
  option: string;
};

export default function Expenses() {
  const [rows, setRows] = useState<Transaction[]>([]);
  const data = useLoaderData();
  React.useEffect(() => {
    if (data) {

      setRows(data);
    }
  }, [data]);

  return (
    <PageWithLoader>
      <div className="flex flex-wrap lg:flex-nowrap justify-between fixed top-28 left-6 lg:left-[110px] right-5 bottom-8 gap-6 overflow-y-scroll z-[260] ">
        <TransactionDataGrid {...{ columns, rows }} />
      </div>
    </PageWithLoader>
  );
}
