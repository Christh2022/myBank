import { CiExport } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
export const CustomHeader = (
  handleDelete: () => void,
  AddTransaction: ()=> void,
  selectionModel: number
) => {
  return (
    <div className=" text-white text-[20px] font-bold flex items-center justify-between h-[60px] mb-5 ">
      <h3>Transaction History</h3>
      <div className="flex items-center justify-center gap-4">
        {selectionModel > 0 && (
          <IconButton
            onClick={handleDelete}
            sx={{
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,158,0,0.8)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <div className="border cursor-pointer border-[rgba(255,255,255,0.59)] rounded-[5px] w-[134px] h-[38px] items-center justify-center flex gap-2.5 text-[15px] font-medium text-[rgba(255,255,255,0.5)]">
          Sort by <span style={{ color: 'white' }}>Date</span>
        </div>
        <div className="flex  w-[134px] h-[38px]  border hover:border-0 cursor-pointer border-[rgba(255,255,255,0.59)] rounded-[5px] items-center justify-center gap-2.5 text-[15px] font-medium text-[rgba(255,255,255,1)]  hover:bg-[#fca211]">
          <CiExport className="mr-1 text-[22px]" color="white" />
          Export
        </div>
        <div className="w-[134px] h-[38px]  border-0  rounded-[5px] flex items-center justify-center gap-2.5 text-[15px] font-medium  cursor-pointer bg-[#fca211]" onClick={AddTransaction}>
          <FaPlus className="mr-1 text-[18px]" color="white" />
          Add New
        </div>
      </div>
    </div>
  );
};
