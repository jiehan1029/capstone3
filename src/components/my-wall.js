import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchMyWall} from '../actions/protected-data';

import requiresLogin from './requires-login';
import MomentCollection from './moment-collection';
import SortRecords from './sort-records';

import { CardColumns } from 'reactstrap';

export class MyWall extends React.Component{
  constructor(props){
    super(props);
    this.state={
      recordsToRender:[]
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchMyWall())
    .then(()=>
      this.setState({
        recordsToRender:this.props.records
      })
    );
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.records){
      this.setState({
        recordsToRender:nextProps.records
      });
    }
  }

  sortRecords(order){
    let sortedRecords=this.state.recordsToRender;
    if(order==='dateNewToOld'){
      sortedRecords.sort((a,b)=>{
        const newA=new Date(a.dateStr);
        const newB=new Date(b.dateStr);
        return (newB - newA);
      });
    }
    else if(order==='dateOldToNew'){
      sortedRecords.sort((a,b)=>{
        const newA=new Date(a.dateStr);
        const newB=new Date(b.dateStr);
        return (newA - newB);
      });
    }
    this.setState({
      recordsToRender:sortedRecords
    })
  }

  render(){

    if(this.state.recordsToRender.length===0){
      return(
        <section className="my-wall-page">
          <header>
            <h2>My Wall</h2>
            <p>See all the moments posted here</p>
          </header>
          <p className="wall-no-record">Looks like you have no moments posted. Pick one activity from <Link to="/my-bucket">My Bucket</Link> and start creating memorable moments!</p>
        </section>
      );
    }
    else{
      const posts=this.state.recordsToRender.map((record,index)=>(
        <MomentCollection records={record} key={index} />
      ));
      return (
        <section className="my-wall-page">
          <header>
            <h2>My Wall</h2>
            <p>See all the moments posted here</p>
          </header>

          <SortRecords sortRecords={e=>this.sortRecords(e)}
          />

          <CardColumns>
            {posts}
          </CardColumns>
        </section>
      );
    }
  }
}

const mapStateToProps = state => ({
  records: state.protectedData.myWallData
});

export default requiresLogin()(connect(mapStateToProps)(MyWall));