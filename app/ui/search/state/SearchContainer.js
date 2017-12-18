import SearchResults from "../SearchResults";
import { connect } from "react-redux";


function mapStateToProps(state) {
    return {
        searchResult: state.search.searchResult,
        hasItems: state.search.hasItems,
        loading: state.search.loading,
        error: state.search.error
    }

}

export default connect(mapStateToProps)(SearchResults);