import { combineReducers } from "redux";

import setsReducer from "./sets";
import imasReducer from "./imas";

export default combineReducers({
    sets: setsReducer,
    imas: imasReducer
});