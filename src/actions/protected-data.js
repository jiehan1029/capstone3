import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_MY_BUCKET_SUCCESS = 'FETCH_MY_BUCKET_SUCCESS';
export const fetchMyBucketSuccess = myBucketData => ({
    type: FETCH_MY_BUCKET_SUCCESS,
    myBucketData
});

export const FETCH_MY_WALL_SUCCESS = 'FETCH_MY_WALL_SUCCESS';
export const fetchMyWallSuccess = myWallData => ({
    type: FETCH_MY_WALL_SUCCESS,
    myWallData
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchMyBucket = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/my-bucket`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => {
          dispatch(fetchMyBucketSuccess(data))})
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const fetchMyWall = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/my-wall`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then((res) => {res.json()})
        .then(({data}) => {
          dispatch(fetchMyWallSuccess(data));})
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

