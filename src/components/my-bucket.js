import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import requiresLogin from './requires-login';
import {fetchMyBucket, fetchMyWall} from '../actions/protected-data';
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
    };
    // bind callbacks!
    // https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
    //this.resetFormStatus=this.resetFormStatus.bind(this);
    this.filterByType=this.filterByType.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMyBucket());
    this.props.dispatch(fetchMyWall());
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ticketsToRender:nextProps.tickets
    });
  }

  toggleFormDisplay(){
    this.setState({
      toggleAddNewForm:this.state.toggleAddNewForm==="hide" ? "show" : "hide"
    });
  }

  filterByType(typeArr){
    if(!typeArr.includes('all') && typeArr.length!==0){
      let ticketsToRenderNew=[];
      for(let i=0;i<this.props.tickets.length;i++){
        if(typeArr.indexOf(this.props.tickets[i].type)!==-1){
          ticketsToRenderNew.push(this.props.tickets[i]);
        }
      }
      this.setState({
        ticketsToRender:ticketsToRenderNew
      });      
    }
    else if(typeArr.includes('all') || typeArr.length===0){
      this.setState({
        ticketsToRender:this.props.tickets
      });
    }  
  }

  render() {
    //must declare a variable instead of using props.tickets directly
    // because when mount the component initially the tickets prop doesn't exist
    let tickets=this.state.ticketsToRender;
    if(tickets.length!==0){
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
          tickets={this.props.tickets}
          filterByType={this.filterByType}/>

        <button 
          onClick={()=>this.toggleFormDisplay()}
          title="click to toggle"
        >New activity form</button>

        <TicketForm
          formSubmissionStatus="" 
          classNames={classNames(`${this.state.toggleAddNewForm}`,"form")}
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