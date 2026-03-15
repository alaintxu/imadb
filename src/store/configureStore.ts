/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import reducer, {type RootState } from './reducer';
import api from './middleware/api';

export const createStore = (preloadedState?: any) => configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(api),
    preloadedState
});

const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;
export type { RootState };


export default store;