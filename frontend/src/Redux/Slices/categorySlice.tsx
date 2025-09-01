import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import type { Category } from '../../utils/Types';


type categoryState = {
  category: Category[] | null;
};

const initialState: categoryState = {
  category: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category[]>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const categories = (state: RootState) => state.category.category
export default categorySlice.reducer;