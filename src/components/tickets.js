import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import AddMomentModal from './add-moment-modal';
import ConfirmDeleteModal from './confirm-delete-modal';
import EditTicketModal from './edit-ticket-modal';

import './tickets.css';

export default function Tickets(props){
	const tickets = props.tickets.map((ticket,index)=>(
		<li 
			className={classNames(`${ticket.type}`,"ticket")} 
			key={index}
			data-ticketid={ticket._id}
		>
			<h3 className="ticket-what">{ticket.what}</h3>
			<div className="ticket-type">{ticket.type}</div>
			<div className="ticket-where">{ticket.where}</div>
			<div className="ticket-completeTimes">
				You've done it {ticket.completeTimes} times
				<br/>
				<span><Link to="/my-wall">View these moments in my wall</Link></span>
			</div>
			<div className="ticket-details">{ticket.details}</div>
			
			<AddMomentModal 
				btnTitle="you've done it? post a moment to your wall!"
				btnText="post a moment"
				currTicket={ticket._id}
				currTicketName={ticket.what}
			/>

			<EditTicketModal 
				btnTitle="edit the activity"
				btnText="edit"
				ticketId={ticket._id}
				currTicketName={ticket.what}
			/>

			<ConfirmDeleteModal 
				btnTitle="delete this activity ticket"
				btnText="delete"
				ticketId={ticket._id}
			/>

		</li>));

  return (
  	<div>
	    <ul className="ticket-list">
	    	{tickets}
	    </ul>
    </div>
  );
}

