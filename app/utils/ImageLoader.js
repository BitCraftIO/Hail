/**
 * Because javascript excutes require() statements on load, image sources
 * have to be static strings. To make images easier to pull in dynamically,
 * they should be loaded here as opposed to littered about other components.
 * 
 * In an <Image> component, instead of
 *      source={require('../path/to/imamge')}
 * it can be written
 *      import Images from '../path/to/ImageLoader'
 *      ...
 *      source={Images.exampleImage}
 */
const images = {
    chevron: require('../images/chevron_down.png'),
    searchIcon: require('../images/ic_search_white.png'),
    optionsHollow: require('../images/optionsHollow.png'),
    arrowLeft: require('../images/arrow_left.png'),
    sentTransaction: require('../images/sentTransaction.png'),
    receivedTransaction: require('../images/receivedTransaction.png'),
    movingCoin: require('../images/movingCoin.png'),

    settings: {
        bugReport: require('../images/settings/ic_bug_report.png'),
        node: require('../images/settings/ic_node.png'),
        save: require('../images/settings/ic_save.png'),
        style: require('../images/settings/ic_style.png'),
        sync: require('../images/settings/ic_sync.png'),
    }
}

export default images;