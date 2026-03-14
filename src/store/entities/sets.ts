import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../configureStore';
import { apiCallBegan } from '../api';
import moment, { Moment } from 'moment';

export type CardSetType = 'level' | 'villain' | 'modular' | 'nemesis' | 'unknown' | 'other';

export type CardSet = {
    code: string;
    name: string;
    set_type: CardSetType;
}

const SETS_URL = '/api/sets/';
const SETS_CACHE_TIME_IN_MINUTES = 10;



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
        /*
        unloadPackCards: (state, action: PayloadAction<string>) => {
            const packCode = action.payload;
            const pack = state.list.find((pack: Pack) => pack.code === packCode);
            if (pack) {
                pack.download_status = "unselected";
                pack.download_date = 0;
            }
            // @ToDo: Remove cards from store
            return state;
        },
        packCardsRequested: (state, action: PayloadAction<string>) => {
            const packCode = action.payload;
            const packIndex = state.list.findIndex((pack: Pack) => pack.code === packCode);
            if (packIndex === -1) return state;
            state.list[packIndex].download_status = "downloading";
            return state;
        },
        packCardsReceived: (state, action: PayloadAction<MCCard[]>) => {
            const cards: MCCard[] = action.payload;
            if (cards.length === 0) return state;

            const packCode = cards[0].pack_code;
            const index = state.list.findIndex((pack: Pack) => pack.code === packCode);
            if (index !== -1) {
                state.list[index].download_status = "downloaded";
                state.list[index].download_date = Date.now();
                state.list[index].error = "";
                // @ToDo: Remove old cards and add new cards to store
            }
            return state;
        },
        packCardsRequestFailed: (state, action: PayloadAction<{error: string, errorPayload: string}>) => {
            const packCode = action.payload.errorPayload;
            const error = action.payload.error;
            const index = state.list.findIndex((pack: Pack) => pack.code === packCode);
            if (index !== -1) {
                state.list[index].download_status = "error";
                state.list[index].download_date = 0;
                state.list[index].error = error;
            }
            return state;
        },
        packTranslationsReceived(state, action: PayloadAction<PackTranslation[]>) {
            const translations: PackTranslation[] = action.payload;
            for (let translation of translations) {
                const index = state.list.findIndex((pack: Pack) => pack.code === translation.code);
                if (index !== -1) {
                    state.list[index].name = translation.name;
                }
            }
            state.loading = false;
            state.lastFetch = moment();
            state.error = null;
            return state;
        },
        packsRequested(state) {
            state.error = "";
            state.loading = true;
            return state;
        },
        packsReceived(state, action: PayloadAction<Pack[]>) {
            const newPacks = action.payload;

            for (let newPack of newPacks) {
                const index = state.list.findIndex((oldPack: Pack) => oldPack.code === newPack.code);
                if (index !== -1) {
                    state.list[index] = {
                        ...newPack,
                        download_date: state.list[index].download_date,
                        download_status: state.list[index].download_status
                    }
                }else{
                    state.list.push(newPack);
                }
            }

            state.loading = false;
            state.lastFetch = Date.now();
            state.error = null;
            return state;
        },
        // For POST (as example, not needed)
        // packAdded(state, action: PayloadAction<Pack>) {
        //     state.list.push(action.payload);
        //     return state;
        // },
        packsRequestFailed(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
            return state;
        }
            */
    }
});

/* Reducer exports */
export default slice.reducer;


const {
    /*packsRequested,
    packAdded,
    packsReceived,
    packsRequestFailed,
    packCardsReceived,
    packCardsRequested,
    packCardsRequestFailed,
    packTranslationsReceived: packTranslationReceived
    */
   setsRequested,
   setsReceived,
   setsRequestFailed
} = slice.actions; // Do not export, as they are events and not commands. Events should be internal.

/*export const {
    unloadPackCards
} = slice.actions;*/


/* Action creators */
export const loadSets = () => (dispatch: AppDispatch, getState: () => RootState) => {

    /*
    ** Get list of sets from the database (using api)
    ** if the last fetch was more than 10 minutes ago
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

/*
export const selectArePacksLoading = createSelector(
    selectPackState,
    (packState: PackSliceState) => packState.loading
);

export const selectLastFetch = createSelector(
    selectPackState,
    (packState: PackSliceState) => packState.lastFetch
);

export const selectPacksError = createSelector(
    selectPackState,
    (packState: PackSliceState) => packState.error
);

export const selectPackStatusByCode = (packCode: string) => createSelector(
    selectPackByCode(packCode),
    (pack: Pack | undefined) => pack?.download_status
);

export const selectIsAnyPackDownloading = createSelector(
    selectAllPacks,
    (packs: Pack[]) => packs.some((pack: Pack) => pack.download_status === "downloading")
);

export const selectNumberOfDownloadedPacks = createSelector(
    selectAllPacks,
    (packs: Pack[]) => packs.filter((pack: Pack) => pack.download_status === "downloaded").length
);

export const selectPackStatusBootstrapVariant = createSelector(
    selectNumberOfPacks,
    selectNumberOfDownloadedPacks,
    selectIsAnyPackDownloading,
    (numberOfPacks: number, numberOfDownloadedPacks:number, isAnyPackDownloading: boolean) => {
        if (isAnyPackDownloading) return "dark";
        const packRatio = numberOfDownloadedPacks / numberOfPacks;
        if (packRatio === 1) return "success";
        if (packRatio < 0.25) return "danger";
        return "warning";
    }
);
*/