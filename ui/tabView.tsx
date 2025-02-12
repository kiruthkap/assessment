import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Animated, Text, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import VideoList from '../ui/videoList';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideos, fetchVideos, setPage } from '../features/videoSlice';
import { appStyle } from '../styles';
import { RootState } from '../features/store';
import Loader from '../ui/loader';
import { animationData, apiData, colorConstants } from '../constants';
import { TabViewProps } from '../types';
import { getAnimationBasedOnScroll } from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const TabViewComponent: React.FC<TabViewProps> = ({ scrollY }) => {
    const style = appStyle;
    const defaultValues = apiData;
    const animationValues = animationData;

    const headerHeight = getAnimationBasedOnScroll(scrollY, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MIN_HEIGHT);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '0', title: 'General', icon: 'home' },
        { key: '1', title: 'News', icon: 'home' },
        { key: '2', title: 'Comedy', icon: 'home' },
    ]);

    const dispatch = useDispatch();
    const page: number = useSelector((state: RootState) => state?.videoReducer?.page || 0);

    useEffect(() => {
        setVideosBasedOnTab(index.toString());
    }, [index]);

    const setVideosBasedOnTab = useCallback((tabKey: string) => {
        dispatch(setPage(defaultValues.initialPage));
        dispatch(clearVideos());
        dispatch(fetchVideos({
            page: defaultValues.initialPage,
            tab: parseInt(tabKey)
        }));
    }, [page])

    const onTabChange = (tabKey: number) => {
        setIndex(tabKey);
        setVideosBasedOnTab(tabKey?.toString());
    }

    const renderLazyPlaceholder = () => (<Loader />);

    return (
        <Animated.View style={[style.container, { marginTop: headerHeight }]}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => <VideoList key={index} tabKey={route.key} scrollY={scrollY} />}
                onIndexChange={(index: number) => onTabChange(index)}
                initialLayout={{ width }}
                lazy={true}
                lazyPreloadDistance={0}
                renderLazyPlaceholder={renderLazyPlaceholder}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={style.tabBar}
                        indicatorStyle={style.indicatorStyle}
                        contentContainerStyle={style.containerStyle}
                        renderTabBarItem={({ route }) => {
                            const isFocused = index === parseInt(route.key);
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => onTabChange(parseInt(route.key))}
                                    style={style.itemStyle}>
                                    <Icon
                                        name={route.icon}
                                        size={24}
                                        color={isFocused ? colorConstants.white : colorConstants.gray}
                                    />
                                    <Text style={[style.textStyle, {
                                        color: isFocused ? colorConstants.white : colorConstants.gray,
                                        fontWeight: isFocused ? 'bold' : 'normal',
                                    }]}>
                                        {route.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
            />
        </Animated.View>
    );
};

export default TabViewComponent;
