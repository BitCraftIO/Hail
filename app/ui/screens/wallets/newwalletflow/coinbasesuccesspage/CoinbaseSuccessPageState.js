import { createResourceAction, createResourceReducerStates, resourceInitialState } from 'hail/app/reduxhelpers/CreateResource';
import createReducer from 'hail/app/reduxhelpers/CreateReducer';
import * as queries from 'hail/app/ui/screens/wallets/utils/Queries';
import * as actions from 'hail/app/ui/screens/wallets/utils/Actions';
import { getAccessToken, listAccounts, listTransactions } from 'hail/app/crypto/network/exchanges/coinbase/CoinbaseAPI.js';
import APIAccount from 'hail/app/localstorage/db/models/APIAccount';
import APITransaction from 'hail/app/localstorage/db/models/APITransaction';

export const CREATE_REALM_COINBASE_WALLET = 'CoinbaseSuccessPage.Action.wallet';
export const CREATE_REALM_COINBASE_WALLET_TAG = 'cb';
export const PAGE = 'CoinbaseSuccessPage';

export function SuccessCoinbasePageActions(dispatch) {
    return {
        createCoinbaseWallet: createResourceAction(dispatch, CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, async code => {
            // A small moment of silence to all those who perished in the battles taken place below.
            const { accessToken, refreshToken } = await getAccessToken(code);
            return {
                id: listAccounts(accessToken)
                    .then(accounts => reduceAccounts(accounts, accessToken))
                    .then(accounts => {
                        return actions.createAPIWallet({
                            api: 'Coinbase',
                            name: 'Coinbase',
                            accessToken,
                            refreshToken,
                            accounts
                        });
                    })
            };
        })
    };
}

function reduceAccounts(accounts, accessToken) {
    return Promise.all(
        accounts.map(account => {
            return listTransactions(account.id, accessToken)
                .then(txs => reduceTransactions(txs))
                .then(transactions => {
                    return {
                        id: account.id,
                        name: account.name,
                        currency: account.currency,
                        balance: Number(account.balance.amount),
                        transactions
                    };
                });
        })
    );
}

function reduceTransactions(txs) {
    return txs.map(({ id, type, status, amount, description, to }) => {
        //'to' doesn't appear on buys
        if (type == 'buy') {
            to = {
                id: 'Account',
                resource: type
            };
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
            to: to.id,
            toType: to.resource
        };
    });
}

const initialState = {
    ...resourceInitialState(CREATE_REALM_COINBASE_WALLET_TAG)
};

export const CoinbaseSuccessPageReducer = createReducer(initialState, {
    ...createResourceReducerStates(CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG)
});
