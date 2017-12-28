import React from "react";
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {formatCoinPrice} from "../../../utils/NumberFormatter";
import CoinLineChart from "../../CoinLineChart";


export default class WatchlistItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {dimensions: undefined}
    }

    onLayout = event => {
        if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
    }

    graph = () => {
        if (this.state.dimensions) {
            return (
                <CoinLineChart
                    height={205}
                    width={this.state.dimensions.width * .55}
                    style={styles.chart}
                    dates={this.props.item.graphData.y}
                    values={this.props.item.graphData.x}/>
            )
        }
    }

    render() {
        const formattedPrice = formatCoinPrice(this.props.item.currentPrice);
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                    <Text style={styles.coinName}>{this.props.item.coin}</Text>
                    {this.graph()}
                    <Text style={styles.coinPrice}>{formattedPrice}</Text>
            </View>
        )
    }
}

const coinTextSize = 18;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop:32
    },
    coinName: {
        // flex:1,
        // textAlign: "center",
        fontSize:coinTextSize,
        marginRight:24
    },
    chart: {
        marginLeft:32,
        marginRight:32
    },
    coinPrice:{
        // flex:1,
        // textAlign: "center",
        fontSize:coinTextSize,
        marginLeft:24
    }
});
