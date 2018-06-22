import {
    FETCH_MY_BUCKET_SUCCESS,
    FETCH_MY_WALL_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
    myBucketData: [],
    myWallData: [],
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_MY_BUCKET_SUCCESS) {
        return Object.assign({}, state, {
            myBucketData: action.myBucketData,
            error: null
        });
    }
    else if (action.type === FETCH_MY_WALL_SUCCESS) {
        return Object.assign({}, state, {
            myWallData: action.myWallData,
            error: null
        });
    } 
    else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}