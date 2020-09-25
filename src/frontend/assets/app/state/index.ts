import { combineReducers } from "redux";
import { globalAppStateReducer } from './globalAppState';

const root = combineReducers({
    globalAppState: globalAppStateReducer
});

export default root;