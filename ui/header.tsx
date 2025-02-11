import React from 'react';
import { Animated } from 'react-native';
import { animationData, predefinedTexts } from '../constants';
import { headerStyle } from '../styles';
import { getAnimationBasedOnScroll } from '../utils';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
    const style = headerStyle;
    const defaultTexts = predefinedTexts;
    const animationValues = animationData;

    const headerHeight = getAnimationBasedOnScroll(scrollY, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MIN_HEIGHT)
    const imageSize = getAnimationBasedOnScroll(scrollY, animationValues.HEADER_MAX_HEIGHT, animationValues.IMAGE_MAX_SIZE, animationValues.IMAGE_MIN_SIZE)
    const titleSize = getAnimationBasedOnScroll(scrollY, animationValues.HEADER_MAX_HEIGHT, animationValues.TITLE_MAX_SIZE, animationValues.TITLE_MIN_SIZE)

    return (
        <Animated.View style={[style.header, { height: headerHeight }]}>
            <Animated.Image
                source={{ uri: defaultTexts.headerImageUrl }}
                style={[style.image, { width: imageSize, height: imageSize }]}
            />
            <Animated.Text style={[style.headerText, { fontSize: titleSize }]}>
                {defaultTexts.title}
            </Animated.Text>
        </Animated.View>
    );
};

export default Header;
