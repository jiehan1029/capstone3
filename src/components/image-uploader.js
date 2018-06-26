import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {uploadImage} from '../actions/protected-data';

export class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: null,
      processing: false,
      text:'',
      time:formatDate(new Date())
    }

    this.handleFile=this.handleFile.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  setText(text){
    this.setState({
      text
    })
  }

  setTime(time){
    this.setState({
      time
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });
    const data = {
        ticketId: this.props.ticketId,
        data_uri: this.state.data_uri,
        text:this.state.text,
        time:this.state.time
    };
    return this.props.dispatch(uploadImage(data))
    .then((data)=>{
      console.log('moment/image upload completed!');
      console.log(data);
      this.setState({
        processing:false,
        uploadStatus: "success",
        text:'',
        time:formatDate(new Date())
      });
    })
    .catch(err=>{
      console.error(err);
      this.setState({
        processing:false,
        uploadStatus: "failed"
      });
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    this.setState({
      uploadStatus: ""
    });

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
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
          <p>Moment submission failed!</p>
        </div>
      );      
    }

    if (this.state.processing) {
      processing = <p>Processing, hang tight</p>;
    }

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <form onSubmit={this.handleSubmit}>
            <label>When did you completed this?</label>
            <input 
              type="date" 
              value={this.state.time}
              onChange={e=>this.setTime(e.target.value)}
            />
            <label>Write a comment: </label>
            <textarea 
              placeholder="write a short story of what you want to keep" 
              value={this.state.text}
              onChange={e=>this.setText(e.target.value)}
            />
            <label>Upload an photo (limit 1 photo): </label>
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Save the moment!" />
            {processing}
          </form>
          {uploaded}
          <pre></pre>
        </div>
      </div>
    );
  }
}

export default connect()(ImageUploader);


function formatDate(date){
  // input date object, output "yyyy-mm-dd" string
  let month=date.getMonth()+1;
  let monthStr=month<10?'0'+month:month;
  let currD=date.getDate()+1;
  const res=date.getFullYear()+'-'+monthStr+'-'+currD;
  return res;
}