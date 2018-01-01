import { connect } from "react-redux";
import { mapResourceToProps } from "../../../reduxhelpers/CreateResource";
import CoinDetail from "./CoinDetail";
import {COIN_GRAPH_DATA_RESOURCE_TAG, CoinDataActions, PAGE} from "./CoinDetailState";


function mapStateToProps(state) {
    const resourceToPropsCreator = mapResourceToProps(PAGE, state);

    return {
        ...resourceToPropsCreator(COIN_GRAPH_DATA_RESOURCE_TAG)
    }
}

export default connect(mapStateToProps, CoinDataActions)(CoinDetail);