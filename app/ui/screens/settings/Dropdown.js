// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Image, Picker } from 'react-native';
import { Dropdown as MaterialDropdown } from 'react-native-material-dropdown';
import Images from '../../../utils/ImageLoader';

type Props = {
    style?: any,
    selectedValue?: mixed,
    pickerOptions: array, // Should be array of objects { label: <>, value: <> }
    onValueChange: (itemValue?: mixed, itemIndex?: number) => void
}

type State = {
    selectedValue: mixed
}

export default class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue
        }
    }

    _onValueChange(itemValue, itemIndex) {
        this.props.onValueChange(itemValue, itemIndex);
        this.setState({
            selectedValue: itemValue
        });
    }
    
    render() {
        const { style, pickerOptions, onValueChange } = this.props;

        let pickerItemList = pickerOptions.map(item => (
            <Picker.Item 
                key={item.label}
                label={item.label}
                value={item.value}
            />
        ));

        return(
            <View style={style}>
                <MaterialDropdown
                    baseColor={'white'}
                    textColor={'white'}
                    itemColor={'black'}
                    selectedItemColor={'black'}
                    onChangeText={this._onValueChange.bind(this)}
                    value={this.state.selectedValue}
                    data={pickerOptions}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({})