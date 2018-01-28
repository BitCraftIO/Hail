import { connect } from "react-redux";
import { mapResourceToProps } from "../../../../reduxhelpers/CreateResource";
import CoinbaseSuccessPage from "./CoinbaseSuccessPage";
import {CREATE_REALM_COINBASE_WALLET, CREATE_REALM_COINBASE_WALLET_TAG, SuccessCoinbasePageActions, PAGE} from "./CoinbaseSuccessPageState";


function mapStateToProps(state) {
    const resourceToPropsCreator = mapResourceToProps(PAGE, state);
    return {
        ...resourceToPropsCreator(CREATE_REALM_COINBASE_WALLET_TAG),
    }
}

export default connect(mapStateToProps, SuccessCoinbasePageActions)(CoinbaseSuccessPage);