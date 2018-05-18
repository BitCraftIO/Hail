import * as Db from 'hail/app/localstorage/db/Db.js';

export function getWalletbyId(id) {
    let results = Db.query('Wallet', 'id = ' + id);
    return results;
}

export function getExchangeWallets() {
    let results = Db.query('APIWallet');
    return results;
}

export function getLocalWallets() {
    let results = Db.query('Wallet');
    return results;
}

/**
 * Counts Local Wallets
 * @param {string} param an attribute on the walletType
 */
export function countWallets(param) {
    return getLocalWallets().reduce((walletCount, wallet) => {
        if (walletCount[wallet[param]] == undefined) {
            walletCount[wallet[param]] = 1;
        } else {
            walletCount[wallet[param]] += 1;
        }
    }, {});
}

/**
 * Collects and sorts addresses by cointype
 * Exclusively used by SyncManager
 */
export function collectAddresses() {
    const result = getLocalWallets().reduce((addresses, wallet) => {
        const results = addresses[wallet.coin] ? addresses[wallet.coin] : [];
        results.push(wallet.addresses.map(addr => addr.string));
        addresses[wallet.coin] = results;
        return addresses;
    }, {});

    return result;
}
