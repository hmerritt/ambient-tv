import { combineReducers } from "redux";

import bgImageReducer from "./bgImageReducer";

export default combineReducers({
    bgImage: bgImageReducer
});
