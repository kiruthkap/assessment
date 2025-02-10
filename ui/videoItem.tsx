import React, { useEffect } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { VideoItemProps } from '../types';
import { videoItemStyle } from '../styles';

const VideoItem: React.FC<VideoItemProps> = ({ item, isVisible }) => {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const style = videoItemStyle;

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 500 });
            scale.value = withTiming(1, { duration: 500 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            scale.value = withTiming(0.8, { duration: 300 });
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={style.container}>
            <Animated.View style={[style.videoWrapper, animatedStyle]}>
                <Video
                    source={{ uri: item?.url }}
                    style={style.video}
                    paused={!isVisible}
                    resizeMode="cover"
                    controls={true}
                    repeat={true}
                    muted={false}
                    onError={(error) => console.log('Video Error:', error)}
                    onLoad={() => console.log('Video Loaded:', item.url)}
                />
            </Animated.View>
        </View>
    );
};

export default VideoItem;


