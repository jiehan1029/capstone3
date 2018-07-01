import React from 'react';
import {connect} from 'react-redux';
import {submitNewTicketForm} from '../actions/protected-data';

import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export class TicketForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			formSubmitStatus:""
		}
		this.resetFormStatus=this.resetFormStatus.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			formSubmitStatus:nextProps.formSubmitStatus
		})
	}

  resetFormStatus(){
    this.setState({
      formSubmitStatus:""
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

	render(){
		return(
		  <form 
		    onSubmit={e=>this.onSubmit(e)}
		    onChange={this.resetFormStatus}
		    className={this.props.classNames} 
		  >
		    <fieldset>
		    <legend>{this.props.legend}</legend>
		    <FormGroup>
		    <ControlLabel>What: <br/><FormControl componentClass="input" type="text" name="what" required placeholder="pool party"/></ControlLabel>
		    </FormGroup>
		    <FormGroup>
		    <ControlLabel>Type:  
		      <FormControl componentClass="select" name="type">
		        <option value="unsorted">unsorted</option>
		        <option value="home">home</option>
		        <option value="outing">outing</option>
		      </FormControl>
		    </ControlLabel>
		    </FormGroup>
		    <FormGroup>
		    <ControlLabel>Where: <br/><FormControl componentClass="input" type="text" name="where" placeholder="community center" /></ControlLabel>
		    </FormGroup>
		    <FormGroup>
		    <ControlLabel>Details: <br/><FormControl componentClass="textarea" name="details" placeholder="more about this activity" /></ControlLabel>
		    </FormGroup>
		    </fieldset>
		    <Button type="submit">Submit</Button>
		    <Button type="reset">Reset</Button>
		    <div className="remainder">{this.state.formSubmitStatus}</div>
		  </form>		
		);
	}
}

export default connect()(TicketForm);