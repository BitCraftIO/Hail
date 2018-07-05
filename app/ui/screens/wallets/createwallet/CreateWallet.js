// @flow

import React, { Component } from 'react';
import ReactNative from 'react-native';
import { Icon } from 'react-native-elements';
import { STATUSBAR_HEIGHT } from '../../../../utils/Constants';
import { Colors } from '../../Colors';
import Button from './formelements/Button';
import ChoiceInputField from './formelements/ChoiceInputField';
import TextInputField from './formelements/TextInputField';
const { View, Text, StyleSheet } = ReactNative;
import { Select, Option } from 'react-native-chooser';
import * as wallet from '../utils/WalletActions';
import Touchable from 'react-native-platform-touchable';

type Props = {};

type State = {
    walletName: string,
    walletType: string,
    coin: string,
    creationType: string,
    network: string,
    isLoading: boolean
};

const selectableCoins = {
    // "Bitcoin": "BTC",
    Ethereum: 'ETH'
};

const options = {
    'New HD Wallet': 'HD',
    'New BIP 32 Wallet': 'BIP32',
    'New MultiSig Wallet': 'MultiSig'
    // "Import Wallet": "import"
};

const networks = {
    ETH: ['mainnet', 'Kovan', 'Ropsten'],
    BTC: ['TestNet']
};

export default class CreateWallet extends Component<Props, State> {
    constructor() {
        super();
        const defaultCoin = Object.values(selectableCoins)[0];
        const defaultNetwork = networks[defaultCoin][0];
        const defaultCreationType = Object.values(options)[0];

        this.state = {
            isLoading: false,
            walletName: '',
            walletType: 'local',
            creationType: defaultCreationType,
            coin: defaultCoin,
            network: defaultNetwork
        };
    }

    selectedCoinLabel() {
        const { coin } = this.state;
        return Object.keys(selectableCoins)[Object.values(selectableCoins).indexOf(coin)];
    }

    selectedCreationTypeLabel() {
        const { creationType } = this.state;
        return Object.keys(options)[Object.values(options).indexOf(creationType)];
    }

    assembleCoinOptions() {
        return Object.keys(selectableCoins).map(label => (
            <Option key={Math.random()} value={selectableCoins[label]}>
                {label}
            </Option>
        ));
    }

    assembleCreationTypeOptions() {
        return Object.keys(options).map(label => (
            <Option key={Math.random()} value={options[label]}>
                {label}
            </Option>
        ));
    }

    assembleNetworkOptions() {
        const { coin } = this.state;
        return networks[coin].map(label => (
            <Option key={Math.random()} value={label}>
                {label}
            </Option>
        ));
    }

    createWallet() {
        const { walletName, network, walletType, coin, creationType } = this.state;
        const self = this;
        new Promise((resolve, reject) => {
            wallet.create(coin, network, walletName, creationType);
            resolve();
        }).then(() => {
            self.props.screenProps.toDashboard();
        });
    }

