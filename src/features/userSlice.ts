import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@/types/user';

const initialState: UserState = {
    token: '',
    name: '',
    id: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,   
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
