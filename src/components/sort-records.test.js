import React from 'react';
import { shallow } from 'enzyme';
import SortRecords from './sort-records';

describe('sort-records component',()=>{
	it('renders without crashing', () => {
	  shallow(<SortRecords />);
	});

	it('calls the sortRecords callback function on change',()=>{
		const callback=jest.fn();
		const wrapper=shallow(<SortRecords sortRecords={callback}/>);
		wrapper.find('select').simulate('change',{target:{value:''}});
		expect(callback).toHaveBeenCalled;
	});

});
