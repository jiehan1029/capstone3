//https://github.com/neptunian/react-photo-gallery
//https://codesandbox.io/s/5vn3lvz2n4
import React from 'react';
import Lightbox from 'react-images';

export default class RecordCollectionLightbox extends React.Component{
	constructor(props){
		super(props);
    this.state={
    	currentImage:this.props.photoIndex,
    	lightboxIsOpen:this.props.lightboxIsOpen
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
    	currentImage:nextProps.photoIndex,
    	lightboxIsOpen:nextProps.lightboxIsOpen
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

	render(){
    return (
      <div>
        <Lightbox images={this.props.photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          backdropClosesModal={true}
        />
      </div>
    )
	}
}