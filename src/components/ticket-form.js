import React from 'react';
import {connect} from 'react-redux';
import {submitNewTicketForm} from '../actions/protected-data';

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
		    <legend>Have something in mind?</legend>
		    <label>What: <br/><input type="text" name="what" required placeholder="pool party"/></label>
		    <br/>
		    <label>Type:  
		      <select name="type">
		        <option value="unsorted">unsorted</option>
		        <option value="home">home</option>
		        <option value="outing">outing</option>
		      </select>
		    </label>
		    <br/>
		    <label>Where: <br/><input type="text" name="where" placeholder="community center" /></label>
		    <br/>
		    <label>Details: <br/><textarea name="details" placeholder="more about this activity" /></label>
		    </fieldset>
		    <button type="submit">Submit</button>
		    <button type="reset">Reset</button>
		    <div className="remainder">{this.state.formSubmitStatus}</div>
		  </form>		
		);
	}
}

export default connect()(TicketForm);