import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IconName, SearcherState} from '@/types/searcher';
import { colors } from '@/styles/colors';
const initialState: SearcherState = {
    searchers: [
        {
            title: 'Profesores',
            placeholder: 'Buscar profesor',
            apiPath: 'teachers/search',
            appPath: '/teacher',
            iconName: IconName.teacher,
            iconColor: colors.green500,
            query: ''
        },
        {
            title: 'Asignaturas',
            placeholder: 'Buscar asignatura',
            apiPath: 'subjects/search',
            appPath: '/subject',
            iconName: IconName.subject,
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
