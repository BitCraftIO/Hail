// @flow
import { Text } from 'react-native'
import React from "react";

export default class SearchItem extends React.Component<{item: Object}> {
    render() {
        return (
            <Text>{this.props.item.name}</Text>
        )
    }
}