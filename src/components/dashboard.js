// to-be edited
// in dashboard, will display recent activities such as new tickets added, new tickets completed
// those events will be displayed in chronological order

import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }
  
  // need to do something with the protected data
  // figure out server response first

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-protected-data">
          Protected data: {this.props.protectedData}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));