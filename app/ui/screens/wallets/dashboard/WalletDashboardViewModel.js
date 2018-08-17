// @flow

import type {State as WalletDashboardState} from "app/ui/screens/wallets/dashboard/WalletDashboard"
import ViewModel from "../../../../ViewModel"
import {getLocalWallets, getExchangeWallets} from "../../../../localstorage/db/utils/Queries"
import { getCoinGraphData, getPriceFromGraphData } from '../../../../coin/CoinRequestGraphMapper';

export default class WalletDashboardViewModel extends ViewModel<WalletDashboardState> {
    currentState: WalletDashboardState = {
        wallets: null,
        priceData: null
    }

    loadWallets() {
        this.update({
            wallets: {
                local: getLocalWallets(),
                exchange: getExchangeWallets()
            }
        })

        this.loadPriceData();
    }

    async loadPriceData() {
        let wallets = [
            ...this.currentState.wallets.local,
            ...this.currentState.wallets.exchange
        ];
        let priceData = {};

        for (let i = 0; i < wallets.length; i++) {
            let coin = wallets[i].coin;
            if (!priceData[coin]) {
                priceData[coin] = {};
                priceData[coin].graphData = await getCoinGraphData(coin);
                priceData[coin].price = getPriceFromGraphData(priceData[coin].graphData)
            }
        }

        this.update({
            priceData: priceData
        })
    }
}