import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import moment from 'moment';
import Images from '../../../../utils/ImageLoader';
import { Colors } from '../../Colors'

export default class TransactionList extends React.Component {

    _keyExtractor(item, index) {
        return index;
    }

    getValueColor(value) {
        if (value > 0) {
            // Positive
            return Colors.PositiveGreen;
        } else if (value < 0) {
            // Negative
            return Colors.NegativeRed;
        } else {
            // Neutral
            return 'white';
        }
    }

    _renderItem({item}) {
        let transaction = item;
        let date = moment.unix(transaction.timestamp / 1000).format("MM/DD/YYYY")
        let valueColor = this.getValueColor(transaction.value);
        let imageSource = transaction.value >= 0 ? Images.receivedTransaction : Images.sentTransaction;
        let transactionAddress = transaction.value >= 0 ? transaction.from : transaction.to;
        let transactionValue = transaction.value >= 0 ? '+' + transaction.value : transaction.value;

        return (
            <View style={styles.listItem}>
                <View style={styles.leftSideContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={imageSource}
                            resizeMode={'contain'}
                        />
                    </View>

                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoText}>
                            {transactionAddress}
                        </Text>
                        <Text style={styles.infoText}>{date}</Text>
                    </View>
                </View>

                <View>
                    <Text style={[styles.valueText, {color: valueColor}]}>
                        {transactionValue + ' ' + this.props.coin}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        if (!this.props.transactions || this.props.transactions.length == 0) {
            return (
                <Text style={styles.emptyTransactionsText}>No Transactions Found.</Text>
            )
        }

        return (
            <FlatList
                style={styles.flatlist}
                data={this.props.transactions}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    emptyTransactionsText: {
        color: Colors.SecondaryBackgroundFadedText,
        fontSize: 20,
        marginLeft: 15,
        marginTop: 15
    },

    flatlist: {
        marginTop: 10,
        paddingHorizontal: 25
    },

    listItem: {
        marginTop: 20,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftSideContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 50,
    },

    infoTextContainer: {
        marginLeft: 30
    },

    infoText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '100'
    },

    valueText: {
        fontSize: 20
    }
})