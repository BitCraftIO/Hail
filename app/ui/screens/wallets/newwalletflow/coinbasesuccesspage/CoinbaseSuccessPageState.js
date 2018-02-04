import {createResourceAction, createResourceReducerStates, resourceInitialState} from "hail/app/reduxhelpers/CreateResource";
import createReducer from "hail/app/reduxhelpers/CreateReducer";
import * as queries from "hail/app/ui/screens/wallets/utils/Queries";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import {getAccessToken, listAccounts, listTransactions} from 'hail/app/ui/screens/wallets/network/exchanges/CoinbaseAPI.js';
import CoinbaseAccount from "../../models/CoinbaseAccount";
import CoinbaseTransaction from "../../models/CoinbaseTransaction";


export const CREATE_REALM_COINBASE_WALLET = "CoinbaseSuccessPage.Action.wallet";
export const CREATE_REALM_COINBASE_WALLET_TAG = "cb";
export const PAGE = "CoinbaseSuccessPage";

export function SuccessCoinbasePageActions(dispatch) {
    return {
        createCoinbaseWallet: createResourceAction(dispatch, CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, async (code) => {
            const {accessToken, refreshToken} = await getAccessToken(code);
            // console.log(accessToken);
            // const w = listAccounts(accessToken);
            // w.then(accounts => {
            //     //const transactions = listTransactions(accounts[0].id, accessToken)
            //     const transactions = fetch(`https://api.coinbase.com/v2/accounts/${accounts[0].id}/transactions`, {
            //         method: 'GET',
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         }
            //     })
            //     .then((response) => response.json())
            //     .then((response) => {
            //         console.log(response)
            //         return response;
            //     })
            //     .catch(e => {
            //         throw new Error("listTransaction FAILED!")
            //     })
            //     console.log(transactions);
                // Promise.all(accounts.map(({id, name, currency, balance}) => {
                //     const transactions = listTransactions(id, accessToken)
                //     // transactions.then((txs) => {
                //     //     txs.map(({id, type, status, amount, description, to}) => {
                //     //         console.log(id, type, status, amount, description, to)
                //     //     })
                //     // })
                //     //const cb = new CoinbaseAccount(id, name, currency, balance);
                //     //console.log(cb);
                //     transactions.then((txs) => console.log(txs));
                //     return {id, name, currency, balance, transactions}
                // })).then((accounts) => console.log(accounts));
            //})
            listAccounts(accessToken)
            .then(accounts => {
                return Promise.all(accounts.map(({id, name, currency, balance}) => {
                    return new CoinbaseAccount({
                        id, 
                        name, 
                        currency, 
                        balance, 
                        transactions: listTransactions(id, accessToken)
                        .then(txs => {
                            return txs.map(({id, type, status, amount, description, to}) => {
                                return new CoinbaseTransaction({
                                    id,
                                    type,
                                    amount: amount.amount,
                                    currency: amount.currency,
                                    description: description.title,
                                    to: to.id,
                                    toType: to.resource,
                                })
                            })
                        })
                    })
                }))
            })
            .then(accounts => {
                console.log(accounts)
            })
            // const cbwallet = actions.createWallet({
            //     network: "Coinbase",
            //     name: "Coinbase",
            //     accessToken,
            //     refreshToken,
            //     accounts,
            // })  
            // console.log(cbwallet)

            //v1
            // const accounts = await listAccounts(accessToken)
            

            // const id = actions.createWallet({
            //     network: "Coinbase",
            //     name: "Coinbase",
            //     accessToken,
            //     refreshToken,
            // });

            // const cbwallet = queries.getWalletbyId(id)[0];
            // const accounts = await listAccounts(cbwallet.accessToken)
            // Promise.all(accounts.map(async ({id, name, currency, balance}) => {
            // // const accounts = (await listAccounts(cbwallet.accessToken)).map( async ({id, name, currency, balance}) => {
            //     const transactions = await listTransactions(id, cbwallet.accessToken)
            //     Promise.all(transactions.map(({id, type, status, amount, description, to}) => {
            //         return new CoinbaseTransaction({
            //             id,
            //             type,
            //             amount: amount.amount,
            //             currency: amount.currency,
            //             description: description.title,
            //             to: to.id,
            //             toType: to.resource,
            //         });
            //     }))
            //     .then( cbtx => {
            //         return new CoinbaseAccount({
            //             id, 
            //             name,
            //             currency,
            //             transactions: cbtx,
            //         });
            //     })
            // }))
            // .then(accounts => actions.updateWalletById(id, { accounts }))
            // .catch(e => console.log(e));

            // return {
            //     success: true,
            //     cbwallet,
            // }
        })
    }
}

const initialState = {
    ...resourceInitialState(CREATE_REALM_COINBASE_WALLET_TAG),
}

export const CoinbaseSuccessPageReducer = createReducer(initialState, {
    ...createResourceReducerStates(CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG),
});

