import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, Animated, RefreshControl, ViewToken, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import VideoItem from './videoItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearVideos, fetchVideos, setPage, setPageRefresh } from '../features/videoSlice';
import { RootState } from '../features/store';
import { VideoListProps } from '../types';
import Loader from './loader';
import { apiData, predefinedTexts } from '../constants';
import { videoListStyle } from '../styles';

const VideoList: React.FC<VideoListProps> = ({ tabKey, scrollY }) => {
  const dispatch = useDispatch();

  const videosReducerData = useSelector((state: RootState) => state?.videoReducer);
  const videos = videosReducerData?.videos || [];
  const page = videosReducerData?.page || 0;
  const isLoading = videosReducerData?.loading || false;
  const refreshing = videosReducerData?.refreshing || false;

  const [visibleVideoId, setVisibleVideoId] = useState<number | null>(null);

  const defaultTexts = predefinedTexts;
  const apiDefaultData = apiData;
  const style = videoListStyle;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

  useEffect(() => {
    setVisibleVideoId(null);
  }, [tabKey]);

  useEffect(() => {
    if (videos?.length > 0 && visibleVideoId === null) {
      setVisibleVideoId(videos[0].key);
    }
  }, [videos]);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems?.length > 0) {
      setVisibleVideoId(parseInt(viewableItems[0]?.key));
    }
  }, []);

  const fetchNextSetData = useCallback(() => {
    if (videos?.length > 0) {
      dispatch(fetchVideos({
        page: page,
        tab: parseInt(tabKey)
      }));
    }
  }, [videos, page]);

  const handleRefresh = useCallback(() => {
    dispatch(setPageRefresh(true));
    dispatch(setPage(apiDefaultData.initialPage));
    dispatch(clearVideos());
    dispatch(fetchVideos({
      page: apiDefaultData.initialPage,
      tab: parseInt(tabKey)
    }));
  }, [dispatch, tabKey]);

  const emptyView = () => {
    return <View style={style.noVideoContainer}>
      <Text style={style.noVideoText}>{defaultTexts.noVideos}</Text>
    </View>
  }

  const loaderView = () => (<Loader />);

  const hendlePaginationBasedOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const endReached =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

      if (endReached && !isLoading && videos?.length > 0) {
        fetchNextSetData();
      }
    },
    [dispatch, page, isLoading, videos]
  );

  return (
    <Animated.FlatList
      data={videos}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => (
        <VideoItem item={item} isVisible={item?.key === visibleVideoId} />
      )
      }
      pagingEnabled
      horizontal={false}
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      onMomentumScrollEnd={hendlePaginationBasedOnScroll}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={!refreshing ? isLoading ? loaderView() : emptyView() : null}
      style={style.container}
      refreshControl={
        <RefreshControl refreshing={isLoading && refreshing} onRefresh={handleRefresh} />
      }
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    />
  );
};

export default VideoList;
