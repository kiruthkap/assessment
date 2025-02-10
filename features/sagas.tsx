import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchVideos, fetchVideosSuccess, fetchVideosFailure } from './videoSlice';
import { ApiParam } from '../types';
import { predefinedTexts } from '../constants';

const API_URL = 'https://67a9f50065ab088ea7e521d9.mockapi.io/assessment/api/videos';

function* fetchVideosSaga(action: { type: string; payload: ApiParam }): Generator<any, void, any> {
    const apiUrl = `${API_URL}?limit=${predefinedTexts?.defaultLimit}&page=${action?.payload?.page}&tab=${action?.payload?.tab}&sortBy=key&order=asc`;
    try {
        const response: any = yield call(() =>
            axios.get(apiUrl)
        );
        yield put(fetchVideosSuccess(response?.data));
    } catch (error) {
        yield put(fetchVideosFailure('Failed to fetch videos'));
    }
}

function* rootSaga(): Generator {
    yield all([takeLatest(fetchVideos.type, fetchVideosSaga)]);
}

export default rootSaga;

