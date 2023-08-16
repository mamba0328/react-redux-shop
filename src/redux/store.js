import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/rootReducer'
import thunk from 'redux-thunk';

export default configureStore({
    reducer: { rootReducer },
    devTools: true,
    middleware: [thunk],
})