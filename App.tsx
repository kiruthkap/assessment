import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Header from './ui/header';
import VideoList from './ui/videoList';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideos, fetchVideos, setPage } from './features/videoSlice';
import { appStyle } from './styles';
import { RootState } from './features/store';
import Loader from './ui/loader';
import { predefinedTexts } from './constants';

const HEADER_HEIGHT = 200;
const { width } = Dimensions.get('window');

const App: React.FC = () => {
  const style = appStyle;
  const defaultValues = predefinedTexts;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: '0', title: 'Tab 1' },
    { key: '1', title: 'Tab 2' },
    { key: '2', title: 'Tab 3' },
  ]);
  const dispatch = useDispatch();
  const page: number = useSelector((state: RootState) => state?.videoReducer?.page || 0);
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

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
  }

  const renderLazyPlaceholder = () => (<Loader />);

  return (
    <View style={style.container}>
      <Header headerTranslate={headerTranslate} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => <VideoList tabKey={route.key} />}
        onIndexChange={(index: number) => onTabChange(index)}
        initialLayout={{ width }}
        lazy={true}
        renderLazyPlaceholder={renderLazyPlaceholder}
        renderTabBar={(props) => <TabBar {...props} style={style.tabBar} indicatorStyle={style.indicatorStyle} />}
      />
    </View>
  );
};

export default App;
