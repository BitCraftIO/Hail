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
    searchIcon: require('../images/ic_search_white.png')
}

export default images;