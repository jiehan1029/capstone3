import React from 'react';
import { shallow } from 'enzyme';
import TypeFilter from './type-filter';

describe('sort-records component',()=>{

	it('renders without crashing', () => {
	  shallow(<TypeFilter tickets={[{type:"home"},{type:"unsorted"}]} />);
	});

	it('calls the randomPick callback function on click button',()=>{
		const callback1=jest.fn();
		const wrapper=shallow(<TypeFilter randomPick={callback1} tickets={[{type:"home"}]} />);
		wrapper.first('Button').simulate('click',{preventDefault:()=>{}});
		expect(callback1).toHaveBeenCalled;
	});
/*
	it('calls the filterByType callback function on click 2st button',()=>{
		const callback2=jest.fn();
		const wrapper=shallow(<TypeFilter filterByType={callback2} tickets={[{type:"home"}]} />);
		wrapper.find('Button').at(1).simulate('click',{ preventDefault() {} });
		expect(callback2).toHaveBeenCalled;
	});
*/
});
