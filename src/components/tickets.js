import React from 'react';

import './tickets.css';

export default function Tickets(props) {
	const tickets=props.tickets.map((ticket,index)=>(
		<li id={index} className="ticket">
			<h3>{ticket.what}</h3>
			<div>{ticket.status}</div>
			<div>{ticket.who}</div>
			<div>{ticket.where}</div>
			<div>{ticket.details}</div>
			<button>completed</button>
			<button>delete</button>
		</li>
	));
  return (
    <ul className="ticket-list">
    	{tickets}
    </ul>
  );
}