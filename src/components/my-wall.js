import React from 'react';
import {connect} from 'react-redux';

import MomentCollection from 'moment-collection';

export class MyWall extends React.Component{
  const Posts=this.props.records.map((record,index)=>(
    <li key={index}>
      <MomentCollection record={record}/>
    </li>
  ));
  return (
    <section>
      <header>
        <h2>My Wall</h2>
        <p>See all the moments posted here</p>
      </header>
      <div>
        <label>Sort by</label>
        <select>
          <option value='ticketAToZ'>Activity: A to Z</option>
          <option value='dateNewToOld'>Date: newest to oldest</option>
          <option value='dateOldToNew'>Date: oldest to newest</option>
        </select>
    </div>
      {Posts}
    </section>
  );
}

const mapStateToProps = state => ({
    records: state.protectedData:myRecords,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(MyWall);
