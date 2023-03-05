import userSlice from '@/features/userSlice'
import { configureStore } from '@reduxjs/toolkit'

// config the store 
const store= configureStore({
    reducer: {
        user: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store