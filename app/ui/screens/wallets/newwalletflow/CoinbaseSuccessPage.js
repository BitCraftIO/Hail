import React from "react";
import {Text} from "react-native";
import PropTypes from "prop-types";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import * as idhelper from "hail/app/ui/screens/wallets/utils/idhelper";


export default class CoinbaseSuccessPage extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Text>Only way you're seeing this is if Deep linking works!</Text>
        );
    }
}