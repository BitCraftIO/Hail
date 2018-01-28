import {createResourceAction, createResourceReducerStates, resourceInitialState} from "../../../../reduxhelpers/CreateResource";
import createReducer from "../../../../reduxhelpers/CreateReducer";
import * as queries from "hail/app/ui/screens/wallets/utils/Queries";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import {getAccessToken, listAccounts, listTransactions} from 'hail/app/ui/screens/wallets/network/exchanges/CoinbaseAPI.js'

export const CREATE_REALM_COINBASE_WALLET = "CoinbaseSuccessPage.Action.wallet";
export const CREATE_REALM_COINBASE_WALLET_TAG = "cb";
export const PAGE = "CoinbaseSuccessPage";

export function SuccessCoinbasePageActions(dispatch) {
    return {
        createCoinbaseWallet: createResourceAction(code, dispatch, CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, async () => {
            getAccessToken(code)
            .then((accessToken, refreshToken) => {
                return actions.createWallet({
                    network: "Coinbase",
                    accessToken,
                    refreshToken,
                });
            })
            .then(id => {
                var cbwallet = queries.getWalletById(id);
                actions.updateWalletById(id, {
                    accounts: listAccounts(cbwallet.accessToken).map(({id, name, currency, balance}) => {
                        return new CoinbaseAccount({
                            id, 
                            name,
                            currency,
                            transactions: listTransactions(id).map(({id, type, status, amount, description, to}) => {
                                return new CoinbaseTransaction({
                                    id,
                                    type,
                                    amount: amount.amount,
                                    currency: amount.currency,
                                    description: description.title,
                                    to: to.id,
                                    toType: to.resource,
                                });
                            })
                        });
                    })
                });
                return queries.getWalletById(id);
            })
            .then((wallet) => {
                return {
                    success: true,
                    wallet,
                }
            })
            .catch(e => {
                return {
                    success: false,
                    errorMessage: e,
                }
            })
    }
}

const initialState = {
    ...resourceInitialState(CREATE_REALM_COINBASE_WALLET_TAG),
}

export const SuccessCoinbasePageReducer = createReducer(initialState, {
    ...createResourceReducerStates(CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG),
});

