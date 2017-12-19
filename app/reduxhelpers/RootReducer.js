import { combineReducers } from 'redux';
import SearchReducer from "../ui/screens/search/state/SearchReducer";

export default combineReducers({
    search: SearchReducer
});