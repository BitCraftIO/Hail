// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Image, Picker } from 'react-native';
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
                <View>
                    <Picker
                        mode='dropdown'
                        style={styles.picker}
                        selectedValue={this.state.selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            onValueChange(itemValue, itemIndex);
                            this.setState({
                                selectedValue: itemValue
                            });
                        }}
                    >
                        {pickerItemList}
                    </Picker>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.chevron}
                            resizeMode='contain'
                            source={Images.chevron}
                        />
                    </View>
                </View>
                <View style={styles.underline} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chevron: {
        alignSelf: 'flex-end',
        height: '50%',
        margin: 5,
        width: 24,
    },
    imageContainer: {
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
    },
    picker: {
        color: 'white',
        backgroundColor: '#0000'
    },
    underline: {
        height: '5%',
        backgroundColor: 'white'
    },
})