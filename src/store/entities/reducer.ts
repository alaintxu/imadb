import { combineReducers } from "redux";

import setsReducer from "./sets";
import imasReducer from "./imas";
import packsReducer from "./packs";
import uiReducer from "./ui";

export default combineReducers({
    sets: setsReducer,
    imas: imasReducer,
    packs: packsReducer,
    ui: uiReducer,
});