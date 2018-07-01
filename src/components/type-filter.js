import React from 'react';
import './main.css';

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
					<div>
						<label htmlFor="filter-unsorted">Unsorted <span>({type.unsorted.length})</span></label>
						<br/><input ref={this.unsortedRef} id="filter-unsorted" type="checkbox" value='unsorted' name='unsorted' />
					</div>
					<div>
						<label htmlFor="filter-home">Home <span>({type.home.length})</span></label>
						<br/><input ref={this.homeRef} type="checkbox" id="filter-home" value='home' name='home' />
					</div>
					<div>
						<label htmlFor="filter-outing">Outing <span>({type.outing.length})</span></label>
						<br/><input ref={this.outingRef} id="filter-outing" type="checkbox" value='outing' name='outing' />
					</div>
					<div>
						<label htmlFor="filter-all">All <span>({type.all.length})</span></label>
						<br/><input ref={this.allRef} id="filter-all" type="checkbox" value='all' name='all' />
					</div>
				</div>
				<br />
				<button onClick={e=>this.passSelectionToParent(e)}>Filter by selected categories</button>
				<p>Or, draw one activity ticket randomly...</p>
				<button onClick={e=>this.randomPick(e)}>Try my luck!</button>
			</form>
		);
	}
}



