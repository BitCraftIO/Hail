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

type Props = {};

type State = {
    walletName: string,
    walletType: string,
    coin: string,
    creationType: string
};

const selectableCoins = {
    Bitcoin: 'BTC',
    Ethereum: 'ETH'
};

const options = {
    'New HD Wallet': 'new'
    // "Import Wallet": "import"
};

export default class CreateWallet extends Component<Props, State> {
    constructor() {
        super();
        this.state = {
            walletName: '',
            walletType: 'local',
            coin: 'ETH',
            creationType: 'new'
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

    createWallet() {
        const { walletName, walletType, coin, creationType } = this.state;
        wallet.create(coin, 'TEST', walletName, 'HD');

        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.refresh();
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Add Wallet</Text>

                    <TextInputField
                        style={styles.walletNameInput}
                        label={'WALLET NAME'}
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

                    <View style={styles.coinInputContainer}>
                        <Text style={styles.label}>COIN</Text>
                        <Select
                            style={styles.select}
                            defaultText={this.selectedCoinLabel()}
                            indicatorColor={Colors.White}
                            transparent={false}
                            animationType={'none'}
                            transparent={true}
                            optionListStyle={{ backgroundColor: Colors.White }}
                            textStyle={styles.selectText}
                            onSelect={value => this.setState({ coin: value })}
                        >
                            {this.assembleCoinOptions()}
                        </Select>
                    </View>

                    <View style={styles.createTypeInputContainer}>
                        <Text style={styles.label}>CREATION TYPE</Text>
                        <Select
                            style={styles.select}
                            defaultText={this.selectedCreationTypeLabel()}
                            indicatorColor={Colors.White}
                            transparent={false}
                            animationType={'none'}
                            transparent={true}
                            optionListStyle={{ backgroundColor: Colors.White }}
                            textStyle={styles.selectText}
                            onSelect={value => this.setState({ creationType: value })}
                        >
                            {this.assembleCreationTypeOptions()}
                        </Select>
                    </View>

                    <Button style={styles.buttonContainer} onPress={() => this.createWallet()} text={'Add'} />
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
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40
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

    selectText: {
        color: Colors.White
    },

    walletTypeInput: {
        marginTop: 24
    },

    coinInputContainer: {
        marginTop: 24
    },

    createTypeInputContainer: {
        marginTop: 16
    },

    buttonContainer: {
        marginTop: 32
    }
});
