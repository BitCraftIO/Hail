import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

export default class WalletElement extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        coin: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        fiatValue: PropTypes.number.isRequired,
        percentageGrowth: PropTypes.number.isRequired
    };

    render() {
        var percentageGrowthColor = percentageGrowth => {
            return percentageGrowth >= 0 ? '#4ce0b3' : '#c84630';
        };
        return (
            <TouchableOpacity style={styles.background} onPress={this.props.onPress}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View>
                        <Text style={styles.coin}>{this.props.coin}</Text>
                        <Text style={styles.value}>{this.props.value}</Text>
                    </View>
                    <View
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                    >
                        <Text style={styles.name}>{this.props.name}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 8
                    }}
                >
                    <Text style={styles.fiatValue}>{this.props.fiatValue}</Text>
                    <Text style={styles.percentageGrowth}>{this.props.percentageGrowth}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#212d40',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    coin: {
        fontFamily: 'Avenir',
        fontSize: 17,
        fontWeight: '900',
        color: '#ffffff'
    },
    value: {
        fontFamily: 'Avenir',
        fontSize: 12,
        color: '#ffffff'
    },
    name: {
        fontFamily: 'Avenir',
        fontSize: 13,
        color: '#ffffff'
    },
    fiatValue: {
        fontFamily: 'Avenir',
        fontSize: 24,
        paddingTop: 12,
        color: '#ffffff'
    },
    percentageGrowth: {
        paddingLeft: 14,
        paddingTop: 24,
        fontFamily: 'Avenir',
        fontSize: 11.3,
        color: '#4ce0b3'
    }
});
