import {Linking} from 'react-native';

//TODO: save these creds in a config file
const clientId = "e6f835288c8bcecd7dfafb7e9a073b2b83d95b6a1f4f5f6fefeca0f345a93326";
const clientSecret = "2a9617bfc208fa9b7c796916c6ed8f2bd51a4b61add007e4d342d7f6ace2fe2f";
const appUri = "";
const webUri = `https://www.coinbase.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=wallet:accounts:read,wallet:accounts:create,wallet:addresses:read,wallet:addresses:create,wallet:buys:read,wallet:buys:create,wallet:deposits:read,wallet:user:email,wallet:withdrawals:read`

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

export function listTransactions(account_id) {
    return fetch(`https://api.coinbase.com/v2/accounts/${account_id}/transactions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        resolve(responseJson.data);
    })
    .catch(e => {
        reject(e);
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

export function getAccessToken(auth_code){
    // return new Promise((resolve, reject) => {
    //     const responseJson = fetch('https://api.coinbase.com/oauth/token', {
    //         method: 'POST',
    //         headers: {},
    //         body: JSON.stringify({
    //             grant_type: 'authorization_code',
    //             code: auth_code,
    //             client_id: clientId,
    //             client_secret: clientSecret,
    //             redirect_uri: 'hail://wallet/oauth/coinbase/redirect'
    //         })
    //     })
    //     .then((response) => {
    //         if (!response.ok) {
    //             reject(err);
    //         }
    //         else {
    //             resolve(response.json());
    //         }
    //     })
    //     console.log("We out here"+ responseJson);
    //     resolve({
    //         accessToken: responseJson.access_token,
    //         refreshToken: responseJson.refresh_token,
    //     })
    // })
    
    
    //v1
    return fetch('https://api.coinbase.com/oauth/token', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: auth_code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'hail://wallet/oauth/coinbase/redirect'
        })
    })
    .then((response) => {
        console.log(response.json());
        if(!response.ok){
            throw new Error (response.statusText)
        }
        return response.json();
    })
    .then((responseJson) => {
        return {
            accessToken: responseJson.access_token,
            refreshToken: responseJson.refresh_token,
        }
    })
}