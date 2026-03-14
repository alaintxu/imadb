import { combineReducers } from "redux";

import setsReducer from "./sets";

export default combineReducers({
    sets: setsReducer,
});