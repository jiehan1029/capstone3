import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

describe('Input component',()=>{
	it('renders without crashing', () => {
	  const props={
	  	meta:{
	  		touched:false,
	  		error:false,
	  		active:false,
	  		warning:""
	  	},
	  	input:{name:""},
	  	label:""
	  }
	  shallow(<Input {...props}/>);
	});
});