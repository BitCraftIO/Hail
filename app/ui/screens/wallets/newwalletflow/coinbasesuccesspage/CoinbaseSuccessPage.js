import React from "react";
import {Text, View} from "react-native";
import PropTypes from "prop-types";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import * as idhelper from "hail/app/ui/screens/wallets/utils/idhelper";
import * as CoinbaseAPI from "hail/app/ui/screens/wallets/network/exchanges/CoinbaseAPI";


export default class CoinbaseSuccessPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.code);

    }

    componentDidMount() {
        this.props.createCoinbaseWallet(this.props.navigation.state.params.code);
    }
    success() {
        if (!this.props.cb.loading){
            //fix this in home.js
            
            if(this.props.cb.result != undefined) {
                if (this.props.cb.result.success){
                    return (
                        <View>
                            <Text>Success</Text>
                            <Text>{this.props.cb.result.wallet.name}</Text>
                        </View>
                    )
                }
                else if (!this.props.cb.result.success){
                    return (
                        <View>
                            <Text>Failure</Text>
                            <Text>{this.props.cb.result.errormessage}</Text>
                        </View>
                    )
                }
            } else {
                return null;
            }
        }
    }

    render() {
        return (
            <View>
                <Text>Only way you're seeing this is if Deep linking works!</Text>
                {this.success()}
            </View>
        );
    }
}