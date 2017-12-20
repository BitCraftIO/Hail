import React from "react";
import PropTypes from 'prop-types';
import { Text, View, Button, StyleSheet } from 'react-native'

export default class SearchItem extends React.Component {

    static propTypes = {
        coin: PropTypes.object.isRequired,
        addToWatchlist: PropTypes.func.isRequired,
        isInWatchlist: PropTypes.bool.isRequired
    }

    onButtonPress = () => {
        this.props.addToWatchlist(this.props.coin.symbol);
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={{marginRight: 24}}>{this.props.coin.name}</Text>
                <Button
                    title="Add to watchlist"
                    onPress={this.onButtonPress}/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
        marginTop: 24
    }
})