import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';

import {deleteTicket} from '../actions/protected-data';

const customStyles={
	content:{
		top:'50%',
		left:'50%',
		right:'auto',
		bottom:'auto',
		marginRight:'-50%',
		transform:'translate(-50%,-50%)'
	}
}
ReactModal.setAppElement('#root');


export class ConfirmDeleteModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:false
		};
		this.openModal=this.openModal.bind(this);
		this.closeModal=this.closeModal.bind(this);
		this.deleteConfirm=this.deleteConfirm.bind(this);
	}

	openModal(){
		this.setState({showModal:true});
	}

	closeModal(){
		this.setState({showModal:false})
	}

	deleteConfirm(){
		this.props.dispatch(deleteTicket(this.props.ticketId));
		this.closeModal();
	}

	render(){
		const modal= (
			<ReactModal
		  	isOpen={this.state.showModal}
		  	onRequestClose={this.closeModal}
		  	style={customStyles}
		  	contentLabel="confirm deletion dialogue"
		  >
		  	Delete this activity?
		  	<br />
		  	<button onClick={this.deleteConfirm}>Confirm Deletion</button>
		  	<br />
		  	<button onClick={this.closeModal}>Cancel</button>
		  </ReactModal>
		 );

		return(
			<div>
			<button 
				onClick={this.openModal} 
				title={this.props.btnTitle}
			>{this.props.btnText}
			</button>
			{modal}
			</div>
		)
	}
}

export default connect()(ConfirmDeleteModal);