import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import Tickets from './tickets';
import { shallow } from 'enzyme';

describe('Tickets component',()=>{
	const props={
		tickets:[{_id:'21234',type:"",where:"",what:"",details:"",completeTimes:""}]
	}
	it('renders without crashing', () => {
	  shallow(<Router><Tickets {...props}/></Router>);
	});
});