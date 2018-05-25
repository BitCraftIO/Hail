// @flow

import React, {Component} from 'react'
import ReactNative from "react-native"
const {View, StyleSheet} = ReactNative

import Touchable from 'react-native-platform-touchable'
import {Icon} from "react-native-elements";
import type {WalletT} from "../../../../localstorage/db/models/Wallet";

import WalletList from "./WalletList";
import WalletDashboardViewModel from "./WalletDashboardViewModel"
import {Colors} from "../../Colors";

type Props = {
    navigation: any
}

export type State = {
    wallets?: WalletT[]
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

    toWalletDetail(wallet) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"wallet": wallet, refresh: this.refresh});
    }

    render() {
        const { wallets } = this.state
        console.log(wallets)
        return (
            <View style={styles.container}>
                <Icon
                    name={"plus"}
                    type={"material-community"}
                    color={Colors.White}
                    containerStyle={styles.fab}
                    raised={true}
                    component={Touchable}
                    onPress={this.toCreateWalletScreen.bind(this)}
                />

                <WalletList
                    onEmptyButtonClick={this.toCreateWalletScreen.bind(this)}
                    onWalletItemClick={this.toWalletDetail.bind(this)}
                    wallets={wallets}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.PrimaryBackground,
        paddingLeft: 30,
        paddingRight: 24,
    },

    fab: {
        position: "absolute",
        bottom: 20,
        right:20,
        zIndex:2,
        backgroundColor: Colors.PrimaryBackgroundText
    }
})