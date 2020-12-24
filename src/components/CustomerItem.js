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
import Icon from "react-native-vector-icons/MaterialIcons";
import ComponentStyles from "../../constants/Component.styles";

export default class CustomerItem extends Component {
    render() {
        return (
            <View style={styles.itemContainer} >
                <Text style={styles.itemText}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => this.props.onPressAddPhone()}>
                    <Icon name='add-call' size={30} color={ComponentStyles.COLORS.BLUE} />
                </TouchableOpacity>
                <View style={{ flex: 0.05 }} />
                <TouchableOpacity onPress={() => this.props.onPressUpdate()}>
                    <Icon name='edit' size={30} color={ComponentStyles.COLORS.GREEN} />
                </TouchableOpacity>
                <View style={{ flex: 0.05 }} />
                <TouchableOpacity onPress={() => this.props.onPressDelete()}>
                    <Icon name='delete' size={30} color={ComponentStyles.COLORS.RED} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: ComponentStyles.COLORS.WHITE,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 6,
        padding: 15,
        margin:10,
        borderRadius: 10
    },
    itemText: {
        flex: 1,
        fontFamily: ComponentStyles.FONT_FAMILY.MEDIUM,
        color: ComponentStyles.COLORS.GRAY,
        fontSize: 18
    },
});