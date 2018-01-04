import generateReducer from "../../../../reduxhelpers/CreateReducer";
import { createResourceReducerStates , resourceInitialState } from "../../../../reduxhelpers/CreateResource";
import {RESOURCE_GET_COIN_DATA, RESOURCE_GET_COIN_DATA_TAG} from "./WatchlistActions";


const initialState = {
    ...resourceInitialState(RESOURCE_GET_COIN_DATA_TAG),
}

export default generateReducer(initialState, {
    ...createResourceReducerStates(RESOURCE_GET_COIN_DATA, RESOURCE_GET_COIN_DATA_TAG)
});
