import React from 'react';
import {connect} from 'react-redux';

import requiresLogin from './requires-login';
import {fetchMyWall} from '../actions/protected-data';
import MomentCollection from './moment-collection';

export class MyWall extends React.Component{


  componentDidMount() {
    this.props.dispatch(fetchMyWall());
  }


  render(){
    console.log('in render, records= ');
    console.log(this.props.records);
    const posts=this.props.records.map((record,index)=>(
      <li key={index}>
        <MomentCollection records={this.props.records}/>
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
        {posts}
      </section>
    );
  }
}

const mapStateToProps = state => ({
    records: state.protectedData.myWallData
});

export default requiresLogin()(connect(mapStateToProps)(MyWall));
