import React from 'react';
import {connect} from 'react-redux';

import {uploadImage} from '../actions/protected-data';
import {dateToStr} from '../utils/utilities';

import { Button, FormGroup, Input, Label, FormText } from 'reactstrap';

export class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: null,
      processing: false,
      comment:'',
      date:this.props.collectionDate
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
        </div>
      );
    }else if (this.state.uploadStatus==='failed'){
      uploaded = (
        <FormText>Moment submission failed. There may be a server error</FormText>
      );      
    }

    if (this.state.processing) {
      processing = <FormText>Processing, hang tight</FormText>;
    }
    return (
      <div className="img-uploader-div">
        <form onSubmit={e=>this.handleSubmit(e)} onChange={()=>this.handleFormChange()}>
          <FormGroup>
          <Label htmlFor="input-date">Date: </Label>
          <Input
            id="input-date"
            name="date" 
            type="date" 
            value={this.state.date}
            required
            onChange={e=>this.setDate(e.target.value)}
          />
          </FormGroup>
          <FormGroup>
          <Label htmlFor="input-file">select a photo (max 10 MB)</Label>
          <Input
            id="input-file" 
            name="file"
            type="file"
          />
          </FormGroup>
          <FormGroup>
          <Label htmlFor="input-comment">comment: </Label>
          <Input type="textarea"
            id="input-comment"
            name="comment"
            placeholder="write a short story of what you want to keep" 
            value={this.state.comment}
            onChange={e=>this.setComment(e.target.value)}
          />
          </FormGroup>            
          <Button 
            disabled={this.state.processing} 
            type="submit">Save the moment!</Button>
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
