import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Animated } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import VideoList from '../ui/videoList';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideos, fetchVideos, setPage } from '../features/videoSlice';
import { appStyle } from '../styles';
import { RootState } from '../features/store';
import Loader from '../ui/loader';
import { animationData, apiData } from '../constants';
import { TabViewProps } from '../types';
import { getAnimationBasedOnScroll } from '../utils';

const { width } = Dimensions.get('window');

const TabViewComponent: React.FC<TabViewProps> = ({ scrollY }) => {
    const style = appStyle;
    const defaultValues = apiData;
    const animationValues = animationData;

    const headerHeight = getAnimationBasedOnScroll(scrollY, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MAX_HEIGHT, animationValues.HEADER_MIN_HEIGHT);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '0', title: 'General' },
        { key: '1', title: 'News' },
        { key: '2', title: 'Comedy' },
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
                renderTabBar={(props) =>
                    <TabBar {...props}
                        style={style.tabBar}
                        indicatorStyle={style.indicatorStyle}
                    />
                }
            />
        </Animated.View>
    );
};

export default TabViewComponent;
