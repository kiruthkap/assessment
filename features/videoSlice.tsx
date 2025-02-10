import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiParam, Video, VideoState } from '../types';

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  page: 1,
};

const videoSlice = createSlice({
  name: 'videoReducer',
  initialState,
  reducers: {
    fetchVideos: (state, action: PayloadAction<ApiParam>) => {
      state.loading = true;
      state.error = null;
    },
    fetchVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.page = state.page + 1;
      state.videos = [...state.videos, ...action.payload];
    },
    fetchVideosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
    },
  },
});

export const { fetchVideos, fetchVideosSuccess, fetchVideosFailure, setPage, clearVideos } = videoSlice.actions;
export default videoSlice.reducer;
