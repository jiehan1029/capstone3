import React from 'react';
import ReactModal from 'react-modal';

import { Card, CardHeader, CardBody } from 'reactstrap';

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
//ReactModal.setAppElement('#root');

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

export default class RandomPickModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:this.props.showModal
		};
		this.closeModal=this.closeModal.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			showModal:nextProps.showModal,
			pick:nextProps.pick
		});
	}

	closeModal(){
		this.setState({showModal:false})
	}

	render(){
		let modalContent;
		if(!this.state.pick){
			modalContent=(<div className="lds-circle"></div>);
		}else{
			modalContent=(
				<div>
					<h3>Your lucky ticket today is...</h3>
					<hr />

				<Card>
					<CardHeader className={`ticket-${this.props.pick.type}`}>
						{this.props.pick.what}
						<div className="ticket-type">{this.props.pick.type}</div>
					</CardHeader>
					<CardBody>
						<div className="ticket-where">{this.props.pick.where}</div>
						<div className="ticket-details">{this.props.pick.details}</div>
					</CardBody>
				</Card>
				</div>
			);
		}
		return(
			<div className="modal-div">
			<ReactModal
				isOpen={this.state.showModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				contentLabel="activity picked randomly"
			>
				{modalContent}
				<br />
				<button onClick={this.closeModal}>Close</button>
			</ReactModal>
			</div>
		);
	}
}
