import {createStore, combineReducers} from 'redux';

import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form'

export default createStore(
    // if multiple reducers are used, pass them to combineReducers
    combineReducers({
        app:  appReducer,
        form: formReducer
    })
);