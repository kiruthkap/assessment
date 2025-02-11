import React, { useCallback, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import VideoList from '../ui/videoList';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideos, fetchVideos, setPage } from '../features/videoSlice';
import { appStyle } from '../styles';
import { RootState } from '../features/store';
import Loader from '../ui/loader';
import { apiData } from '../constants';

const { width } = Dimensions.get('window');

const TabViewComponent: React.FC = () => {
    const style = appStyle;
    const defaultValues = apiData;

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
        <View style={style.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => <VideoList key={index} tabKey={route.key} />}
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
        </View>
    );
};

export default TabViewComponent;
