// https://github.com/jossmac/react-images
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
//import Lightbox from 'react-images';

import {deleteRecordsCollection, deleteOnePhoto} from '../actions/protected-data';
import AddMomentModal from './add-moment-modal';

import './moment-collection.css';

export class MomentCollection extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lightboxIsOpen:false,
      viewMore:false
    }
    this.closeLightbox=this.closeLightbox.bind(this);
    this.expandCollectionPhotos=this.expandCollectionPhotos.bind(this);
  }

  deleteCollection(e){
    const ticketId=ReactDOM.findDOMNode(e.target).parentNode.getAttribute('data-ticketid');
    const recordId=ReactDOM.findDOMNode(e.target).parentNode.getAttribute('data-recordid');
    this.props.dispatch(deleteRecordsCollection(ticketId,recordId));
  }

  deleteOnePhoto(e){
    const imageId=ReactDOM.findDOMNode(e.target).parentNode.getAttribute('data-imageid');
    this.props.dispatch(deleteOnePhoto(imageId));    
  }

  expandCollectionPhotos(){
    this.setState({
      viewMore:this.state.viewMore?false:true
    })
  }
  
  gotoPrevious(){

  }
  
  gotoNext(){
  }
  
  closeLightbox(){
    this.setState({lightboxIsOpen:false});
  }
  
  onClickLightboxImg(e){
    console.log('click lightbox img',e.target);
  }

  render(){
    let imgSrc=[];
    this.props.records.imageUrl.map(imgObj=>(
      imgSrc.push({
        src:imgObj.src,
        caption:imgObj.comment,
        imageid:imgObj._id
      })
    ));

    const photos=imgSrc.map((img,index)=>(
      <div key={index} data-imageid={img.imageid}>
        <img src={img.src} alt={`activity record - ${index}`} 
          data-imageid={img.imageid} title={img.caption} className='img-thumbnail'/>
        <button onClick={e=>{this.deleteOnePhoto(e)}}>X</button>
        <div className='img-caption'>{img.caption}</div>
      </div>
    ));

    return(
      <div 
        className='moment-collection-card' 
        data-ticketid={this.props.records.ticketId}
        data-recordid={this.props.records.id}
      >
        <h3>{this.props.records.ticketName}</h3>
        <p>{this.props.records.dateStr}</p>
        
        <AddMomentModal 
          btnTitle="add a moment"
          btnText="Add a moment"
          currTicket={this.props.records.ticketId}
          currTicketName={this.props.records.ticketName}
        />

        <button onClick={e=>this.deleteCollection(e)}>Delete this collection</button>
        <p>contains {this.props.records.imageUrl.length} photos</p>
        <button onClick={this.expandCollectionPhotos}>View more/ View less</button>
        {
          this.state.viewMore?
            (<div className='photos-container'>
              {photos}
            </div>)         
          :
            (<div className='photos-container'>
              <img src={imgSrc[0].src} data-imageid={imgSrc[0].imageid} className='img-thumbnail'
              title={imgSrc[0].caption} alt='collection cover' />
              <div className='img-caption'>{imgSrc[0].caption}</div>
            </div>)
        }
      </div>
    );
  }
}

export default connect()(MomentCollection);


/*
        <button onClick={()=>this.setState({lightboxIsOpen:true})}>
          <img src={imgSrc[0].src} alt='collection cover'/>
        </button>
        <Lightbox
          images={imgSrc}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickImage={e=>this.onClickLightboxImg(e)}
          backdropClosesModal=true
        />
*/