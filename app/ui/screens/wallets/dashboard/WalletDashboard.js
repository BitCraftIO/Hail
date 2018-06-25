// @flow

import React, {Component} from 'react'
import ReactNative from "react-native"
const {View, StyleSheet, Text} = ReactNative

import Touchable from 'react-native-platform-touchable'
import {Icon} from "react-native-elements";
import type {WalletT} from "../../../../localstorage/db/models/Wallet";

import WalletList from "./WalletList";
import WalletDashboardViewModel from "./WalletDashboardViewModel"
import {Colors} from "../../Colors";
import DashboardHeader from './DashboardHeader';
import ImageButton from '../../../../components/ImageButton';
import Images from '../../../../utils/ImageLoader';

type Props = {
    navigation: any
}

export type State = {
    wallets?: WalletT[],
    priceData?: any
}

export default class WalletDashboard extends Component<Props, State>{
    vm: WalletDashboardViewModel = new WalletDashboardViewModel()

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.vm.loadWallets()
        this.vm.states()
            .subscribe(newState => this.setState(newState))
    }

    //TODO: Possible memory leak
    refresh = () => {
        console.log(this);
        this.vm.loadWallets()
    }

    toCreateWalletScreen() {
        const {navigate} = this.props.navigation;
        navigate("NewWalletPage", {refresh: this.refresh});
    }

    toWalletDetail(wallets) {
        return function(tappedIndex) {
            const {navigate} = this.props.navigation;

            navigate("WalletPager", {
                wallets: wallets,
                initialIndex: tappedIndex,
                refresh: this.refresh
            });
        }
    }

    toLogPage() {
        const {navigate} = this.props.navigation;
        navigate("LogPage");
    }

    toSettingsPage() {
        const {navigate} = this.props.navigation;
        navigate("SettingsPage");
    }

    render() {
        const { wallets, priceData } = this.state;

        return (
            <View style={styles.container}>
                <DashboardHeader>
                    <ImageButton
                        onPress={this.toSettingsPage.bind(this)}
                        source={Images.optionsHollow}
                    />
                </DashboardHeader>

                <View style={styles.padding}>
                    <Icon
                        name={"plus"}
                        type={"material-community"}
                        color={Colors.White}
                        containerStyle={styles.fab}
                        raised={true}
                        component={Touchable}
                        onPress={this.toCreateWalletScreen.bind(this)}
                    />

                    <View style={styles.tempButtonContainer}>
                        <Touchable onPress={this.toLogPage.bind(this)}>
                            <Text style={styles.tempText}>Logs</Text>
                        </Touchable>
                    </View>

                    <WalletList
                        onEmptyButtonClick={this.toCreateWalletScreen.bind(this)}
                        onWalletItemClick={this.toWalletDetail(wallets).bind(this)}
                        wallets={wallets}
                        priceData={priceData}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.PrimaryBackground,
    },

    padding: {
        flex: 1,
        paddingHorizontal: 30
    },

    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 2,
        backgroundColor: Colors.PrimaryBackgroundText
    },

    tempButtonContainer: {
        position: "absolute",
        bottom: 25,
        left: 20,
        zIndex: 3,
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
})