import { Pagination, Stack, PaginationItem } from '@mui/material';
import React, { type ChangeEvent } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export const CustomFooter = () => {
  const [page, setPage] = React.useState<number>(1);
  const totalPages = 10;

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ paddingTop: 5 }}>
      <div className="flex items-center justify-between">
        <Pagination
          count={totalPages}
          shape="rounded"
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                previous: () => <span>Previous</span>,
                next: () => <span>Next</span>,
              }}
            />
          )}
        />
        <div className="text-white cursor-pointer text-[15px] flex items-center justify-center h-[38px] w-[150px] rounded-[5px] font-semibold bg-[rgba(255,255,255,0.2)] gap-3">
          Show {page} of {totalPages}
          <FaAngleDown />
        </div>
      </div>
    </Stack>
  );
};
