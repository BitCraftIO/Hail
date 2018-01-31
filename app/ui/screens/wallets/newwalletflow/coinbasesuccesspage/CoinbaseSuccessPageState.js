import {createResourceAction, createResourceReducerStates, resourceInitialState} from "hail/app/reduxhelpers/CreateResource";
import createReducer from "hail/app/reduxhelpers/CreateReducer";
import * as queries from "hail/app/ui/screens/wallets/utils/Queries";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import {getAccessToken, listAccounts, listTransactions} from 'hail/app/ui/screens/wallets/network/exchanges/CoinbaseAPI.js'

export const CREATE_REALM_COINBASE_WALLET = "CoinbaseSuccessPage.Action.wallet";
export const CREATE_REALM_COINBASE_WALLET_TAG = "cb";
export const PAGE = "CoinbaseSuccessPage";

export function SuccessCoinbasePageActions(dispatch) {
    console.log(dispatch);
    return {
        createCoinbaseWallet: createResourceAction(dispatch, CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, async (code) => {
            const id = await getAccessToken(code)
            .then(({accessToken, refreshToken}) => {
                console.log(accessToken, refreshToken);
                return actions.createWallet({
                    network: "Coinbase",
                    accessToken,
                    refreshToken,
                });
            })
            .catch(e => {
                return {
                    success: false,
                    errorMessage: e,
                } 
            })
            actions.updateWalletById(id, {
                accounts: await listAccounts(cbwallet.accessToken).map(async ({id, name, currency, balance}) => {
                    return await new CoinbaseAccount({
                        id, 
                        name,
                        currency,
                        transactions: await listTransactions(id).map(async ({id, type, status, amount, description, to}) => {
                            return await new CoinbaseTransaction({
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
            //return queries.getWalletById(id);
            var cbwallet = queries.getWalletById(id);
            return {
                success: true,
                cbwallet,
            }
            // .then((wallet) => {
            //     return {
            //         success: true,
            //         wallet,
            //     }
            // })
            // .catch(e => {
            //     return {
            //         success: false,
            //         errorMessage: e,
            //     }
            // });
        })
    }
}

const initialState = {
    ...resourceInitialState(CREATE_REALM_COINBASE_WALLET_TAG),
}

export const CoinbaseSuccessPageReducer = createReducer(initialState, {
    ...createResourceReducerStates(CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG),
});

