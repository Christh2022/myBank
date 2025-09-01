import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import type { User } from '../../utils/Types';


type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    // Optionnel : pour effacer le user si besoin
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { getUser, clearUser } = userSlice.actions;
export const user = (state: RootState) => state.user.user
export default userSlice.reducer;
