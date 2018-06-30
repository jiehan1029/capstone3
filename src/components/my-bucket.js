import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import requiresLogin from './requires-login';
import {fetchMyBucket, fetchMyWall} from '../actions/protected-data';
import {submitNewTicketForm} from '../actions/protected-data';
import Tickets from './tickets';
import TypeFilter from './type-filter';
import TicketForm from './ticket-form';

import './my-bucket.css';

export class MyBucket extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ticketsToRender:[],
      toggleAddNewForm:"hide",
      formSubmitStatus:""
    };
    // bind callbacks!
    // https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
    this.resetFormStatus=this.resetFormStatus.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMyBucket());
    this.props.dispatch(fetchMyWall());
    this.setState({
      ticketsToRender:this.props.tickets
    })
  }

  toggleFormDisplay(){
    this.setState({
      toggleAddNewForm:this.state.toggleAddNewForm==="hide" ? "show" : "hide"
    });
  }

  filterByType(typeArr){
    let ticketsToRender=[];
    this.props.tickets.forEach(ticket=>{
      if(ticket.type in typeArr){
        ticketsToRender.push(ticket);
      }
    });
    this.setState({
      ticketsToRender
    })
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
    
    //must declare a variable instead of using props.tickets directly
    // because when mount the component initially the tickets prop doesn't exist
    let tickets=this.props.tickets.length>0?this.props.tickets:[];
    if(tickets!==[]){
      tickets=tickets.map(ticket=>{
        let times=0;
        for(let i=0;i<this.props.records.length;i++){
          if(this.props.records[i].ticketId===ticket._id){
            times+=1;
          }
        }
        ticket.completeTimes=times;
        return ticket;
      });
    } 

    return (
      <section className="my-bucket-content">
        <header>
          <h2>My Bucket</h2>
          <p>What fun stuff to do?</p>
        </header>

        <TypeFilter 
          filterByTypes={()=>this.filterByType()}/>

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
          <Tickets tickets={this.state.ticketsToRender} />
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.protectedData.myBucketData,
    records: state.protectedData.myWallData
  };
};

export default requiresLogin()(connect(mapStateToProps)(MyBucket));