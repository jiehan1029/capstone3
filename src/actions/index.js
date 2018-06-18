// actions:
// 1) add an activity ticket;
// 2) delete a ticket;
// 3) mark a ticket as completed;

export const DEL_TICKET='DEL_TICKET';
export const delTicket=ticketiId=>({
	type:DEL_TICKET
	ticketId
});


