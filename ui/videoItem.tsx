import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Video from 'react-native-video';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { VideoItemProps } from '../types';
import { videoItemStyle } from '../styles';

const VideoItem: React.FC<VideoItemProps> = ({ item, isVisible }) => {
    const scale = useSharedValue(isVisible ? 1 : 0.9);
    const style = videoItemStyle;

    useEffect(() => {
        scale.value = withTiming(isVisible ? 1 : 0.9, { duration: 300 });
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={style.container}>
            <Text style={[style.titleStyle, isVisible && style.titleContainer]}>{item?.title}</Text>
            <Animated.View style={[style.videoWrapper, animatedStyle]}>
                <Video
                    source={{ uri: item?.url }}
                    style={style.video}
                    paused={!isVisible}
                    resizeMode="cover"
                    controls={true}
                    repeat={true}
                    muted={false}
                />
            </Animated.View>
        </View>
    );
};

export default VideoItem;
