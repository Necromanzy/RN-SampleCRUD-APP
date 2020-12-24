/**
 * @author Shanilka
 */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";

export default class ActionButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.container, this.props.customBtnStyle]} onPress={() => this.props.onPress()}>
                    <Text style={[styles.text, this.props.customTextStyle]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10, marginHorizontal: 25,
        backgroundColor: ComponentStyles.COLORS.BLUE,
        elevation: 6,
        height: 45, borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: ComponentStyles.COLORS.WHITE,
        fontFamily: ComponentStyles.FONT_FAMILY.MEDIUM
    }
});