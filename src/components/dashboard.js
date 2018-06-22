import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchMyBucket, fetchMyWall} from '../actions/protected-data';

export class Dashboard extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchMyBucket());
    this.props.dispatch(fetchMyWall());
  }
  
  render() {
    //must declare a variable instead of using props.myTickets directly
    // because when mount the component initially the myTickets prop doesn't exist
    let myTickets=this.props.myTickets.length>0?this.props.myTickets:[];
    let myRecords=this.props.myRecords.length>0?this.props.myRecords:[];
    
    let test=this.props.myTickets.length>0?this.props.myTickets[0].where:'';
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-protected-data">
        {test}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        myTickets: state.protectedData.myBucketData,
        myRecords: state.protectedData.myWallData
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));