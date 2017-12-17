import React from 'react';
import {View, Text, Platform} from 'react-native';

export default class SearchResults extends React.Component {
    static navigationOptions = {
        header: () => {}
    };

    render() {
        const term = this.props.navigation.state.params.query;
        return (
            <View style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}}>
                <Text>Searching for: {term}</Text>
            </View>
        );
    }
}