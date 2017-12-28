import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import {ResourceComponent} from "../../../reduxhelpers/CreateResource";

import {RESOURCE_GET_COIN_DATA_TAG} from "./state/WatchlistActions";

export default class Watchlist extends React.Component {
    static navigationOptions = {
        header: () => { }
    };

    static propTypes = {
        [RESOURCE_GET_COIN_DATA_TAG]: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getWatchlistCoins();
    }

    render() {
        return (
            <ResourceComponent
                progressView={() => (<Text>Loading</Text>)}
                errorView={() => (<Text>Error</Text>)}
                dataView={(item) => (<Text>{item.coin}</Text>)}
                resource={this.props.coinData}/>
        )
    }
}