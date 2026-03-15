import { combineReducers } from 'redux';
import entitiesReducer from './entities/reducer';
//import uiReducer from './ui/reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    //ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
