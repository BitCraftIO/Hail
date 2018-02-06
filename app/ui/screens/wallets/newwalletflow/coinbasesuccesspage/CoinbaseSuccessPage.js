import React from "react";
import {Text, View} from "react-native";
import PropTypes from "prop-types";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import * as idhelper from "hail/app/ui/screens/wallets/utils/idhelper";
import * as CoinbaseAPI from "hail/app/ui/screens/wallets/network/exchanges/coinbase/CoinbaseAPI";


export default class CoinbaseSuccessPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.code);

    }

    componentDidMount() {
        this.props.createCoinbaseWallet(this.props.navigation.state.params.code);
    }
    success() {
        var status = null;
        var message = null;
        if (!this.props.cb.loading){
            //fix this in home.js
            
            if(this.props.cb.result != undefined) {
                if (this.props.cb.result.success){
                    status = 'Success';
                    message = '';
                }
                else if (!this.props.cb.result.success){
                    status = 'Failure';
                    message = this.props.cb.result.errormessage;
                }
            }
        } else {
            status = 'Loading';
            message = '';
        }
        if (this.props.cb.error) {
            console.log('failing');
            status = 'Failure';
            message = this.props.cb.error.message 
        }

        return (
            <View>
                <Text>{status}</Text>
                <Text>{message}</Text>
            </View>
        )
    } //{this.success()}

    render() {
        return (
            <View>
                <Text>Only way you're seeing this is if Deep linking works!</Text>
                {this.success()}
            </View>
        );
    }
}