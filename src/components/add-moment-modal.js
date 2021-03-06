import React from 'react';
import ReactModal from 'react-modal';
import ImageUploader from './image-uploader';

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
//ReactModal.setAppElement('#root');

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

export default class AddMomentModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:false
		};
		this.openModal=this.openModal.bind(this);
		this.closeModal=this.closeModal.bind(this);
	}

	openModal(){
		this.setState({showModal:true});
	}

	closeModal(){
		this.setState({showModal:false})
	}

	render(){
		const modal = (
			<ReactModal
				isOpen={this.state.showModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				contentLabel="post a moment dialogue"
			>
				<h3>Add a moment for {this.props.currTicketName}</h3>
				<hr />
				<ImageUploader 
					ticketId={this.props.currTicket}
					ticketName={this.props.currTicketName}
					collectionDate={this.props.collectionDate}
				/>
				<button onClick={this.closeModal}>Close</button>
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
