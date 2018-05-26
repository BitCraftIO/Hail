// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
import TextWithContainer from "../../../../components/TextWithContainer";
import type {WalletT} from "../../../../localstorage/db/models/Wallet";
import {Colors} from "../../Colors";
import WalletListItem from "./WalletListItem";
const {View, Text, StyleSheet, SectionList, Button} = ReactNative

type DashboardWallets = {
    local: WalletT[],
    exchange: WalletT[]
}

type Props = {
    wallets?: DashboardWallets,
    onEmptyButtonClick: () => {},
    onWalletItemClick: any => {}
}

type State = {}

export default class WalletList extends Component<Props, State>{
    toWalletSections() {
        const {local, exchange} = this.props.wallets
        return  [{
            title: "Local Wallets",
            data: local,
        }, {
            title: "Exchange Wallets",
            data: exchange
        }]
    }

    render() {
        if (!this.props.wallets) {
            return null
        }

        const {onEmptyButtonClick, onWalletItemClick} = this.props
        const walletSections = this.toWalletSections()

        return (
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
                        return <TextWithContainer
                            containerStyle={styles.emptySectionTextContainer}
                            textStyle={styles.emptySectionText}
                            text={title}/>
                    }
                }}

                renderItem={data => {
                    const wallet = data.item
                    return (
                        <WalletListItem
                            wallet={wallet}
                            onPress={() => onWalletItemClick(wallet)}
                        />
                    )
                }}

                ListEmptyComponent={
                    <View>
                        <Text>Looks like you don't have any wallets - let's fix that</Text>
                        <Button
                            title={"Create New Wallet"}
                            onPress={onEmptyButtonClick}
                        />
                    </View>
                }

                keyExtractor={(item, index) => item.id + index}
            />
        )
    }
}

const styles = StyleSheet.create({
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