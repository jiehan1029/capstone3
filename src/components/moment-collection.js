import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';

import {deleteRecordsCollection, deleteOnePhoto} from '../actions/protected-data';
import AddMomentModal from './add-moment-modal';
import RecordCollectionLightbox from './record-collection-lightbox';

import { Button, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';

const customStyles={
  content:{
    top:'50%',
    left:'50%',
    right:'auto',
    bottom:'auto',
    marginRight:'-50%',
    transform:'translate(-50%,-50%)'
  }
}

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

export class MomentCollection extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lightboxIsOpen:false,
      lightboxStartIndex:0,
      viewMore:false,
      showModal:false,
      ticketIdToDel:null,
      recordIdToDel:null
    }
    this.openLightbox=this.openLightbox.bind(this);
    this.expandCollectionPhotos=this.expandCollectionPhotos.bind(this);
    this.openModal=this.openModal.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.deleteConfirm=this.deleteConfirm.bind(this);
  }

  deleteCollection(e){
    const ticketId=ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode.getAttribute('data-ticketid');
    const recordId=ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode.getAttribute('data-recordid');
    this.setState({
      ticketIdToDel:ticketId,
      recordIdToDel:recordId
    })
    this.openModal();
  }

  deleteOnePhoto(e){
    const imageId=ReactDOM.findDOMNode(e.target).parentNode.getAttribute('data-imageid');
    this.props.dispatch(deleteOnePhoto(imageId));    
  }

  expandCollectionPhotos(e){
    e.preventDefault();
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

  openModal(){
    this.setState({showModal:true});
  }  

  closeModal(){
    this.setState({showModal:false})
  }  

  deleteConfirm(){
    this.props.dispatch(deleteRecordsCollection(this.state.ticketIdToDel,this.state.recordIdToDel));
    this.closeModal();
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
          <div className="collection-photo-container-single" key={index} data-imageid={img.imageid}>
            <img src={img.src} alt={`activity record - ${index}`} 
              onClick={e=>this.openLightbox(e,index)}
              data-imageid={img.imageid} title={img.caption} className='img-thumbnail'/>
            <button onClick={e=>{this.deleteOnePhoto(e)}}><Glyphicon glyph="remove"/></button>
            <div className='img-caption'>{img.caption}</div>
          </div>
        );
      }
    });

    const collectionDeleteModal= (
      <ReactModal
        isOpen={this.state.showModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="confirm deletion dialogue"
      >
        Confirm Deletion?
        <br />
        <Button outline onClick={this.deleteConfirm}>Yes, delete</Button>
        <br />
        <Button outline onClick={this.closeModal}>Cancel</Button>
      </ReactModal>
     );

    return(
      <Card 
        className='moment-collection-card' 
        data-ticketid={this.props.records.ticketId}
        data-recordid={this.props.records.id}
      >
        <CardHeader>
          <h3>{this.props.records.ticketName}</h3>
          <p>{this.props.records.dateStr}</p>
        </CardHeader>

        <CardBody>
          <div>
            <CardText>{this.props.records.imageUrl.length} photos in this collection</CardText>
            <div className="collection-photo-container-multi">{photos}</div>
            <a href="dummy" className="view-more-photos-link" onClick={this.expandCollectionPhotos}>View more/ View less</a>        
          </div>

          <div className="moment-collection-btn-group">
            <AddMomentModal 
              btnTitle="add a moment"
              btnText="Add a moment"
              currTicket={this.props.records.ticketId}
              currTicketName={this.props.records.ticketName}
              collectionDate={this.props.records.dateStr}
            />
            <Button outline onClick={e=>this.deleteCollection(e)}>Delete collection</Button>
          </div>

          <RecordCollectionLightbox 
            photos={allImgSrc}
            photoIndex={this.state.lightboxStartIndex}
            lightboxIsOpen={this.state.lightboxIsOpen}
          />
        </CardBody>
        {collectionDeleteModal}
      </Card>
    );
  }
}

export default connect()(MomentCollection);