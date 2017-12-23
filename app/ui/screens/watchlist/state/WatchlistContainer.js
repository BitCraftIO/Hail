import WatchlistActions, {RESOURCE_GET_COIN_DATA_TAG} from "./WatchlistActions";
import Watchlist from "../Watchlist";
import { connect } from "react-redux";
import { mapResourceToProps } from "../../../../reduxhelpers/CreateResource";

function mapStateToProps(state) {
    const creator = mapResourceToProps("watchlist", state);

    return {
        ...creator(RESOURCE_GET_COIN_DATA_TAG)
    }
}

export default connect(mapStateToProps, WatchlistActions)(Watchlist);