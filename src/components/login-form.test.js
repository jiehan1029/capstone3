import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import LoginForm from './login-form';

import { shallow } from 'enzyme';

describe('login-form component',()=>{
	it('renders without crashing', () => {
	  shallow(<Router><LoginForm /></Router>);
	});
});