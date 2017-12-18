import { combineReducers } from 'redux';
import SearchReducer from "./../ui/search/SearchReducer";

export default combineReducers({
    search: SearchReducer
});