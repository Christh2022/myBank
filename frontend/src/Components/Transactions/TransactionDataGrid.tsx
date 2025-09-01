import * as React from 'react';
// import { columns, rows } from '../internals/data/gridData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { CustomFooter } from '../../UI/DataGrid/customFooter';
import { CustomHeader } from '../../UI/DataGrid/CustomHeader';

import type { RowData } from '../../utils/Types';
import { CustomNoRowsOverlay } from '../../UI/DataGrid/CustomNoRowsOverlay';
import { AddTransaction } from '../../UI/DataGrid/Addtransaction';
import { deleteTransaction } from '../../Api/ExpenseController';
import { useSelector } from 'react-redux';
import { expense } from '../../Redux/Slices/ExpenseSlice';

export const TransactionDataGrid = ({
  columns,
  rows,
}: {
  columns: GridColDef[];
  rows: RowData[];
}) => {
  const [add, setAdd] = React.useState<boolean>(true);
  const [selectionModel, setSelectionModel] = React.useState({
    type: 'include',
    ids: [] as number[],
  });

  const [rowData, setRowData] = React.useState(rows);
  const newTransaction = useSelector(expense);

  React.useEffect(() => {
    setRowData([...rows, ...newTransaction]);
  }, [rows, add, newTransaction]);

  const handleDelete = async () => {
    setRowData((prev) =>
      prev.filter((row: RowData) => !selectionModel.ids.includes(row.id))
  );
  selectionModel.ids.forEach(async (id) => {
    await deleteTransaction(id);
  });
  setSelectionModel({
    type: 'include',
    ids: [],
  });
  };

  const addTransaction = () => {
    setAdd(!add);
  };


  return (
    <>
      <DataGrid
        checkboxSelection
        onRowSelectionModelChange={(newModel) =>
          setSelectionModel({
            type: 'multiple',
            ids: Array.from(newModel.ids) as number[],
          })
        }
        rows={rowData}
        rowSelectionModel={{
          type: 'include',
          ids: new Set(selectionModel.ids),
        }}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 15]}
        disableColumnResize
        density="compact"
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          '& .MuiDataGrid-mainContent': {
            '--DataGrid-t-header-background-base': 'rgba(255, 158, 0, 0.2)',
            '--DataGrid-t-color-foreground-base': '#fff',
            '--DataGrid-t-color-border-base': 'rgba(255, 255, 255, 0)',
            '--DataGrid-rowBorderColor': 'transparent',
            // minHeight: 650,
            height: '100%',
            '& span': {
              color: `rgba(255, 158, 0, 1)`,
            },
            '& .MuiDataGrid-columnHeaders': {
              color: 'var(--DataGrid-t-color-foreground-base)',

              fontSize: 15,
              '& span': {
                color: '#fca311',
              },
              '& div': {
                fontWeight: '500',
              },

              '& .MuiDataGrid-columnHeader': {
                outline: 'none',
              },

              '& .MuiDataGrid-iconButtonContainer': {
                display: 'none',
              },
              '& .MuiDataGrid-menuIcon ': {
                display: 'none',
              },
            },
            '& .MuiDataGrid-cell': {
              fontSize: 15,
              color: '#fff',
              fontWeight: '300',
              outline: 'none',
            },
            '& .Mui-selected': {
              backgroundColor: 'rgba(255, 158, 0, 0.2)',
            },
            '& .MuiButtonBase-root.MuiPaginationItem-root ': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '& .MuiPaginationItem-root ': {
              color: 'white',
              fontWeight: '600',
              fontSize: 18,
              width: 38,
              height: 38,
            },
            '& .MuiPagination-ul > li:first-of-type > button': {
              width: 150,
              '& span': {
                color: 'white',
                fontWeight: 'bold',
              },
            },
            '& .MuiPagination-ul > li:last-of-type > button': {
              width: 150,
              '& span': {
                color: 'white',
                fontWeight: 'bold',
              },
            },
            '& .MuiStack-root .Mui-selected': {
              backgroundColor: 'rgba(250,158,0,0.8)',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(255, 158, 0, 0.2)',
            },
            '& .MuiDataGrid-footerContainer': {
              color: '#fff',
            },
          },
        }}
        slots={{
          footer: CustomFooter,
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: () =>
            CustomHeader(
              handleDelete,
              addTransaction,
              selectionModel.ids.length
            ),
        }}
        showToolbar
      />
      {add && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#ffffff1e]  flex items-center justify-center z-[265]"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <AddTransaction {...{ addTransaction }} />
        </div>
      )}
    </>
  );
};
