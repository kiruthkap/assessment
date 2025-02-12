import React, { useCallback, useEffect, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import Video from 'react-native-video';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { VideoItemProps } from '../types';
import { videoItemStyle } from '../styles';
import { checkIsVideo } from '../utils';

const VideoItem: React.FC<VideoItemProps> = ({ item, isVisible }) => {
    const scale = useSharedValue(isVisible ? 1 : 0.99);
    const style = videoItemStyle;
    const videoRef = useRef<any>(null);

    useEffect(() => {
        if (isVisible) {
            videoRef.current?.seek(0);
        }
    }, [isVisible]);

    useEffect(() => {
        scale.value = withTiming(isVisible ? 1 : 0.99, { duration: 300 });
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const videoView = useCallback(() => {
        return <Video
            ref={videoRef}
            key={item.key}
            source={{ uri: item?.url }}
            style={style.video}
            paused={!isVisible}
            resizeMode="cover"
            repeat={true}
            muted={false}
        />
    }, [item?.url, isVisible])

    const imageView = useCallback(() => {
        return <Image
            source={{ uri: item?.url }}
            style={style.video}
            resizeMode="cover"
        />
    }, [item?.url])

    return (
        <View style={style.container}>
            <Text style={[style.titleStyle, isVisible && style.titleContainer]}>{item?.title}</Text>
            <Animated.View style={[style.videoWrapper, animatedStyle]}>
                {
                    checkIsVideo(item?.url) ?
                        videoView() :
                        imageView()
                }

            </Animated.View>
        </View>
    );
};

export default VideoItem;
