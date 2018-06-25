import React from 'react';
import {connect} from 'react-redux';

import {uploadImage} from '../actions/protected-data';

export class ImageUploader extends React.Component {
  constructor() {
    this.state = {
      data_uri: null,
      processing: false,
      uploadStatus: ""
    }

    this.handleFile=this.handleFile.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('inside handle submit for image uploader')
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });

    const data = {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
    };

    return this.props.dispatch(uploadImage(data))
    .then(()=>{
      console.log('image upload completed!');
      this.setState({
        processing:false,
        uploadStatus: "upload success"
        uploaded_uri: data.uri
      });
    })
    .catch(err=>{
      console.error(err);
      this.setState({
        processing:false,
        uploadStatus: "upload failed"
      });
    });
  }

  handleFile(e) {
    console.log('inside handle file function')
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

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className='image-preview' src={this.state.uploaded_uri} />
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing image, hang tight";
    }

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <label>Upload an image</label>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
    );
  }
}

export default connect()(ImageUploader);