import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

export default class SearchBar extends React.Component {

    static propTypes = {
        onSearchSubmit: PropTypes.func.isRequired,
        defaultText: PropTypes.string
    }

    static defaultProps = {
        defaultText: ""
    }

    constructor() {
        super();
        this.state = {
            "input": ""
        }
    }

    componentDidMount() {
        this.setState({
            input: this.props.defaultText
        });
    }

    onSearchSubmit = () => {
        if (this.state.input) {
            this.props.onSearchSubmit(this.state.input);
        } else {
            this.refs.searchInput.focus();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref="searchInput"
                    onChangeText={(text) => this.setState({"input": text})}
                    underlineColorAndroid={'transparent'}
                    returnKeyType={'done'}
                    onSubmitEditing={this.onSearchSubmit}
                    value={this.state.input}
                    style={styles.input}/>

                <TouchableOpacity onPress={this.onSearchSubmit}>
                    <Image style={styles.searchIcon}
                           source={require("../../../images/ic_search_white.png")}/>
                </TouchableOpacity>
            </View>
        );
    }
}


/*
    Gonna try putting styles in the same file as the layout just
    for ease of development. We'll see if it lasts.
*/
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#444",
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: "center"
    },

    input: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12
    },

    searchIcon: {
        padding: 16
    }
});