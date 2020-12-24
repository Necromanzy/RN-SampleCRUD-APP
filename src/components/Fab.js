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
import Icon from 'react-native-vector-icons/Ionicons';
import ComponentStyles from "../../constants/Component.styles";

export default class Fab extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={()=> this.props.onPress()}>
                <Icon name='ios-person-add-sharp' size={30} color={ComponentStyles.COLORS.WHITE} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 100,
        elevation: 10,
        width: ComponentStyles.WIDTH * 0.2,
        height: ComponentStyles.WIDTH * 0.2,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ComponentStyles.COLORS.BLUE
    }
});