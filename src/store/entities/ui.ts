import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../configureStore';
import { RootState } from '../reducer';

export type UIState = {
    navLoading: boolean;
}

const initialState: UIState = {
    navLoading: false,
}

/* Reducer */
const slice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        navLoadingStarted: (state) =>{
            state.navLoading = true;
            return state;
            
        },
        navLoadingFinished: (state) =>{
            state.navLoading = false;
            return state;
        },
    }
});

/* Reducer export */
export default slice.reducer;

const { navLoadingStarted, navLoadingFinished } = slice.actions;

/* Action Creators */

export const startNavLoading = (): AppThunk => (dispatch) => {
    dispatch(navLoadingStarted());
}

export const finishNavLoading = (): AppThunk => (dispatch) => {
    dispatch(navLoadingFinished());
}

/* Selectors */

export const getNavLoading = (state: RootState) => state.entities.ui.navLoading;