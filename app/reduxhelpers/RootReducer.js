import { combineReducers } from 'redux';
import SearchReducer from "../ui/search/state/SearchReducer";

export default combineReducers({
    search: SearchReducer
});