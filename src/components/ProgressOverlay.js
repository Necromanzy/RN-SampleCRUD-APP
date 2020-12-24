/**
 * @author Shanilka
 */
import React, { Component } from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import CompStyles from '../../constants/Component.styles';

export default class ProgressOverlay extends Component {
    render() {
        return (
            <Spinner
                visible={this.props.visible ?? false}
                textContent={this.props.message ?? ''}
                animation='fade'
                color={this.props.color ?? CompStyles.COLORS.WHITE}
                overlayColor={this.props.overlayColor}
                size='large'
                textStyle={this.props.textStyle ??
                    { color: CompStyles.COLORS.WHITE, fontFamily: CompStyles.FONT_FAMILY.BOLD }}
                cancelable={this.props.cancelable ?? false}
            />
        );
    }
}