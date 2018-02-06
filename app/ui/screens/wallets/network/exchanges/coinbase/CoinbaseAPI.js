import {Linking} from 'react-native';
import {clientId, clientSecret, appUri, webUri} from './config';

export function redirectToOAuth() {
    var success = false;
    Linking.canOpenURL(webUri).then(supported => {
        if (supported) {
            Linking.openURL(webUri);
            success = true;
        } else {
            console.log("Doesn't look like we support that Uri "+webUri)
        }
    })
    return success;
}


export function listTransactions(account_id, accessToken) {
    return fetch(`https://api.coinbase.com/v2/accounts/${account_id}/transactions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('CoinbaseAPI.js :: listTransaction api call failed');
        }
        return response.json()
    })
    .then((responseJson) => {
        return responseJson.data;
    })
    .catch(e => {
        console.log(e);
        throw new Error('CoinbaseAPI.js :: listTransaction network call failed');
    })
}

export function listAccounts(accessToken) {
    return fetch('https://api.coinbase.com/v2/accounts', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson.data;
    })
}

export function getAccessToken(auth_code) {
    return fetch('https://api.coinbase.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        },
        body: serializeJSON({
            grant_type: 'authorization_code',
            code: auth_code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'hail://wallet/oauth/coinbase/'
        }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return {
            accessToken: responseJson.access_token,
            refreshToken: responseJson.refresh_token,
        }
    })
}
/*
    //https://developers.coinbase.com/api/v2#send-money
    
    @param account_id: the id of the account[] in CoinbaseWallet
    @param to: crypto address or email
    @param amount: amount to be sent
    @param currency: currency of the tx, ex. BTC, LTC, ETH
    @param description: (optional) description to be associated with tx
    @param fee: (optional) option to choose fee, must be string
    @param idem: (optional) random bit of data to ensure idempotence, must be string
    @param to_financial_institution: Whether this send is to another financial institution or exchange, must be bool
    @param financial_institution_website: The website of the financial institution or exchange.

    //Note: Must have to_financial_institution and financial_institution_website to send tx > $3k
*/ 
export function send(account_id, options) {
    const body = {
        type: 'send',
        to: options.to,
        amount: options.amount,
        currency: options.currency,
    }

    //TODO: Maybe make a prototype that cleans the object of null/undefined keys
    if (options.description) {
        body.description = options.description;
    }
    if (options.fee) {
        body.fee = options.fee;
    }
    if (options.idem) {
        body.idem = options.idem;
    }
    if (options.to_financial_institution) {
        body.to_financial_institution = options.to_financial_institution;
    }
    if (options.financial_institution_website) {
        body.financial_institution_website = options.financial_institution_website;
    }

    return fetch(`https://api.coinbase.com/v2/accounts/${account_id}/transactions`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: serializeJSON(body),
    })
}

function serializeJSON(data) {
    return Object.keys(data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}
