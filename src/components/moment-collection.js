import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {deleteRecordsCollection, deleteOnePhoto} from '../actions/protected-data';
import AddMomentModal from './add-moment-modal';
import RecordCollectionLightbox from './record-collection-lightbox';

import './moment-collection.css';

export class MomentCollection extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lightboxIsOpen:false,
      lightboxStartIndex:0,
      viewMore:false
    }
    this.openLightbox=this.openLightbox.bind(this);
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

  openLightbox(e,index){
    this.setState({
      lightboxIsOpen:true,
      lightboxStartIndex:index
    });
  }

  render(){
    let allImgSrc=[];
    this.props.records.imageUrl.map(imgObj=>(
      allImgSrc.push({
        src:imgObj.src,
        caption:imgObj.comment,
        imageid:imgObj._id
      })
    ));

    let imgSrc;
    if(this.state.viewMore){
      imgSrc=allImgSrc;
    }else{
      imgSrc=[allImgSrc[0]];
    }

    let photos=[];
    imgSrc.forEach((img,index)=>{
      if(img){
        photos.push(
          <div key={index} data-imageid={img.imageid}>
            <img src={img.src} alt={`activity record - ${index}`} 
              onClick={e=>this.openLightbox(e,index)}
              data-imageid={img.imageid} title={img.caption} className='img-thumbnail'/>
            <button onClick={e=>{this.deleteOnePhoto(e)}}>X</button>
            <div className='img-caption'>{img.caption}</div>
          </div>
        );
      }
    });

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
          collectionDate={this.props.records.dateStr}
        />

        <button onClick={e=>this.deleteCollection(e)}>Delete this collection</button>
        <p>contains {this.props.records.imageUrl.length} photos</p>
        <button onClick={this.expandCollectionPhotos}>View more/ View less</button>
        <br />
        <br />
        <div className='photos-container'>
          {photos}
        </div>

        <RecordCollectionLightbox 
          photos={allImgSrc}
          photoIndex={this.state.lightboxStartIndex}
          lightboxIsOpen={this.state.lightboxIsOpen}
        />

      </div>
    );
  }
}

export default connect()(MomentCollection);