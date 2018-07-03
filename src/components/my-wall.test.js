import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import MyWall from './my-wall';

import { shallow } from 'enzyme';

describe('MyWall component',()=>{
	const initialState = {protectedData:{myWallData:[]}};
	const store = mockStore(initialState);
	it('renders without crashing', () => {
		const props={
			records:[]
		}
	  shallow(<Provider store={store}><Router><MyWall {...props}/></Router></Provider>);
	});
});