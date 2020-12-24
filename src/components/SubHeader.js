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
import comStyles from '../../constants/Component.styles'
import Icon from 'react-native-vector-icons/Ionicons';

export default class SubHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.navigation}>
                    <Icon name='chevron-back' size={30} color={comStyles.COLORS.WHITE} />
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: comStyles.COLORS.BLUE,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#A5A5A5',
                shadowOffset: { height: 4, width: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 5
            },
            android: {
                shadowOpacity: 0.2,
                elevation: 10,
                shadowColor: '#F3F3F3',
            }
        })
    },
    title: {
        color: comStyles.COLORS.WHITE,
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        fontSize: 18,
        alignSelf: 'center',
        paddingLeft: 5,
        top: 2,
    },
    
});