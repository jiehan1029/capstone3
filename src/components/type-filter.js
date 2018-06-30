import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

export class TypeFilter extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selectedTypes:[]
		};
		//this.passSelectionToParent=this.passSelectionToParent.bind(this);
	}

	selectType(e){
		const innerText=ReactDOM.findDOMNode(e.target).innerText;
		const index=innerText.indexOf('(');
		const type=innerText.substr(0,index).trim();
		console.log('select ',type);
		let types=this.state.selectedTypes;
		types.push(type);
		this.setState({
			selectedTypes:types
		})
	}

	passSelectionToParent(){
		console.log(this.props);
		this.props.filterByType();
	}

	render(){
		let type={
			unsorted:[],
			home:[],
			outing:[]
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
		});
		const categories=(
			<ul>
				<li><button onClick={e=>this.selectType(e)}>Unsorted <span>({type.unsorted.length})</span></button></li>
				<li><button onClick={e=>this.selectType(e)}>Home <span>({type.home.length})</span></button></li>
				<li><button onClick={e=>this.selectType(e)}>Outing <span>({type.outing.length})</span></button></li>
			</ul>
		);
		return(
			<div>
				{categories}
				<button onClick={this.passSelectionToParent()}>Filter by selected categories</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tickets: state.protectedData.myBucketData
  };
};

export default connect(mapStateToProps)(TypeFilter);

