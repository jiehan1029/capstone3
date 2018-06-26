// https://github.com/jossmac/react-images
import React from 'react';
import {connect} from 'react-redux';
import Lightbox from 'react-images';

export class MomentCollection extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lightboxIsOpen:false
    }
  }
  
  gotoPrevious(){
  }
  
  gotoNext(){
  }
  
  closeLightbox(){
  }
  
  render(){
    return(
      <div>
        <h3>this.props.what</h3>
        <p>this.props.time</p>
        <p>contains {this.props.images.length} photos</p>
        <Lightbox
          images={{this.props.images}}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    records: state.protectedData:myRecords
});

export default connect(mapStateToProps)(MomentCollection);
