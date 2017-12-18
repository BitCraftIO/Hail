import React from 'react';
import { Text } from 'react-native'
import PropTypes from 'prop-types';

export default class SearchItem extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    }

    render() {
        return (
            <Text>{this.props.item.name}</Text>
        )
    }
}