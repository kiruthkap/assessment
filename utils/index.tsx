import { Animated } from "react-native"

export const getAnimationBasedOnScroll = (scrollY: Animated.Value, inputMaxHeight: number, outputMaxHeight: number, minHeight: number) => {
    return scrollY.interpolate({
        inputRange: [0, inputMaxHeight],
        outputRange: [outputMaxHeight, minHeight],
        extrapolate: 'clamp',
    })
}

export const checkIsVideo = (url: string) => {
    return /\.(mp4|mov|avi|mkv)$/i.test(url);
}