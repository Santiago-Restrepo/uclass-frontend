import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@/types/user';

const initialState: UserState = {
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,   
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.token = action.payload.token;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
