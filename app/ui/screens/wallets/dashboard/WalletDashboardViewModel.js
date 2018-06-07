// @flow

import type {State as WalletDashboardState} from "app/ui/screens/wallets/dashboard/WalletDashboard"
import ViewModel from "../../../../ViewModel"
import {getLocalWallets, getExchangeWallets} from "../../../../localstorage/db/utils/Queries"

export default class WalletDashboardViewModel extends ViewModel<WalletDashboardState> {
    currentState: WalletDashboardState = {
        wallets: null
    }

    loadWallets() {
        this.update({
            wallets: {
                local: getLocalWallets(),
                exchange: getExchangeWallets()
            }
        })
    }
}