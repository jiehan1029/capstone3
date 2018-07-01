import React from 'react';

import { ControlLabel, Button, Badge } from 'react-bootstrap';

export default class TypeFilter extends React.Component{
	constructor(props){
		super(props);
		this.unsortedRef=React.createRef();
		this.homeRef=React.createRef();
		this.outingRef=React.createRef();
		this.allRef=React.createRef();
	}

	passSelectionToParent(e){
		e.preventDefault();
		let typeArr=[];
		let types=[this.unsortedRef,this.homeRef,this.outingRef,this.allRef];
		types.map(type=>{
			if(type.current.checked){
				typeArr.push(type.current.value);
			}
			return type;
		});
		this.props.filterByType(typeArr);
	}

	randomPick(e){
		e.preventDefault();
		let typeArr=[];
		let types=[this.unsortedRef,this.homeRef,this.outingRef,this.allRef];
		types.map(type=>{
			if(type.current.checked){
				typeArr.push(type.current.value);
			}
			return type;
		});
		this.props.randomPick(typeArr);		
	}

	render(){
		let type={
			unsorted:[],
			home:[],
			outing:[],
			all:[]
		}
		this.props.tickets.forEach(ticket=>{
			if(ticket.type==='unsorted'){
				type.unsorted.push(ticket);
			}
			else if(ticket.type==='home'){
				type.home.push(ticket);
			}
			else if(ticket.type==='outing'){
				type.outing.push(ticket);
			}
			type.all.push(ticket);
		});
		return(
			<form className="type-filter-form">
				<div className='flex-container'>
					<div className="ticket-unsorted">
						<ControlLabel htmlFor="filter-unsorted">Unsorted <Badge>{type.unsorted.length}</Badge></ControlLabel>
						<input ref={this.unsortedRef} id="filter-unsorted" type="checkbox" value='unsorted' name='unsorted' />
					</div>
					<div className="ticket-home">
						<ControlLabel htmlFor="filter-home">Home <Badge>{type.home.length}</Badge></ControlLabel>
						<input ref={this.homeRef} type="checkbox" id="filter-home" value='home' name='home' />
					</div>
					<div className="ticket-outing">
						<ControlLabel htmlFor="filter-outing">Outing <Badge>{type.outing.length}</Badge></ControlLabel>
						<input ref={this.outingRef} id="filter-outing" type="checkbox" value='outing' name='outing' />
					</div>
					<div className="ticket-all">
						<ControlLabel htmlFor="filter-all">All <Badge>{type.all.length}</Badge></ControlLabel>
						<input ref={this.allRef} id="filter-all" type="checkbox" value='all' name='all' />
					</div>
				</div>
				<br />
				<Button onClick={e=>this.passSelectionToParent(e)}>Filter by selected categories</Button>
				<p>Or, draw one activity ticket randomly...</p>
				<Button onClick={e=>this.randomPick(e)}>Try my luck!</Button>
			</form>
		);
	}
}



