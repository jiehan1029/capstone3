import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import MyBucket from './my-bucket';

import { shallow } from 'enzyme';

describe('MyBucket component',()=>{
	const initialState = {protectedData:{myWallData:[],myBucketData:[]}};
	const store = mockStore(initialState);
	it('renders without crashing', () => {
		const props={
			records:[],
			tickets:[]
		}
	  shallow(<Provider store={store}><Router><MyBucket {...props}/></Router></Provider>);
	});
});