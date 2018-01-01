import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { ResourceComponent } from "../../../reduxhelpers/CreateResource";
import {COIN_GRAPH_DATA_RESOURCE_TAG} from "./CoinDetailState";

export default class CoinDetail extends React.Component {

    static propTypes = {
        [COIN_GRAPH_DATA_RESOURCE_TAG]: PropTypes.object.isRequired
    }

    componentDidMount() {
        const coin = this.props.navigation.state.params.coin;
        this.props.getGraphData(coin);
    }

    showGraph = (data) => {
        console.log(data);
        return (
            <View style={styles.container}>
                <Text>I am a graph</Text>
            </View>
        );
    }

    render() {
        return (
            <ResourceComponent
                resource={this.props[COIN_GRAPH_DATA_RESOURCE_TAG]}
                progressView={() => (<Text>Loading</Text>)}
                errorView={() => (<Text>Error</Text>)}
                dataView={this.showGraph} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:24,
        marginRight:24
    }
});