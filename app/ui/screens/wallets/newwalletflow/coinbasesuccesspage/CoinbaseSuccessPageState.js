import {createResourceAction, createResourceReducerStates, resourceInitialState} from "hail/app/reduxhelpers/CreateResource";
import createReducer from "hail/app/reduxhelpers/CreateReducer";
import * as queries from "hail/app/ui/screens/wallets/utils/Queries";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import {getAccessToken, listAccounts, listTransactions} from 'hail/app/ui/screens/wallets/network/exchanges/coinbase/CoinbaseAPI.js';
import CoinbaseAccount from "../../models/CoinbaseAccount";
import CoinbaseTransaction from "../../models/CoinbaseTransaction";


export const CREATE_REALM_COINBASE_WALLET = "CoinbaseSuccessPage.Action.wallet";
export const CREATE_REALM_COINBASE_WALLET_TAG = "cb";
export const PAGE = "CoinbaseSuccessPage";

export function SuccessCoinbasePageActions(dispatch) {
    return {
        createCoinbaseWallet: createResourceAction(dispatch, CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, async (code) => {
            // A small moment of silence to all those who perished in the battles taken place below. 
            const {accessToken, refreshToken} = await getAccessToken(code);   
            return { 
                id: listAccounts(accessToken).then(accounts => {
                    return Promise.all(accounts.map((account) => {
                        return listTransactions(account.id, accessToken)
                        .then(txs => {
                            return txs.map(({id, type, status, amount, description, to}) => {

                                //'to' doesn't appear on buys
                                if (type == 'buy') {
                                    to = {
                                        id: 'Account',
                                        resource: type,
                                    }
                                }
                                if (to.address) {
                                    to.id = to.address;
                                }
                                //if more version of 'to' appear, add elseifs here to handle
                                return {
                                    id,
                                    type,
                                    amount: Number(amount.amount),
                                    currency: amount.currency,
                                    //description: description? description.title : "Unavailable",
                                    to: to.id,
                                    toType: to.resource,
                                };
                            })
                        })
                        .then(transactions => {
                            return {
                                id: account.id,
                                name: account.name, 
                                currency: account.currency,
                                balance: Number(account.balance.amount),
                                transactions,
                            };
                        })
                    }))
                })
                .then(accounts => {   
                    return actions.createWallet({
                        network: "Coinbase",
                        name: "Coinbase",
                        accessToken,
                        refreshToken,
                        accounts,
                    })
                })
            }
        })
    }
}

const initialState = {
    ...resourceInitialState(CREATE_REALM_COINBASE_WALLET_TAG),
}

export const CoinbaseSuccessPageReducer = createReducer(initialState, {
    ...createResourceReducerStates(CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG),
});

