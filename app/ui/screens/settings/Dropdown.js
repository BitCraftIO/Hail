// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback, Image, Modal } from 'react-native';

export default class Dropdown extends React.Component {

    /**
     * Flatlist will take in options
     * Text will take in current selection
     * on tap flatlist change current selection
     * configurable width, height
     */

    static propTypes = {
        containerStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired
    }

    constructor(props) {
        super(props);
        this.state = { 
            isShowingList: false,
            selectedLabel: ""
        }

        this._onDropdownPress = this._onDropdownPress.bind(this);
        this._onItemPress = this._onItemPress.bind(this);
        this._toggleListVisibility = this._toggleListVisibility.bind(this);
    }

    _onDropdownPress() {
        console.log("tap");
        this._toggleListVisibility();
    }

    _onItemPress(item) {
        console.log(item);
        this.setState( {
            selectedLabel: item.val
        })
        this._toggleListVisibility();
    }

    _renderItem = ({item}) => (
        <TouchableHighlight
            onPress={() => this._onItemPress(item)}>
            <Text style={styles.text}>{item.val}</Text>
        </TouchableHighlight>
    );

    _toggleListVisibility() {
        this.setState({
            isShowingList: !this.state.isShowingList
        })
    }
    
    render() {
        const { containerStyle } = this.props;

        return(
            <View 
                style={containerStyle}
            >

                <TouchableHighlight onPress={this._onDropdownPress}>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.text}>{this.state.selectedLabel}</Text>

                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.chevron}
                                    resizeMode='contain'
                                    source={require('../../../images/chevron_down.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.underline} />
                    </View>
                </TouchableHighlight>


                {this.state.isShowingList &&
                <Modal 
                    visible={true}
                    onRequestClose={this._toggleListVisibility}
                /> 
                {/* &&
                <FlatList
                    style={styles.flatlist}
                    data={[{key: 'a', val: "TEST"}, {key: 'b', val: "TEST2"}, {key: 'c', val: "TEST3"}, {key: 'd', val: "TEST4"}]}
                renderItem={this._renderItem} />} */} }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chevron: {
        width: 24,
        height: '50%',
        margin: 5,
        alignSelf: 'flex-end'
    },
    containerStyle: {
        overflow: 'visible',
    },
    content: {
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        alignSelf: 'center'
    },
    underline: {
        height: '5%',
        backgroundColor: 'white'
    },

    flatlist: {
        top: 50,
        width: 300,
        height: 50,
        position: 'absolute',
        backgroundColor: 'grey',
        zIndex: 2
    },
    modalView: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'white'
    },
    separator: {
        height: 2,
        color: 'black'
    }
})