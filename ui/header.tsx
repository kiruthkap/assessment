import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { headerStyle } from '../styles';
import { predefinedTexts } from '../constants';

const Header: React.FC = () => {
    const style = headerStyle;
    const defaultTexts = predefinedTexts;

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [80, 20],
        extrapolate: 'clamp',
    });

    const imageSize = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [30, 10],
        extrapolate: 'clamp',
    });

    const titleSize = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [24, 16],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[style.header, { height: headerHeight }]}>
            <Animated.Image
                source={{ uri: predefinedTexts.headerImageUrl }}
                style={[style.imageView, { width: imageSize, height: imageSize }]}
            />
            <Animated.Text style={[style.headerText, { fontSize: titleSize }]}>
                {defaultTexts.title}
            </Animated.Text>
        </Animated.View>
    );
};

export default Header;
