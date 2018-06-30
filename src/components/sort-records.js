import React from 'react';

export default function SortRecords(props){
		return(
	   <div>
      <label>Sort by</label>
      <select onChange={e=>props.sortRecords(e.target.value)}>
      	<option value=''></option>
        <option value='dateNewToOld'>Date: newest to oldest</option>
        <option value='dateOldToNew'>Date: oldest to newest</option>
      </select>
    </div>
		);
}

