/**
 * @author Shanilka
 */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";

export default class ContactItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.contact}>{this.props.contact}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 8,
        marginVertical: 12,
        backgroundColor: ComponentStyles.COLORS.WHITE,
        elevation: 10,
        borderRadius: 8
    },

    title: {
        flex: 1,
        color: ComponentStyles.COLORS.BLUE,
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        fontSize: 12,
        top: 3
    },

    contact: {
        flex: 1,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        bottom: 3
    }
});