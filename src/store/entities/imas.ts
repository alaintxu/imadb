import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configureStore';
import { apiCallBegan } from '../api';
import moment, { Moment } from 'moment';
import { RootState } from '../reducer';

export type IMA = {
    id: string;
    slug: string;
    title: string;
    villain_code: string;
    source_url?: string;
    author_username: string;
    original: boolean;
    description: string;
    special_rules?: string;
    modular_set_codes: string[];
    tags: string[];
}

const IMAS_URL = '/api/imas/';
const IMAS_CACHE_TIME_IN_MINUTES = 5;

export type IMASliceState = {
    list: IMA[];
    loading: boolean;
    lastFetch: Moment | null;
    error: string | null;
}

const initialState: IMASliceState = {
    list: [],
    loading: true,
    lastFetch: null,
    error: null
}

/* Reducer */
const slice = createSlice({
    name: 'imas',
    initialState: initialState,
    reducers: {
        imasRequested: (state) =>{
            state.error = null;
            state.loading = true;
            return state;
            
        },
        imasReceived: (state, action: PayloadAction<IMA[]>) =>{
            state.list = [...action.payload];
            state.loading = false;
            state.lastFetch = moment();
            state.error = null;
            return state;

        },
        imasRequestFailed: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
            return state;
        }
    }
});

/* Reducer exports */
export default slice.reducer;

const {
    imasRequested,
    imasReceived,
    imasRequestFailed
} = slice.actions;

/* Action creators */
export const loadIMAs = (): AppThunk => (dispatch, getState) => {
    const { lastFetch } = getState().entities.imas;

    if (lastFetch) {
        const diffInMinutes = moment().diff(lastFetch, 'minutes');
        if (diffInMinutes < IMAS_CACHE_TIME_IN_MINUTES) return;
    }

    return dispatch(apiCallBegan({
        url: IMAS_URL,
        onStart: imasRequested.type,
        onSuccess: imasReceived.type,
        onError: imasRequestFailed.type
    }));
}

/* Selectors */
export const selectIMAState = (state: RootState) => state.entities.imas;
export const selectIsLoading = createSelector(
    selectIMAState,
    (imaState: IMASliceState) => imaState.loading
);
export const selectAllIMAs = createSelector(
    selectIMAState,
    (imaState: IMASliceState) => imaState.list
);
export const selectIMAById = (id: string) => createSelector(
    selectIMAState,
    (imaState: IMASliceState) => imaState.list.find(ima => ima.id === id)
);
export const selectIMABySlug = (slug: string) => createSelector(
    selectIMAState,
    (imaState: IMASliceState) => imaState.list.find(ima => ima.slug === slug)
);