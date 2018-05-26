import ReactNative from "react-native"
const {StatusBar, Platform} = ReactNative

export const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight