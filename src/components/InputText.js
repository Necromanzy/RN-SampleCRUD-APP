/**
 * @author Shanilka
 */
import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native";
import comStyles from '../../constants/Component.styles'
import Icon from 'react-native-vector-icons/Ionicons';

export default class InputText extends Component {

    render() {
        var customBackground = { backgroundColor: 'transparent' };
        if (this.props.editable != undefined && this.props.editable == false)
            customBackground = { backgroundColor: '#e0e0e0' };

        return (
            <View >
                <View style={{ paddingBottom: 7, margin: 0 }}>

                    {this.props.is_name ?
                        <Text style={{ color: '#1D3D5A', fontSize: 14, marginLeft: 2, fontFamily: comStyles.FONT_FAMILY.MEDIUM }}>
                            {this.props.name}
                        </Text> : null}

                    {this.props.is_ex ? <Text style={{
                        color: '#5D5D5D', fontFamily: comStyles.FONT_FAMILY.REGULAR, fontSize: 13, paddingLeft: 5,
                    }}>
                        {this.props.ex}
                    </Text> : null}

                    <TextInput style={[{
                        color: '#4A4958', fontSize: 15, height: 40, borderColor: '#C4C4C4', borderWidth: 1,
                        paddingLeft: 10, borderRadius: 6, fontFamily: comStyles.FONT_FAMILY.REGULAR, marginTop: 3, paddingBottom: 4, padding: 0,
                    }, customBackground, this.props.style]}
                        secureTextEntry={this.props.secureTextEntry}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderColor}
                        onChangeText={this.props.setState}
                        value={this.props.stateValue}
                        keyboardType={this.props.keyType}
                        editable={this.props.editable}
                        multiline={this.props.multiline}
                        numberOfLines={this.props.numberOfLines}
                        maxLength={this.props.maxLength} onBlur={this.props.onBlur} >
                    </TextInput>

                    {this.props.is_validated ?

                        <Icon name='ios-checkmark' size={27} color={comStyles.themeColor} style={{
                            position: 'absolute', right: 12, bottom: 10
                        }} />
                        :
                        <Icon name={this.props.Image} size={20} color='#747474' style={{
                            position: 'absolute', right: 12, top: 12
                        }} />
                    }
                </View>
            </View>
        );
    }
}
