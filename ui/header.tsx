import React from 'react';
import { Text, Animated } from 'react-native';
import { headerStyle } from '../styles';
import { HeaderProps } from '../types';
import { predefinedTexts } from '../constants';

const Header: React.FC<HeaderProps> = ({ headerTranslate }) => {
    const style = headerStyle;
    const defaultTexts = predefinedTexts;

    return (
        <Animated.View style={[style.header, { transform: [{ translateY: headerTranslate }] }]}>
            <Text style={style.headerText}>{defaultTexts.title}</Text>
        </Animated.View>
    );
};

export default Header;
