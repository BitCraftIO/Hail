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

        this.receiveActionView = this.receiveActionView.bind(this);
    }

    estimateFee() {
        walletActions.estimateFee(this.state.wallet.coin, this.state.wallet.addresses.string).then(fee => {
            switch (this.state.wallet.coin) {
                case 'ETH':
                    fee = `gasPrice: ${fee.gasPrice}  gasLimit: ${fee.gasLimit}`;
                    break;
                default:
                    break;
            }
            this.setState({ fee });
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
                    <Button title={'Estimate Fee'} onPress={() => this.estimateFee()} />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Button title={'Send'} onPress={() => this.sendAction()} />
                </View>
            </View>
        );
    };

    sendAction() {
        switch (this.state.wallet.coin) {
            case 'ETH':
                const buf = new Buffer(this.state.wallet.masterKey, 'hex');
                var params = {
                    gasPrice: this.state.gasPrice,
                    gasLimit: this.state.gasLimit,
                    from: this.state.wallet.addresses.string,
                    to: this.state.address,
                    value: this.state.amount,
                    nonce: '0x00',
                    privateKey: buf
                };
                switch (this.state.wallet.network) {
                    case 'MAIN':
                        params.chainId = 1;
                    case 'KOVAN':
                    case 'RINKEBY':
                        params.chainId = 3;
                    case 'ROPSTEN':
                    default:
                        break;
                }

                break;
            default:
                break;
        }
        console.log(params);

        //TODO: Put this in redux pattern after refactor
        walletActions.send(this.state.wallet.coin, params).then(result => {
            this.setState({ status: result });
        });
    }

    receiveActionView() {
        return (
            <View>
                <Text>{this.state.wallet.addresses[this.state.wallet.addresses.length - 1].string}</Text>
                <Button title={'Copy to clipboard'} onPress={() => this.copyToClipboard(this.state.wallet.addresses[0].string)} />
                <Button title={'Generate New Address'} onPress={() => this.generateNewAddress()} />
            </View>
        );
    }

    copyToClipboard = addr => {
        Clipboard.setString(addr);
        console.log(`PrivKey: ${this.state.wallet.masterKey}`);
        console.log(`Address: ${addr}`);
        this.setState({ status: 'Copied to Clipboard' });
    };

    generateNewAddress() {
        walletActions.generateNewAddress(this.state.wallet.coin, this.state.wallet);
        this.setState();
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
