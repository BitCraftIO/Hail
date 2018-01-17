import {createResourceAction, createResourceReducerStates, resourceInitialState} from "../../../../reduxhelpers/CreateResource";
import createReducer from "../../../../reduxhelpers/CreateReducer";

import * as queries from "../../../../localstorage/Queries";

export const WALLET_LIST_DATA_RESOURCE = "WalletDetailsPage.Resource.wallets";
export const WALLET_LIST_DATA_RESOURCE_TAG = "wallets";
export const PAGE = "WalletList";

export function WalletListAction(dispath) {
    return {
        getWallets: createResourceAction(dispath, WALLET_LIST_DATA_RESOURCE, WALLET_LIST_DATA_RESOURCE_TAG, () => {
            return new Promise((resolve, reject) => {
                resolve({
                    local: queries.getLocalWallets(),
                    exchange: queries.getExchangeWallets()
                })
            })
        }),
    }
}

const initialState = {
    ...resourceInitialState(WALLET_LIST_DATA_RESOURCE_TAG),
}

export const WalletsListReducer = createReducer(initialState, {
    ...createResourceReducerStates(WALLET_LIST_DATA_RESOURCE, WALLET_LIST_DATA_RESOURCE_TAG),
});

