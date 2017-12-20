import SearchResults from "../SearchResults";
import { connect } from "react-redux";
import { mapResourceToProps } from "../../../../reduxhelpers/CreateResource";
import {
    RESOURCE_ADD_TO_WATCHLIST_TAG, RESOURCE_GET_WATCHLIST_COINS_TAG,
    RESOURCE_SEARCH_RESULT_TAG,
} from "./SearchActions";
import SearchAction from "./SearchActions";

function mapStateToProps(state) {
    const resourceMapperCreator = mapResourceToProps("search", state);
    const searchResourceMapper = resourceMapperCreator(RESOURCE_SEARCH_RESULT_TAG);
    const addToWatchlistResourceMapper = resourceMapperCreator(RESOURCE_ADD_TO_WATCHLIST_TAG);
    const getWatchlistCoinsResourceMapper = resourceMapperCreator(RESOURCE_GET_WATCHLIST_COINS_TAG);

    return {
        ...searchResourceMapper,
        ...addToWatchlistResourceMapper,
        ...getWatchlistCoinsResourceMapper
    }
}

export default connect(mapStateToProps, SearchAction)(SearchResults);