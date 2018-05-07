import { connect } from 'react-redux';
import { mapResourceToProps } from '../../../../reduxhelpers/CreateResource';
import WalletDashboard from './WalletDashboard';
import { WALLET_LIST_DATA_RESOURCE, WALLET_LIST_DATA_RESOURCE_TAG, WalletListAction, PAGE } from './WalletsListState';

function mapStateToProps(state) {
    const resourceToPropsCreator = mapResourceToProps(PAGE, state);
    return {
        ...resourceToPropsCreator(WALLET_LIST_DATA_RESOURCE_TAG)
    };
}

export default connect(mapStateToProps, WalletListAction)(WalletDashboard);
