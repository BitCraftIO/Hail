import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import CoinbaseSuccessPage from './ui/screens/wallets/coinbase/CoinbaseSuccessPageContainer';
import CreateWallet from './ui/screens/wallets/createwallet/CreateWallet';
import WalletPager from './ui/screens/wallets/dashboard/WalletPager';
import TransactionPage from './ui/screens/wallets/transactionflow/TransactionPage';
import LogPage from './ui/screens/logger/LogPage';
import SettingsPage from './ui/screens/settings/SettingsPage';
import ModifySettingsScreen from './ui/screens/settings/ModifySettingsScreen';

const DashboardStack = StackNavigator(
    {
        Home: {
            screen: Home
        },

        LogPage: {
            screen: LogPage
        },

        WalletPager: {
            screen: WalletPager
        },

        TransactionPage: {
            screen: TransactionPage
        },

        CoinbaseSuccessPage: {
            screen: CoinbaseSuccessPage,
            path: 'wallet/oauth/coinbase/'
        },

        SettingsPage: {
            screen: SettingsPage
        }
    },
    {
        headerMode: 'none'
    }
);

const CreateWalletStack = StackNavigator(
    {
        CreateWallet: {
            screen: CreateWallet
        }
    },
    {
        headerMode: 'none'
    }
);

const ModifySettingsStack = StackNavigator(
    {
        ModifySettingsScreen: {
            screen: ModifySettingsScreen
        }
    },
    {
        headerMode: 'none'
    }
);

const Stacks = {
    CreateWallet: 'CreateWallet',
    Dashboard: 'Dashboard',
    ModifySettings: 'ModifySettings'
};

class Navigator extends React.Component {
    state = {
        currentStack: Stacks.Dashboard,
        shouldRefresh: false
    };

    render() {
        const { currentStack, shouldRefresh } = this.state;
        const screenProps = {
            toCreateWallet: () => {
                this.setState({ currentStack: Stacks.CreateWallet });
            },

            toDashboard: (shouldRefresh = false) => {
                this.setState({ currentStack: Stacks.Dashboard, shouldRefresh });
            },

            toModifySettings: () => {
                this.setState({ currentStack: Stacks.ModifySettings });
            }
        };

        switch (currentStack) {
            case Stacks.Dashboard:
                return <DashboardStack screenProps={{ ...screenProps, shouldRefresh }} />;
            case Stacks.CreateWallet:
                return <CreateWalletStack screenProps={screenProps} />;
            case Stacks.ModifySettings:
                return <ModifySettingsStack screenProps={screenProps} />;
            default:
                throw `Invalid stack name: ${currentStack}`;
        }
    }
}

export default Navigator;
