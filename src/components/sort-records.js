import React from 'react';

export default function SortRecords(props){
		return(
	   <div>
      <label htmlFor="record-sort-by-select">Sort by </label>
      <select id="record-sort-by-select" onChange={e=>props.sortRecords(e.target.value)}>
      	<option value=''></option>
        <option value='dateNewToOld'>Date: newest to oldest</option>
        <option value='dateOldToNew'>Date: oldest to newest</option>
      </select>
    </div>
		);
}