    render() {
        const { isLoading, network, walletType } = this.state;
        let submitText = (() => {
            const base = walletType === 'local' ? 'Add' : 'Import';
            const suffix = isLoading ? 'ing...' : '';
            return base + suffix;
        })();

        if (isLoading) {
            this.createWallet();
        }

        return (
            <View style={styles.rootContainer}>
                <View style={styles.contentContainer}>
                    <Icon
                        component={Touchable}
                        onPress={() => this.props.screenProps.toDashboard()}
                        containerStyle={styles.backIcon}
                        size={20}
                        color={'#fff'}
                        name={'ios-arrow-back'}
                        type={'ionicon'}
                    />

                    <Text style={styles.header}>Add Wallet</Text>

                    <TextInputField
                        style={styles.walletNameInput}
                        label={'WALLET NAME'}
                        autoFocus={true}
                        textColor={Colors.White}
                        placeHolder={'My Wallet'}
                        onTextChange={walletName => this.setState({ walletName })}
                    />

                    <ChoiceInputField
                        labelColor={Colors.White}
                        onSelect={selected => this.setState({ walletType: selected })}
                        choices={{ Local: 'local', Exchange: 'exchange' }}
                        style={styles.walletTypeInput}
                        label={'TYPE'}
                    />

                    <View style={styles.horizontalInputContainer}>
                        <View style={[styles.horizontalInput, { marginRight: 16 }]}>
                            <Text style={styles.label}>COIN</Text>
                            <Select
                                style={styles.select}
                                defaultText={this.selectedCoinLabel()}
                                indicatorColor={Colors.White}
                                transparent={true}
                                animationType={'fade'}
                                optionListStyle={styles.leftOptionListStyle}
                                textStyle={styles.selectText}
                                onSelect={value => this.setState({ coin: value })}
                            >
                                {this.assembleCoinOptions()}
                            </Select>
                        </View>

                        <View style={[styles.horizontalInput, { marginLeft: 16 }]}>
                            <Text style={styles.label}>NETWORK</Text>
                            <Select
                                style={styles.select}
                                defaultText={network}
                                animationType={'fade'}
                                indicatorColor={Colors.White}
                                transparent={true}
                                optionListStyle={styles.rightOptionListStyle}
                                textStyle={styles.selectText}
                                onSelect={value => this.setState({ network: value })}
                            >
                                {this.assembleNetworkOptions()}
                            </Select>
                        </View>
                    </View>

                    <View style={styles.createTypeInputContainer}>
                        <Text style={styles.label}>CREATION TYPE</Text>
                        <Select
                            style={styles.select}
                            defaultText={this.selectedCreationTypeLabel()}
                            indicatorColor={Colors.White}
                            transparent={true}
                            animationType={'fade'}
                            optionListStyle={styles.optionListStyle}
                            textStyle={styles.selectText}
                            onSelect={value => this.setState({ creationType: value })}
                        >
                            {this.assembleCreationTypeOptions()}
                        </Select>
                    </View>

                    <Button containerStyle={styles.buttonContainer} onPress={() => this.setState({ isLoading: true })} isLoading={isLoading} text={submitText} />
                </View>

                <Icon type={'entypo'} name={'wallet'} containerStyle={styles.iconContainer} size={30} color={Colors.PrimaryBackgroundText} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Colors.PrimaryBackground,
        flex: 1,
        marginTop: STATUSBAR_HEIGHT
    },

    contentContainer: {
        paddingTop: 30,
        paddingLeft: 40,
        paddingRight: 40
    },

    backIcon: {
        alignSelf: 'flex-start',
        padding: 20,
        position: 'absolute',
        left: 10
    },

    header: {
        color: Colors.White,
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center'
    },

    iconContainer: {
        marginTop: 'auto',
        marginBottom: 16
    },

    walletNameInput: {
        marginTop: 16
    },

    label: {
        fontSize: 11,
        marginBottom: 8,
        fontWeight: '600',
        color: Colors.White
    },

    select: {
        borderColor: Colors.White,
        width: 'auto'
    },

    leftOptionListStyle: {
        backgroundColor: Colors.White,
        width: 150,
        height: 100,
        position: 'relative',
        right: 80
    },

    rightOptionListStyle: {
        backgroundColor: Colors.White,
        width: 150,
        height: 100,
        position: 'relative',
        left: 80
    },

    optionListStyle: {
        backgroundColor: Colors.White,
        position: 'relative',
        top: 85
    },

    selectText: {
        color: Colors.White
    },

    walletTypeInput: {
        marginTop: 24
    },

    horizontalInputContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    horizontalInput: {
        flex: 1
    },

    coinInputContainer: {
        marginTop: 24
    },

    networkInputContainer: {
        marginTop: 16
    },

    createTypeInputContainer: {
        marginTop: 16
    },

    buttonContainer: {
        marginTop: 32,
        alignSelf: 'flex-end'
    }
});
