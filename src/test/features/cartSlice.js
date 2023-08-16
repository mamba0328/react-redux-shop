import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../../api/getProducts'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await userAPI.fetchUser()
    return response.data
})

const initialState = {
    name: 'No cart',
    status: 'idle'
}

const cartSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'complete'
            state.name = action.payload
        })
    }
})

export const selectUserName = state => state.cart.name
export const selectUserFetchStatus = state => state.cart.status

export default cartSlice.reducer