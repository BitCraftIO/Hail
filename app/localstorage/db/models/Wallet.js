// @flow

import Realm from 'realm';

export type WalletT = {
    name: string,
    id: number,
    value: number,
    coin: string,
    walletType: string,
    network: string,
    mnemonic: string,
    privateKey: string,
    transactions: any[],
    internalAddresses: any[],
    externalAddresses: any[]
};

export default class Wallet extends Realm.Object {}
Wallet.schema = {
    name: 'Wallet',
    primaryKey: 'id',
    properties: {
        name: { type: 'string', default: 'Your Wallet' },
        id: 'int',
        value: { type: 'double', default: 0.0 },
        walletType: 'string', //HD, PAIR,
        coin: 'string', //BTC, ETH, BCH, LTC, XMR
        network: 'string', //MAIN, TEST, ROPSTEN, RINKEBY, KOVAN
        mnemonic: 'string',
        privateKey: 'string',
        transactions: { type: 'WalletTransaction[]', default: [] },
        internalAddresses: 'WalletAddress[]',
        externalAddresses: 'WalletAddress[]'
    }
};
