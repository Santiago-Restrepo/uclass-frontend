import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavigationState } from '@/types/navigation';

const initialState: NavigationState = {
    previousPath: '',
    navigation: []
};

export const navigationSlice = createSlice({
    name: 'nagation',
    initialState,   
    reducers: {
        setPreviousPath: (state, action: PayloadAction<string>) => {
            state.previousPath = action.payload;
        },
        setNavigation: (state, action: PayloadAction<string[]>) => {
            state.navigation = action.payload;
        }
    },
});

export const { setNavigation, setPreviousPath} = navigationSlice.actions;
export default navigationSlice.reducer;
