import React from 'react';

import Tickets from './tickets';
import RaffleButtom from './raffle-btn';

export default function MyBucket(props) {
	alert(props.tickets[0].what)
  return (
    <div>
      <RaffleButtom />
      <Tickets tickets={props.tickets} />      
    </div>
  );
}