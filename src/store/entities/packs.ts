import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configureStore';
import { apiCallBegan } from '../api';
import moment, { Moment } from 'moment';
import { RootState } from '../reducer';
import { Pack } from '@/lib/packs/packs';

const PACKS_URL = '/api/packs/';
const PACKS_CACHE_TIME_IN_MINUTES = 60;

export type PackSliceState = {
    list: Pack[];
    loading: boolean;
    lastFetch: Moment | null;
    error: string | null;
}

const initialState: PackSliceState = {
    list: [],
    loading: true,
    lastFetch: null,
    error: null
}

/* Reducer */
const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        packsRequested: (state) => {
            state.error = null;
            state.loading = true;
        },
        packsReceived: (state, action: PayloadAction<Pack[]>) => {
            state.list = action.payload;
            state.loading = false;
            state.lastFetch = moment();
            state.error = null;
        },
        packsRequestFailed: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
        }
    }
});

/* Reducer exports */
export default slice.reducer;

const {
   packsRequested,
   packsReceived,
   packsRequestFailed
} = slice.actions; // Do not export

/* Action creators */
export const loadPacks = (): AppThunk => (dispatch, getState) => {
    const { lastFetch } = getState().entities.packs;

    if (lastFetch) {
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if (diffInMinutes < PACKS_CACHE_TIME_IN_MINUTES) return;
    }
    return dispatch(
        apiCallBegan({
            url: PACKS_URL,
            onStart: packsRequested.type,
            onSuccess: packsReceived.type,
            onError: packsRequestFailed.type
        })
    );
}

/* Selectors */
export const selectPackState = (state: RootState) => state.entities.packs;
export const selectIsLoading = createSelector(
    selectPackState,
    (packState: PackSliceState) => packState.loading
);
export const selectAllPacks = createSelector(
    selectPackState,
    (packState: PackSliceState) => packState.list
);

export const selectNumberOfPacks = createSelector(
    selectAllPacks,
    (packs: Pack[]) => packs.length
);

export const selectPackByCode = (packCode: string) => createSelector(
    selectAllPacks,
    (packs: Pack[]) => packs.find((pack: Pack) => pack.code === packCode)
);

export const selectPacksByType = (typeCode: string) => createSelector(
    selectAllPacks,
    (packs: Pack[]) => packs.filter((pack) => pack.pack_type_code === typeCode)
);
