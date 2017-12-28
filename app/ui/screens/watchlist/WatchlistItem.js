import React from "react";
import {Text, View,} from 'react-native';
import PropTypes from 'prop-types';
import {coinPriceFormatter} from "../../../utils/NumberFormatter";
import CoinLineChart from "../../CoinLineChart";


export default class WatchlistItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    }

    render() {
        const formattedPrice = coinPriceFormatter().format(this.props.item.currentPrice);
        return (
            <View>
                <Text>{this.props.item.coin}</Text>
                <CoinLineChart dates={this.props.item.graphData.y}
                               values={this.props.item.graphData.x}/>
                <Text>{formattedPrice}</Text>
            </View>
        )
    }
}