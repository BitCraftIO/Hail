import React from 'react';
import { FlatList, StyleSheet, Clipboard, Text, View, TextInput, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as walletActions from '../utils/WalletActions';

export default class TransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: null,
            address: '',
            amount: '',
            fee: '',
            gasPrice: '',
            typeleftchecked: false,
            typerightchecked: false,
            status: null,
            wallet: this.props.navigation.state.params.wallet
        };

        walletActions.estimateFee('ETH', this.state.wallet.address[0].split(' ')[1], '4584158529818ef77D1142bEeb0b6648BD8eDb2f').then(fee => {
            this.setState({ fee });
        });

        //TODO: Remove Ethereum hard codes
        walletActions.getGasPrice().then(gasPrice => {
            this.setState({ gasPrice });
        });
    }

    chooseActionView() {
        if (this.state.action == null) {
            return (
                <View style={{ paddingTop: 30 }}>
                    <Text>Send or Receive?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <CheckBox title="Send" checked={this.state.typeleftchecked} right={true} onPress={() => this.chooseAction('send')} />
                        </View>
                        <View>
                            <CheckBox title="Receive" checked={this.state.typerightchecked} onPress={() => this.chooseAction('receive')} />
                        </View>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    chooseAction(action) {
        this.setState({
            action
        });
    }

    action() {
        if (this.state.action != null) {
            var act = null;
            if (this.state.action == 'send') {
                act = this.sendActionView;
            } else {
                act = this.receiveActionView;
            }
            return <View>{act(this.state)}</View>;
        } else {
            return null;
        }
    }

    sendActionView = () => {
        return (
            <View>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Address</Text>
                    <TextInput onChangeText={text => this.setState({ address: text })} value={this.state.address} placeholder={'a string'} placeholderTextColor={'grey'} />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Amount</Text>
                    <TextInput onChangeText={text => this.setState({ amount: text })} value={this.state.amount} placeholder={'a number'} placeholderTextColor={'grey'} />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Fee</Text>
                    <TextInput onChangeText={text => this.setState({ fee: text })} value={this.state.fee} placeholder={'default for currency'} placeholderTextColor={'grey'} />
                    <Text>Recommended fee: {this.state.fee} </Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Button title={'Send'} onPress={() => this.sendAction()} />
                </View>
            </View>
        );
    };

    sendAction() {
        //TODO: Put this in redux pattern after refactor
        //TODO: Stop hardcoding everything to Ethereum. Because that's what this is

        const buf = new Buffer(this.state.wallet.masterKey, 'hex');
        const params = {
            gasPrice: (20000000000).toString(16),
            gasLimit: (100000).toString(16),
            from: this.state.wallet.address[0].split(' ')[1],
            to: `0x${this.state.address}`,
            value: (1000).toString(16),
            chainId: 3,
            nonce: '0x00',
            privateKey: buf
        };
        console.log(params);
        const res = walletActions.send('ETH', params);
        this.setState({ status: res });
    }

    receiveActionView = () => {
        //grab new addr from util if bitcoin

        //TODO: Generate NewAddress based on cointype
        return (
            <View>
                <Text>{this.state.wallet.address[0]}</Text>
                <Button title={'Copy to clipboard'} onPress={() => this.copyToClipboard(this.state.wallet.address[0])} />
                <Button title={'Generate New Address'} onPress={() => this.generateNewAddress()} />
            </View>
        );
    };

    copyToClipboard = addr => {
        Clipboard.setString(addr);
        console.log(`PrivKey: ${this.state.wallet.masterKey}`);
        console.log(`Address: ${addr.split(' ')[1]}`);
        this.setState({ status: 'Copied to Clipboard' });
    };

    generateNewAddress() {
        //TODO: Do this right after refactor. Only works for ethereum
    }

    status() {
        if (this.state.status != null) {
            return <Text> {this.state.status} </Text>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <View>
                {this.chooseActionView()}
                {this.action()}
                {this.status()}
            </View>
        );
    }
}

styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#11151c'
    }
});
