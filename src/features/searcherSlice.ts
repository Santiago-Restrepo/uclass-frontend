import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SearcherState} from '@/types/searcher';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {BsBook} from 'react-icons/bs';
import { colors } from '@/styles/colors';

const initialState: SearcherState = {
    searchers: [
        {
            title: 'Profesores',
            placeholder: 'Buscar profesor',
            Icon: FaChalkboardTeacher,
            iconColor: colors.green500,
            query: ''
        },
        {
            title: 'Asignaturas',
            placeholder: 'Buscar asignatura',
            Icon: BsBook,
            iconColor: colors.yellow500,
            query: ''
        }
    ],
    activeSearcher: null

};

export const userSlice = createSlice({
    name: 'searcher',
    initialState,   
    reducers: {
        setQuery: (state, action: PayloadAction<{query: string, searcher: string}>) => {
            const {query, searcher} = action.payload;
            const searcherIndex = state.searchers.findIndex(s => s.title === searcher);
            state.searchers[searcherIndex].query = query;
        },
        setActiveSearcher: (state, action: PayloadAction<string | null>) => {
            state.activeSearcher = action.payload;
        }
    },
});

export const { setQuery, setActiveSearcher } = userSlice.actions;
export default userSlice.reducer;
