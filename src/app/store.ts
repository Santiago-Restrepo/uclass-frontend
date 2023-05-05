import userSlice from '@/features/userSlice'
import searcherSlice from '@/features/searcherSlice'
import navigationSlice from '@/features/navigationSlice'
import { configureStore } from '@reduxjs/toolkit'

// config the store 
const store = configureStore({
    reducer: {
        user: userSlice,
        searcher: searcherSlice,
        navigation: navigationSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store