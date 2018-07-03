import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './registration-form';

import { shallow } from 'enzyme';

describe('RegistrationForm component',()=>{
	it('renders without crashing', () => {
	  shallow(<RegistrationForm />);
	});
});