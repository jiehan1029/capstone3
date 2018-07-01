import React from 'react';
import {Link} from 'react-router-dom';

import AddMomentModal from './add-moment-modal';
import ConfirmDeleteModal from './confirm-delete-modal';
import EditTicketModal from './edit-ticket-modal';

import { CardColumns, Card, CardHeader, CardBody } from 'reactstrap';
import './main.css';

export default function Tickets(props){
	const tickets = props.tickets.map((ticket,index)=>(
		<Card 
			key={index}
			data-ticketid={ticket._id}
		>
			<CardHeader className={`ticket-${ticket.type}`}>
				{ticket.what}
				<div className="ticket-type">{ticket.type}</div>
			</CardHeader>
			<CardBody>
				<div className="ticket-where">{ticket.where}</div>
				<div className="ticket-details">{ticket.details}</div>
				<div className="ticket-completeTimes">
					You have {ticket.completeTimes} moments of it, 
					<span><Link to="/my-wall"> view them on my wall</Link>, or</span>
				</div>
			</CardBody>

			<div className='modal-btns'>

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

			</div>

		</Card>));

  return (
    <CardColumns className="ticket-list">
    	{tickets}
    </CardColumns>
  );
}

