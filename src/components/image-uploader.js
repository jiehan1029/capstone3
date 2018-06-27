import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {uploadImage} from '../actions/protected-data';
import {dateToStr} from '../utils/utilities';

export class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: null,
      processing: false,
      comment:'',
      date:dateToStr(new Date())
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleFormChange=this.handleFormChange.bind(this);
  }

  setComment(comment){
    this.setState({
      comment
    })
  }

  setDate(date){
    this.setState({
      date
    })
  }

  handleFormChange(){
    this.setState({
      uploadStatus:null,
      processing:false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });

    const data = new FormData(e.target);
    data.append("ticketId",`${this.props.ticketId}`);
    data.append("ticketName",`${this.props.ticketName}`);

    return this.props.dispatch(uploadImage(data))
    .then(()=>{
      console.log('moment/image upload completed!');
      console.log(this.props.fetchStatus);
      if(this.props.fetchStatus==='success'){
        this.setState({
          processing:false,
          uploadStatus: "success",
          comment:'',
          date:dateToStr(new Date())
        });
      }else{
        this.setState({
          processing:false,
          uploadStatus: "failed"
        });
      }
    })
    .catch(err=>{
      console.error(err);
      this.setState({
        processing:false,
        uploadStatus: "failed"
      });
    });
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploadStatus==='success') {
      uploaded = (
        <div>
          <p>Moment saved!</p>
          <p>Go to <Link to="/my-wall">My Wall</Link> to view all posted moments</p>
        </div>
      );
    }else if (this.state.uploadStatus==='failed'){
      uploaded = (
        <div>
          <p>Moment submission failed. There may be a server error</p>
        </div>
      );      
    }

    if (this.state.processing) {
      processing = <p>Processing, hang tight</p>;
    }

    return (
      <div>
        <form onSubmit={e=>this.handleSubmit(e)} onChange={()=>this.handleFormChange()}>
          <label htmlFor="input-date">Date: </label>
          <input
            id="input-date"
            name="date" 
            type="date" 
            value={this.state.date}
            onChange={e=>this.setDate(e.target.value)}
          />
          <label htmlFor="input-file">upload photo(s) - use ctrl to select multiple photos </label>
          <input
            id="input-file" 
            name="file"
            type="file"
            multiple="multiple" 
          />
          <label htmlFor="input-comment">comment: </label>
          <textarea
            id="input-comment"
            name="comment"
            placeholder="write a short story of what you want to keep" 
            value={this.state.comment}
            onChange={e=>this.setComment(e.target.value)}
          />            
          <input 
            disabled={this.state.processing} 
            type="submit" 
            value="Save the moment!" 
          />
        </form>
        {processing}
        {uploaded}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    fetchStatus: !state.protectedData.error?'success':'error'
});

export default connect(mapStateToProps)(ImageUploader);
