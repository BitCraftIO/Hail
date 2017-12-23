import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { RESOURCE_GET_WATCHLIST_COINS_TAG } from "../../../shared/GetWatchlistCoinsResource";

export default class Watchlist extends React.Component {
    static navigationOptions = {
        header: () => { }
    };

    static propTypes = {
        [RESOURCE_GET_WATCHLIST_COINS_TAG]: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getWatchlistCoins();
    }

    render() {
        let message;
        if (this.props.coinData.loading) {
            message = "Loading";
        } else if(!Array.isArray(this.props.coinData.result.length)) {
            message = this.props.coinData.result.coin;
        } else {
            message = "error";
        }

        return (
            <Text>{message}</Text>
        )
    }
}