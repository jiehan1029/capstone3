import React from 'react';

export default function TicketForm(props) {
	return(
	  <form 
	    onSubmit={e=>props.onSubmit(e)}
	    onChange={props.resetFormStatus}
	    className={props.classNames} 
	  >
	    <fieldset>
	    <legend>{props.legend}</legend>
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
	    <div className="remainder">{props.formSubmitStatus}</div>
	  </form>		
	);
}