import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import TicketForm from './ticket-form';

import {editTicket} from '../actions/protected-data';

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
ReactModal.setAppElement('#root');

export class EditTicketModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:false,
			formSubmitStatus:""
		};
		this.openModal=this.openModal.bind(this);
		this.closeModal=this.closeModal.bind(this);
		this.resetFormStatus=this.resetFormStatus.bind(this);
		this.handleEdit=this.handleEdit.bind(this);
	}

	openModal(){
		this.setState({showModal:true});
	}

	closeModal(){
		this.setState({showModal:false})
	}

  resetFormStatus(){
    this.setState({
      formSubmitStatus:""
    });
  }

  handleEdit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    e.target.reset();
    const data={
    	ticketId:this.props.ticketId,
    	what:formData.get('what'),
    	type:formData.get('type'),
    	where:formData.get('where'),
    	details:formData.get('details')
    }
    return this.props.dispatch(editTicket(data))
    .then(()=>{
      console.log('edit ticket form successful!');
      this.setState({
        formSubmitStatus:"Submitted successfully!"
      });
    })
    .catch(err=>{
      console.error(err);
      this.setState({
        formSubmitStatus:"Submission failed"
      })
    });
  }

	render(){
		const modal= (
			<ReactModal
		  	isOpen={this.state.showModal}
		  	onRequestClose={this.closeModal}
		  	style={customStyles}
		  	contentLabel="edit activity dialogue"
			>
				<TicketForm 
          onSubmit={e=>this.handleEdit(e)}
          resetFormStatus={this.resetFormStatus}
          classNames="form"
          legend={"Edit - "+this.props.currTicketName}
          formSubmitStatus={this.state.formSubmitStatus}					
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

export default connect()(EditTicketModal);