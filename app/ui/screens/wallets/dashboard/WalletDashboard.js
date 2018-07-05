// @flow

import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View, StyleSheet, Text } = ReactNative;

import Touchable from 'react-native-platform-touchable';
import { Icon } from 'react-native-elements';
import type { WalletT } from '../../../../localstorage/db/models/Wallet';

import WalletList from './WalletList';
import WalletDashboardViewModel from './WalletDashboardViewModel';
import { Colors } from '../../Colors';

type Props = {
    toCreateWallet: void => void,
    shouldRefresh: boolean
};

export type State = {
    wallets?: WalletT[]
};

export default class WalletDashboard extends Component<Props, State> {
    vm: WalletDashboardViewModel = new WalletDashboardViewModel();
    state = {};

    componentDidMount() {
        this.vm.loadWallets();
        this.vm.states().subscribe(newState => this.setState(newState));
    }

    toCreateWalletScreen() {
        this.props.toCreateWallet();
    }

    toWalletDetail(wallets) {
        return function(tappedIndex) {
            const { navigate } = this.props.navigation;

            navigate('WalletPager', {
                wallets: wallets,
                initialIndex: tappedIndex,
                refresh: this.refresh
            });
        };
    }

    toLogPage() {
        const { navigate } = this.props.navigation;
        navigate('LogPage');
    }

    toSettingsPage() {
        const { navigate } = this.props.navigation;
        navigate('SettingsPage');
    }

    componentDidUpdate(prevProps: Props, prevState: State, context: any) {
        const { shouldRefresh } = this.props;
        if (prevProps.shouldRefresh !== shouldRefresh) {
            this.vm.loadWallets();
        }
    }

    render() {
        const { wallets } = this.state;

        return (
            <View style={styles.container}>
                <Icon name={'plus'} type={'material-community'} color={Colors.White} containerStyle={styles.fab} raised={true} component={Touchable} onPress={this.toCreateWalletScreen.bind(this)} />

                <View style={styles.tempButtonContainer}>
                    <Touchable onPress={this.toLogPage.bind(this)}>
                        <Text style={styles.tempText}>Logs</Text>
                    </Touchable>
                    <Touchable onPress={this.toSettingsPage.bind(this)}>
                        <Text style={styles.tempText}>Settings</Text>
                    </Touchable>
                </View>

                <WalletList onEmptyButtonClick={this.toCreateWalletScreen.bind(this)} onWalletItemClick={this.toWalletDetail(wallets).bind(this)} wallets={wallets} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PrimaryBackground,
        paddingLeft: 30,
        paddingRight: 24
    },

    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 2,
        backgroundColor: Colors.PrimaryBackgroundText
    },

    tempButtonContainer: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        zIndex: 3
    },
    tempText: {
        color: 'white',
        fontSize: 18,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        backgroundColor: Colors.PrimaryBackgroundText
    }
});
