// @flow

import createReducer from "../../../reduxhelpers/CreateReducer";
import {
    createResourceAction, createResourceReducerStates,
    resourceInitialState
} from "../../../reduxhelpers/CreateResource";
import { getCoinGraphData } from "./CoinDetailRequestMapper";

export const PAGE = "CoinDetail"
export const COIN_GRAPH_DATA_RESOURCE = "CoinDetail.Resource.CoinGraphData";
export const COIN_GRAPH_DATA_RESOURCE_TAG = "graphData";

const initialState = {
    ...resourceInitialState(COIN_GRAPH_DATA_RESOURCE_TAG),
    "newsItems": null,
    "price": -1,
    "statistics": null
}

export const CoinDataActions = (dispatch: Function) => {
    return {
        getGraphData: createResourceAction(dispatch, COIN_GRAPH_DATA_RESOURCE, COIN_GRAPH_DATA_RESOURCE_TAG, getCoinGraphData)
    }
}

export const CoinDetailReducer = createReducer(initialState, {
    ...createResourceReducerStates(COIN_GRAPH_DATA_RESOURCE, COIN_GRAPH_DATA_RESOURCE_TAG)
});