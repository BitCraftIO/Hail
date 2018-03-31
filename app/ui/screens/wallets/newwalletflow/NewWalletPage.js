import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as actions from 'hail/app/ui/screens/wallets/utils/Actions';
import * as wallet from 'hail/app/ui/screens/wallets/utils/WalletActions';
import * as CoinbaseAPI from 'hail/app/crypto/network/exchanges/coinbase/CoinbaseAPI.js';

export default class NewWalletPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successInfo: '',
            name: 'null',
            typeleftchecked: false,
            typerightchecked: false,
            btcchecked: false,
            ltcchecked: false,
            ethchecked: false,
            istestnet: true,
            network: 'TEST',
            coin: null,
            type: null,
            id: null
        };
    }

    static navigationOptions = {
        header: () => {}
    };

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.refresh();
    }

    createWallet() {
        this.setState({
            successInfo: '...'
        });

        if (this.state.coin === null || this.state.name === null || this.state.type === null) {
            alert('Please input all fields');
            this.setState({
                successInfo: 'Failed'
            });
            return;
        }

        if (this.state.type == 'localwallet') {
            //TODO: Redux this
            //TODO: Add option to change wallet type. 'HD' is hardcoded
            wallet.create(this.state.coin, this.state.network, this.state.name, 'HD');
        } else {
        }

        this.setState({
            successInfo: 'Successful'
        });
    }

    pressTypeCheckBox(box) {
        if (box == 'left') {
            this.setState({
                typeleftchecked: true,
                typerightchecked: false,
                type: 'exchange'
            });
        } else if (box == 'right') {
            this.setState({
                typeleftchecked: false,
                typerightchecked: true,
                type: 'localwallet'
            });
        }
    }

    pressWalletTypeCheckBox(symbol) {
        switch (symbol) {
            case 'BTC':
                this.setState({
                    btcchecked: true,
                    ltcchecked: false,
                    ethchecked: false,
                    coin: 'BTC'
                });
                break;
            case 'LTC':
                this.setState({
                    btcchecked: false,
                    ltcchecked: true,
                    ethchecked: false,
                    coin: 'LTC'
                });
                break;
            case 'ETH':
                this.setState({
                    btcchecked: false,
                    ltcchecked: false,
                    ethchecked: true,
                    coin: 'ETH'
                });
                break;
            default:
                alert('This should never occur: ' + symbol);
        }
    }

    createExchangeWallet(network) {
        switch (network) {
            case 'Coinbase':
                CoinbaseAPI.redirectToOAuth();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View>
                <Button title={'Back'} onPress={() => this.goBack()} />
                <Text>Wallet Name</Text>
                <TextInput onChangeText={text => this.setState({ name: text })} value={this.state.name} placeholder={this.state.name} />
                <View style={{ paddingTop: 30 }}>
                    <Text>id</Text>
                    <TextInput onChangeText={text => this.setState({ id: Number(text) })} value={String(this.state.id)} placeholder={'null'} />
                </View>
                <View style={{ paddingTop: 30 }}>
                    <Text>Type</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <CheckBox title="Exchange" checked={this.state.typeleftchecked} right={true} onPress={() => this.pressTypeCheckBox('left')} />
                        </View>
                        <View>
                            <CheckBox title="LocalWallet" checked={this.state.typerightchecked} onPress={() => this.pressTypeCheckBox('right')} />
                        </View>
                    </View>
                </View>
                <View style={{ paddingTop: 30 }}>
                    <Text>LocalWallet Type</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <CheckBox title="BTC" checked={this.state.btcchecked} right={true} onPress={() => this.pressWalletTypeCheckBox('BTC')} />
                        </View>
                        <View>
                            <CheckBox title="LTC" checked={this.state.ltcchecked} onPress={() => this.pressWalletTypeCheckBox('LTC')} />
                        </View>
                        <View>
                            <CheckBox title="ETH" checked={this.state.ethchecked} onPress={() => this.pressWalletTypeCheckBox('ETH')} />
                        </View>
                    </View>
                    <CheckBox
                        title="Testnet"
                        checked={this.state.istestnet}
                        onPress={() => {
                            network = this.state.istestnet ? 'MAIN' : 'TEST';
                            this.setState({ istestnet: !this.state.istestnet, network });
                        }}
                        right={true}
                    />
                </View>
                <Button title={'CreateWallet'} onPress={() => this.createWallet()} />
                <Button title={'Create Coinbase Wallet'} onPress={() => this.createExchangeWallet('Coinbase')} />
                <Text>{this.state.successInfo}</Text>
            </View>
        );
    }
}
