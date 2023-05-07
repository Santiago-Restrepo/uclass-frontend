import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types/user';

const initialState: User = {
    token: '',
    name: '',
    id: '',
    email: '',
    roles: [],
    photo: ''

};

export const userSlice = createSlice({
    name: 'user',
    initialState,   
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.roles = action.payload.roles;
            state.photo = action.payload.photo;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
