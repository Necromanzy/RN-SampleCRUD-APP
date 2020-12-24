/**
 * @author Shanilka
 */
import { Dimensions } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width, height } = Dimensions.get('screen');

const BACKGROUND_COLOR = "#FFFFFF";

export default ({
    WIDTH: width,
    HEIGHT: height,
    COLORS: {
        WHITE: '#FFFFFF',
        BLACK: '#000000',
        GREEN: '#088F43',
        RED: '#EE1C1E',
        BLUE: '#2874ed',
        DARKER_GRAY: '#4D5A61',
    },
    FONT_FAMILY: {
        BOLD: 'Poppins-Bold',
        SEMI_BOLD: 'Poppins-Semibold',
        MEDIUM: 'Poppins-Medium',
        REGULAR: 'Poppins-Regular',
        LIGHT: 'Poppins-Light'
    },

    CONTAINER: {
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: getStatusBarHeight(true),
        flex: 1
    },
    CONTENT: {
        margin: 25,
        marginTop: 0,
        marginBottom: 0,
        // paddingTop: 13,
        flex: 1,
    }
})