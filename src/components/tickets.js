import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {deleteTicket,editTicket} from '../actions/protected-data';
import TicketForm from './ticket-form';

import './tickets.css';

// configure ReactModal
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

export class Tickets extends React.Component {
	constructor(){
		super();
		this.state={
			showDeleteModal:false,
			showEditModal:false,
			showPostMomentModal:false,
			whichModal:null,

			currTicket:null,
			currTicketName:"",
			formSubmitStatus:"",
			photoUploadStatus:""
		}
		this.handleOpenModal=this.handleOpenModal.bind(this);	
		this.handleCloseModal=this.handleCloseModal.bind(this);

		this.resetFormStatus=this.resetFormStatus.bind(this);
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
    	ticketId:this.state.currTicket,
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

	handleDelete(){
		const ticketId=this.state.currTicket;
		this.props.dispatch(deleteTicket(ticketId)).then(this.handleCloseModal());
	}

// to edit, photoupload module
// also need a POST to post photo url together with memo text to my-wall endpoint
	handlePhotoUpload(){

	}

	// for ReactModal
	handleOpenModal(e){
		// find the event target to set state
		const targetBtnText=ReactDOM.findDOMNode(e.target).innerHTML;
		// while open the modal, save ticketId to state for later access
		// this is how to access DOM via ReactDOM
		const ticketId=ReactDOM.findDOMNode(e.target).parentNode.getAttribute('data-ticketid');
		const ticketName=ReactDOM.findDOMNode(e.target).parentNode.getElementsByClassName('ticket-what')[0].innerHTML;
		this.setState({currTicket:ticketId, currTicketName:ticketName});		
		if(targetBtnText==='delete'){
			this.setState({showDeleteModal:true, whichModal:'delete'});
		}
		else if(targetBtnText==='edit'){
			this.setState({showEditModal:true, whichModal:'edit'});
		}
		else if(targetBtnText==='post a moment'){
			this.setState({showPostMomentModal:true, whichModal:'moment'});
		}
	}

	handleCloseModal(){
		// on close, reset currTicket
		this.setState({currTicket:null});
		if(this.state.whichModal==='delete'){
			this.setState({showDeleteModal:false});
		}
		else if(this.state.whichModal==='edit'){
			this.setState({showEditModal:false});
		}
		else if(this.state.whichModal==='moment'){
			this.setState({showPostMomentModal:false});
		}
		this.setState({whichModal:null});
	}		


	render(){
		const tickets = this.props.tickets.map((ticket,index)=>(
			<li 
				className={classNames(`${ticket.type}`,"ticket")} 
				key={index}
				data-ticketid={ticket._id}
			>
				<h3 className="ticket-what">{ticket.what}</h3>
				<div className="ticket-where">{ticket.where}</div>
				<div className="ticket-details">{ticket.details}</div>
				<button
					onClick={e=>this.handleOpenModal(e)} 
					title="you've done it? post a moment to your wall!"
				>post a moment</button>
				<button
					onClick={e=>this.handleOpenModal(e)}
					title="edit this activity ticket"
				>edit</button>
				<button 
					onClick={e=>this.handleOpenModal(e)}
					title="delete this activity ticket"
				>delete</button>
			</li>));

	  const confirmDeleteModal = 
		  <ReactModal
		  	isOpen={this.state.showDeleteModal}
		  	onRequestClose={this.handleCloseModal}
		  	style={customStyles}
		  	contentLabel="confirm deletion dialogue"
		  >
		  	Delete this activity?
		  	<br />
		  	<button onClick={e=>{this.handleDelete(e)}}>Confirm Deletion</button>
		  	<br />
		  	<button onClick={this.handleCloseModal}>Cancel</button>
		  </ReactModal>

		const editFormModal = 
			<ReactModal
		  	isOpen={this.state.showEditModal}
		  	onRequestClose={this.handleCloseModal}
		  	style={customStyles}
		  	contentLabel="edit activity dialogue"
			>
				<TicketForm 
          onSubmit={e=>this.handleEdit(e)}
          resetFormStatus={this.resetFormStatus}
          classNames="form"
          legend={"Edit - "+this.state.currTicketName}
          formSubmitStatus={this.state.formSubmitStatus}					
				/>
				<button onClick={this.handleCloseModal}>Close</button>
			</ReactModal>

		const postMomentModal =
			<ReactModal
				isOpen={this.state.showPostMomentModal}
				onRequestClose={this.handleCloseModal}
				style={customStyles}
				contentLabel="post a moment dialogue"
			>
				<h4>Create a moment for {this.state.currTicketName}</h4>
				<label>Memo: <textarea placeholder="write a short story of what you want to keep" /></label>
				<br />
				<label>Upload a photo (max 5 photos): </label>
				<br />
				<button onClick={this.handlePhotoUpload}>Upload</button>
				<br />
				<button>Save the moment!</button>
				<div className="remainder">{this.state.photoUploadStatus}</div>
				<button onClick={this.handleCloseModal}>Close</button>
			</ReactModal>

	  return (
	  	<div>
		    <ul className="ticket-list">
		    	{tickets}
		    </ul>
		    {confirmDeleteModal}
		    {editFormModal}
		    {postMomentModal}
	    </div>
	  );
	}
}

export default connect()(Tickets);