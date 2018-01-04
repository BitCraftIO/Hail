// @flow

import createReducer from "../../../reduxhelpers/CreateReducer";
import {
    createResourceAction, createResourceReducerStates,
    resourceInitialState
} from "../../../reduxhelpers/CreateResource";
import {getCoinGraphData, getNews} from "./CoinDetailRequestMapper";

export const PAGE = "CoinDetail"

export const COIN_GRAPH_DATA_RESOURCE = "CoinDetail.Resource.CoinGraphData";
export const COIN_GRAPH_DATA_RESOURCE_TAG = "graphData";

export const COIN_NEWS_RESOURCE = "CoinDetail.Resource.CoinNews";
export const COIN_NEWS_RESOURCE_TAG = "news";

const initialState = {
    ...resourceInitialState(COIN_GRAPH_DATA_RESOURCE_TAG),
    ...resourceInitialState(COIN_NEWS_RESOURCE_TAG),
    "price": -1,
    "statistics": null
}

export const CoinDataActions = (dispatch: Function) => {
    return {
        getGraphData: createResourceAction(dispatch, COIN_GRAPH_DATA_RESOURCE, COIN_GRAPH_DATA_RESOURCE_TAG, getCoinGraphData),
        getNews: createResourceAction(dispatch, COIN_NEWS_RESOURCE, COIN_NEWS_RESOURCE_TAG, getNews)
    }
}

export const CoinDetailReducer = createReducer(initialState, {
    ...createResourceReducerStates(COIN_GRAPH_DATA_RESOURCE, COIN_GRAPH_DATA_RESOURCE_TAG),
    ...createResourceReducerStates(COIN_NEWS_RESOURCE, COIN_NEWS_RESOURCE_TAG)
});