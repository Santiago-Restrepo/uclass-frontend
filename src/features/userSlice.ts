import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@/types/user';

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,   
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<UserState['user']>) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
