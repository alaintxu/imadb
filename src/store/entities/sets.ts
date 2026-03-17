import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configureStore';
import { apiCallBegan } from '../api';
import moment, { Moment } from 'moment';
import { RootState } from '../reducer';

export type CardSetType = 'level' | 'villain' | 'modular' | 'nemesis' | 'unknown' | 'other';

export type CardSet = {
    code: string;
    name: string;
    set_type: CardSetType;
}

const SETS_URL = '/api/sets/';
const SETS_CACHE_TIME_IN_MINUTES = 60;



export type SetSliceState = {
    list: CardSet[];
    loading: boolean;
    lastFetch: Moment | null;
    error: string | null;
}

const initialState: SetSliceState = {
    list: [],
    loading: true,
    lastFetch: null,
    error: null
}

/* Reducer */
const slice = createSlice({
    name: 'sets',
    initialState: initialState,
    reducers: {
        setsRequested: (state) =>{
            state.error = null;
            state.loading = true;
            return state;
            
        },
        setsReceived: (state, action: PayloadAction<CardSet[]>) =>{
            state.list = [...action.payload];
            state.loading = false;
            state.lastFetch = moment();
            state.error = null;
            return state;

        },
        setsRequestFailed: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
            return state;
        }
    }
});

/* Reducer exports */
export default slice.reducer;


const {
   setsRequested,
   setsReceived,
   setsRequestFailed
} = slice.actions; // Do not export, as they are events and not commands. Events should be internal.


/* Action creators */
export const loadSets = (): AppThunk => (dispatch, getState) => {

    /*
    ** Get list of sets from the database (using api)
    ** if the last fetch was more than 60 minutes ago
    */
    const { lastFetch } = getState().entities.sets;

    if (lastFetch) {
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if (diffInMinutes < SETS_CACHE_TIME_IN_MINUTES) return;
    }
    return dispatch(
        apiCallBegan({
            url: SETS_URL,
            onStart: setsRequested.type,
            onSuccess: setsReceived.type,
            onError: setsRequestFailed.type
        })
    );
}

/* Selectors */
export const selectSetState = (state: RootState) => state.entities.sets;
export const selectIsLoading = createSelector(
    selectSetState,
    (setState: SetSliceState) => setState.loading
);
export const selectAllSets = createSelector(
    selectSetState,
    (setState: SetSliceState) => setState.list
);

export const selectNumberOfSets = createSelector(
    selectAllSets,
    (sets: CardSet[]) => sets.length
);

export const selectSetByCode = (setCode: string) => createSelector(
    selectAllSets,
    (sets: CardSet[]) => sets.find((set: CardSet) => set.code === setCode)
);

export const selectSetsByType = (setType: CardSetType) => createSelector(
    selectAllSets,
    (sets: CardSet[]) => sets.filter((set)=> set.set_type === setType)
)
