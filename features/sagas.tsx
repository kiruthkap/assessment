import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchVideos, fetchVideosSuccess, fetchVideosFailure } from './videoSlice';
import { ApiParam } from '../types';
import { apiData } from '../constants';
import { fetchVidesByPageAndTab } from '../api/videoApi';

function* fetchVideosSaga(action: { type: string; payload: ApiParam }): Generator<any, void, any> {
    const apiUrl = `${apiData.videosUrl}?limit=${apiData?.defaultLimit}&page=${action?.payload?.page}&tab=${action?.payload?.tab}&sortBy=key&order=asc`;
    try {
        const response: any = yield call(() =>
            fetchVidesByPageAndTab(apiUrl)
        );
        yield put(fetchVideosSuccess(response?.data));
    } catch (error) {
        yield put(fetchVideosFailure(apiData.apiError));
    }
}

function* rootSaga(): Generator {
    yield all([takeLatest(fetchVideos.type, fetchVideosSaga)]);
}

export default rootSaga;

