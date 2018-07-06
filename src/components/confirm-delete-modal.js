import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';

import {deleteTicket} from '../actions/protected-data';

import { Button } from 'reactstrap';

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

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

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
		  	Confirm Deletion?
		  	<br />
		  	<Button className="confirm-delete-btn" outline onClick={this.deleteConfirm}>Yes, delete</Button>
		  	<br />
		  	<Button outline onClick={this.closeModal}>Cancel</Button>
		  </ReactModal>
		 );

		return(
			<div className="modal-div">
				<Button outline
					onClick={this.openModal} 
					title={this.props.btnTitle}
				>{this.props.btnText}
				</Button>
				{modal}
			</div>
		)
	}
}

export default connect()(ConfirmDeleteModal);