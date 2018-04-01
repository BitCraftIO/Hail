// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
import {Icon} from "react-native-elements";
const {View, Text, StyleSheet, SectionList, Button} = ReactNative
import {ResourceComponent} from "../../../../reduxhelpers/CreateResource";
import {Colors} from "../../Colors";
import WalletElement from "../components/WalletElement";
import Touchable from 'react-native-platform-touchable'

type Props = {
    navigation: any,
    wallets: any[],
    getWallets: void => void
}

type State = {}

export default class WalletDashboard extends Component<Props, State>{
    
    componentDidMount() {
        this.props.getWallets()
    }

    //TODO: Possible memory leak
    refresh = () => {
        console.log(this);
        this.props.getWallets()
    }

    toCreateWalletScreen = () => {
        const {navigate} = this.props.navigation;
        navigate("NewWalletPage", {refresh: this.refresh});
    }

    toWalletDetail(wallet) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"wallet": wallet, refresh: this.refresh});
    }

    showWallets = walletsResults => {
        const {local, exchange} = walletsResults
        let walletSections= [{
                title: "Local Wallets",
                data: local,
            }, {
                title: "Exchange Wallets",
                data: exchange
            }]

        return (
            <View style={styles.contentContainer}>
                <Icon
                    name={"plus"}
                    type={"material-community"}
                    color={Colors.White}
                    containerStyle={styles.fab}
                    raised={true}
                    component={Touchable}
                    onPress={() => this.toCreateWalletScreen()}
                />

                <SectionList
                    stickySectionHeadersEnabled={true}
                    sections={walletSections}
                    renderSectionHeader={section => {
                        const title = section.section.title.toUpperCase()
                        return (
                            <Text style={styles.sectionHeader}>{title}</Text>
                        )
                    }}
                    renderSectionFooter={section => {
                        const {data, title} = section.section
                        if (data.length === 0) {
                            return (
                                <View style={styles.emptySectionTextContainer}>
                                    <Text style={styles.emptySectionText}>No {title} Found.</Text>
                                </View>
                            )
                        }
                    }}
                    renderItem={data => {
                        const wallet = data.item.item
                        return (
                            <WalletElement
                                symbol={wallet.item.network}
                                aggregateCoins={0}
                                name={wallet.item.name}
                                aggregateValue={0}
                                percentageGrowth={0}
                                onPress={() => this.toWalletDetail(wallet.item)}
                            />
                        )
                    }}
                    ListEmptyComponent={
                        <View>
                            <Text>Looks like you don't have any wallets - let's fix that</Text>
                            <Button
                                title={"Create New Wallet"}
                                onPress={this.toCreateWalletScreen}
                            />
                        </View>
                    }
                />
            </View>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ResourceComponent
                    progressView={() => (<Text>Loading</Text>)}
                    errorView={() => (<Text>Error</Text>)}
                    dataView={this.showWallets}
                    resource={this.props.wallets}/>
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

    contentContainer: {
      flex: 1
    },

    fab: {
        position: "absolute",
        bottom: 20,
        right:20,
        zIndex:2,
        backgroundColor: Colors.PrimaryBackgroundText
    },

    sectionHeader: {
        color: Colors.PrimaryBackgroundText,
        marginBottom: 16,
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 32
    },

    emptySectionTextContainer: {
        backgroundColor: Colors.SecondaryBackground,
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 3
    },
    emptySectionText: {
        color: Colors.SecondaryBackgroundFadedText,
        fontSize: 12,
    }
})