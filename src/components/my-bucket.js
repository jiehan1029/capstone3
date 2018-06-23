import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import requiresLogin from './requires-login';
import {fetchMyBucket} from '../actions/protected-data';
import {submitNewTicketForm} from '../actions/protected-data';
import Tickets from './tickets';
import RaffleButtom from './raffle-btn';
import TicketForm from './ticket-form';

import './my-bucket.css';

export class MyBucket extends React.Component {
  constructor(props){
    super(props);
    this.state={
      toggleAddNewForm:"hide",
      formSubmitStatus:""
    };
    // bind callbacks!
    // https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
    this.resetFormStatus=this.resetFormStatus.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMyBucket());
  }

  toggleFormDisplay(){
    this.setState({
      toggleAddNewForm:this.state.toggleAddNewForm==="hide" ? "show" : "hide"
    });
  }

  onSubmit(e){
    e.preventDefault();
    const data = new FormData(e.target);
    e.target.reset();
    return this.props.dispatch(submitNewTicketForm(data))
    .then(()=>{
      console.log('submit new ticket form successful!');
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
  
  resetFormStatus(){
    this.setState({
      formSubmitStatus:""
    });
  }

  render() {
    //must declare a variable instead of using props.myTickets directly
    // because when mount the component initially the myTickets prop doesn't exist
    let myTickets=this.props.myTickets.length>0?this.props.myTickets:[];

    return (
      <section className="my-bucket-content">

        <RaffleButtom />

        <button 
          onClick={()=>this.toggleFormDisplay()}
          title="click to toggle"
        >New activity form</button>

        <TicketForm 
          onSubmit={e=>this.onSubmit(e)}
          resetFormStatus={this.resetFormStatus}
          classNames={classNames(`${this.state.toggleAddNewForm}`,"form")}
          legend="Have something in mind?"
          formSubmitStatus={this.state.formSubmitStatus}
        />

        <div className="tickets-container">
          <Tickets tickets={myTickets} />
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        myTickets: state.protectedData.myBucketData
    };
};

export default requiresLogin()(connect(mapStateToProps)(MyBucket));