import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class MakeOrReceiveTransactionPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			"text": "Type your Address here"
		}
	}

	goToNextPage(address) {
		const {navigate} = this.props.navigation;
        navigate("MakeOrReceiveTransactionInputAmountPage", {"address": this.state.text});
	}

	render() {
		return (
			<View>
				<View
					style={styles.inputBox}
				>
					<TextInput
						multiline = {false}
						onChangeText={(text) => this.setState({text})}
						value={this.state.text}
					/>
				</View>
				<View>
					<Button
						title = {"Next"}
						onPress = {() => this.goToNextPage()} 
					/>
				</View>
			</View>
		)
	}

}

styles = StyleSheet.create({
    background: {
        flex: 1,
        //backgroundColor: '#11151c',
        alignItems: 'center',
        backgroundColor: '#11151c',
    },
    inputBox: {
    	borderColor: '#000000',

    },
    // list: {
    //     paddingTop: 70,
    // },
    // sectionHeader: {
    //     fontFamily: "Avenir",
    //     fontSize: 9,
    //     color: "#9b9b9b",
    //     paddingTop: 30,
    //     paddingBottom: 15
    // },
});