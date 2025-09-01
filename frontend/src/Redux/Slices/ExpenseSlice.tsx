import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import type { Transaction } from '../../Pages/Expenses/Expenses';
import type { RowData } from '../../utils/Types';

type expenseState = {
  transactions: Transaction[] | RowData[];
};

const initialState: expenseState = {
  transactions: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
  },
});

export const { setTransactions } = expenseSlice.actions;
export const expense = (state: RootState) => state.expense.transactions
export default expenseSlice.reducer;